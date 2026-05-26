import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const url = process.env.INQUIRY_LOG_CSV_URL;

  if (!url) {
    return NextResponse.json({
      ok: true,
      has_inquiry_log_csv_url: false,
      inquiry_csv_host:    null,
      inquiry_csv_gid:     null,
      inquiry_csv_last_12: null,
    });
  }

  let host:    string | null = null;
  let gid:     string | null = null;
  let last12:  string | null = null;

  try {
    const parsed = new URL(url);
    host   = parsed.hostname;
    gid    = parsed.searchParams.get("gid");
    last12 = url.length >= 12 ? url.slice(-12) : url;
  } catch {
    // URL parsing failed — has_inquiry_log_csv_url remains true, other fields stay null
  }

  return NextResponse.json({
    ok: true,
    has_inquiry_log_csv_url: true,
    inquiry_csv_host:    host,
    inquiry_csv_gid:     gid,
    inquiry_csv_last_12: last12,
  });
}
