import { NextRequest, NextResponse } from "next/server";

// ─────────────────────────────────────────────────────────────────────────────
// /api/inquiry
//
// POST — receives inquiry submissions from two forms:
//   - Homepage §09 Private Access  (source_page: "homepage_private_access")
//   - /contact ContactForm          (source_page: "contact_page")
//
// Validates the raw payload, then normalises it to a consistent 9-field shape
// before forwarding to Make. Make always receives the same structure regardless
// of which form submitted.
//
// Env var required: MAKE_WEBHOOK_URL (server-side only, never exposed to client)
// ─────────────────────────────────────────────────────────────────────────────

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Generates a unique inquiry ID.
 * Format: inq-YYYYMMDD-HHMMSS-xxxx  (xxxx = 4-char base-36 random suffix)
 * Example: inq-20260525-143022-a7f3
 */
function generateInquiryId(now: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const date = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}`;
  const time = `${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;
  const rand = Math.random().toString(36).slice(2, 6);
  return `inq-${date}-${time}-${rand}`;
}

/** Safely extract a trimmed string from an unknown field. Returns "" if not a string. */
function str(val: unknown): string {
  return typeof val === "string" ? val.trim() : "";
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch (_err) {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;

    // ── Validation ─────────────────────────────────────────────────────────────
    // Identical logic to previous version — unchanged.
    // Validation runs on the raw payload before any normalisation.

    const email  = payload.email;
    const name   = payload.name ?? payload.full_name;
    const source = payload.source_page;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
    }
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 });
    }
    if (source !== "homepage_private_access" && source !== "contact_page") {
      return NextResponse.json({ ok: false, error: "Invalid source" }, { status: 400 });
    }

    // ── Normalisation ──────────────────────────────────────────────────────────
    // Produce a consistent flat shape regardless of source form.
    //
    // Homepage sends:    full_name, company,      inquiry_type
    // ContactForm sends: name,      organisation,  interest
    //
    // Normalised to:     name,      company,       request_type

    const now = new Date();

    const normalized = {
      inquiry_id:   generateInquiryId(now),
      timestamp:    now.toISOString(),
      source_page:  source as string,
      name:         str(payload.name)         || str(payload.full_name),
      email:        str(email),
      company:      str(payload.company)      || str(payload.organisation),
      request_type: str(payload.inquiry_type) || str(payload.interest),
      message:      str(payload.message),
      raw_source:   source as string,
    };

    console.log("[inquiry]", JSON.stringify(normalized, null, 2));

    // ── Webhook ────────────────────────────────────────────────────────────────

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ ok: true, mode: "local" });
    }

    try {
      const makeRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
      });

      if (!makeRes.ok) {
        console.error("[inquiry] Make webhook returned", makeRes.status);
        return NextResponse.json({ ok: false, error: "Upstream error" }, { status: 502 });
      }
    } catch (makeErr) {
      console.error("[inquiry] Make webhook fetch failed:", makeErr);
      return NextResponse.json({ ok: false, error: "Upstream error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, mode: "webhook" });
  } catch (err) {
    console.error("[inquiry] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
