import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const url = process.env.MAKE_WEBHOOK_URL;

  if (!url) {
    return NextResponse.json({
      ok: true,
      has_make_webhook_url: false,
      make_webhook_host: null,
      make_webhook_last_8: null,
    });
  }

  let host: string | null = null;
  try {
    host = new URL(url).hostname;
  } catch {
    host = null;
  }

  const last8 = url.length >= 8 ? url.slice(-8) : url;

  return NextResponse.json({
    ok: true,
    has_make_webhook_url: true,
    make_webhook_host: host,
    make_webhook_last_8: last8,
  });
}
