import { NextRequest, NextResponse } from "next/server";

const ALLOWED_REACTIONS = ["anxiety", "interest", "trust", "discomfort", "emptiness"] as const;
type Reaction = (typeof ALLOWED_REACTIONS)[number];

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

    const reaction = payload.reaction;
    const source = payload.source_page;
    const signalId = payload.signal_id;

    if (
      !reaction ||
      typeof reaction !== "string" ||
      !(ALLOWED_REACTIONS as readonly string[]).includes(reaction)
    ) {
      return NextResponse.json({ ok: false, error: "Invalid reaction" }, { status: 400 });
    }

    if (source !== "homepage_signal_of_the_day") {
      return NextResponse.json({ ok: false, error: "Invalid source" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? "";
    const timestamp = new Date().toISOString();

    const eventPayload = {
      reaction: reaction as Reaction,
      signal_id: typeof signalId === "string" && signalId.trim() ? signalId.trim() : "signal-default",
      source_page: source,
      timestamp,
      user_agent: userAgent,
    };

    console.log("[signal-reaction]", JSON.stringify(eventPayload, null, 2));

    const webhookUrl = process.env.MAKE_SIGNAL_REACTION_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ ok: true, mode: "local" });
    }

    try {
      const makeRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventPayload),
      });

      if (!makeRes.ok) {
        console.error("[signal-reaction] Make webhook returned", makeRes.status);
        return NextResponse.json({ ok: false, error: "Upstream error" }, { status: 502 });
      }
    } catch (makeErr) {
      console.error("[signal-reaction] Make webhook fetch failed:", makeErr);
      return NextResponse.json({ ok: false, error: "Upstream error" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, mode: "webhook" });
  } catch (err) {
    console.error("[signal-reaction] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
