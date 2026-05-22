import { NextRequest, NextResponse } from "next/server";

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

    const email = payload.email;
    const name = payload.name ?? payload.full_name;
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

    console.log("[inquiry]", JSON.stringify(payload, null, 2));

    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ ok: true, mode: "local" });
    }

    try {
      const makeRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
