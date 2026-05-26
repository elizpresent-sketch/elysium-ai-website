import { NextResponse } from "next/server";

// Force dynamic — must always run server-side, never statically cached.
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// /api/inquiry-summary
//
// GET — reads the published Inquiry Log CSV from Google Sheets and returns
// an operational summary for the internal /system-preview dashboard.
//
// Env var required:  INQUIRY_LOG_CSV_URL
//   → Google Sheets: File → Share → Publish to web → CSV of the Inquiry Log tab
//   → Server-side only. Never exposed to client.
//
// Privacy rule: email, message, notes, and follow_up_owner are NEVER included
// in the response. Only operational metadata is returned.
//
// Any failure path (env var missing, fetch error, parse error, no rows) returns
// mode:"fallback" with zero counts and empty arrays. Never returns a non-2xx status.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

interface LatestInquiry {
  inquiry_id:   string;
  timestamp:    string;
  source_page:  string;
  name:         string;
  company:      string;
  request_type: string;
  status:       string;
}

interface RequestTypeCount {
  request_type: string;
  count:        number;
}

interface InquirySummaryResponse {
  ok:                       true;
  mode:                     "live" | "fallback";
  total_inquiries:          number;
  new_inquiries:            number;
  reviewed_inquiries:       number;
  replied_inquiries:        number;
  converted_inquiries:      number;
  latest_inquiry_timestamp: string | null;
  source_breakdown: {
    contact_page:            number;
    homepage_private_access: number;
    other:                   number;
  };
  request_type_breakdown:   RequestTypeCount[];
  latest_inquiries:         LatestInquiry[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildFallback(): InquirySummaryResponse {
  return {
    ok:                       true,
    mode:                     "fallback",
    total_inquiries:          0,
    new_inquiries:            0,
    reviewed_inquiries:       0,
    replied_inquiries:        0,
    converted_inquiries:      0,
    latest_inquiry_timestamp: null,
    source_breakdown: {
      contact_page:            0,
      homepage_private_access: 0,
      other:                   0,
    },
    request_type_breakdown:   [],
    latest_inquiries:         [],
  };
}

/**
 * RFC 4180-safe single-line CSV parser.
 * Handles double-quoted fields containing commas or escaped quotes ("").
 * Trims each cell value.
 */
function parseLine(line: string): string[] {
  const cells: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += ch;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];
  const headers = parseLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, i) => { row[h] = values[i] ?? ""; });
    return row;
  });
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  const csvUrl = process.env.INQUIRY_LOG_CSV_URL;

  if (!csvUrl) {
    console.log("[inquiry-summary] INQUIRY_LOG_CSV_URL not set — returning fallback");
    return NextResponse.json(buildFallback());
  }

  // ── Fetch CSV ───────────────────────────────────────────────────────────────
  let text: string;
  try {
    const res = await fetch(csvUrl, { cache: "no-store" });
    if (!res.ok) {
      console.error("[inquiry-summary] CSV fetch returned HTTP", res.status);
      return NextResponse.json(buildFallback());
    }
    text = await res.text();
  } catch (fetchErr) {
    console.error("[inquiry-summary] CSV fetch failed:", fetchErr);
    return NextResponse.json(buildFallback());
  }

  // ── Parse ───────────────────────────────────────────────────────────────────
  let rows: Record<string, string>[];
  try {
    rows = parseCSV(text);
  } catch (parseErr) {
    console.error("[inquiry-summary] CSV parse failed:", parseErr);
    return NextResponse.json(buildFallback());
  }

  if (rows.length === 0) {
    console.warn("[inquiry-summary] No data rows in CSV");
    return NextResponse.json(buildFallback());
  }

  // ── Aggregate ───────────────────────────────────────────────────────────────

  let newCount       = 0;
  let reviewedCount  = 0;
  let repliedCount   = 0;
  let convertedCount = 0;

  const sourceBreakdown = {
    contact_page:            0,
    homepage_private_access: 0,
    other:                   0,
  };

  const requestTypeCounts: Record<string, number> = {};

  for (const row of rows) {
    const status      = (row["status"]       ?? "").toLowerCase().trim();
    const source      = (row["source_page"]  ?? "").trim();
    const requestType = (row["request_type"] ?? "").trim();

    // Status counts — blank status treated as "new" (not yet reviewed by operator)
    if (status === "" || status === "new") newCount++;
    else if (status === "reviewed")        reviewedCount++;
    else if (status === "replied")         repliedCount++;
    else if (status === "converted")       convertedCount++;

    // Source breakdown
    if      (source === "contact_page")              sourceBreakdown.contact_page++;
    else if (source === "homepage_private_access")   sourceBreakdown.homepage_private_access++;
    else                                             sourceBreakdown.other++;

    // Request type tally
    if (requestType) {
      requestTypeCounts[requestType] = (requestTypeCounts[requestType] ?? 0) + 1;
    }
  }

  // Sort request types by count descending
  const request_type_breakdown: RequestTypeCount[] = Object.entries(requestTypeCounts)
    .map(([request_type, count]) => ({ request_type, count }))
    .sort((a, b) => b.count - a.count);

  // Latest inquiry timestamp — from the last row with a non-empty timestamp
  const latestTimestampRow = [...rows].reverse().find((r) => (r["timestamp"] ?? "").trim() !== "");
  const latest_inquiry_timestamp = latestTimestampRow
    ? (latestTimestampRow["timestamp"] ?? null)
    : null;

  // Latest 3 inquiries — most recent first, safe fields only (no email/message/notes/follow_up_owner)
  const latest_inquiries: LatestInquiry[] = [...rows]
    .reverse()
    .slice(0, 3)
    .map((row) => ({
      inquiry_id:   row["inquiry_id"]   ?? "",
      timestamp:    row["timestamp"]    ?? "",
      source_page:  row["source_page"]  ?? "",
      name:         row["name"]         ?? "",
      company:      row["company"]      ?? "",
      request_type: row["request_type"] ?? "",
      status:       row["status"]       ?? "",
    }));

  const response: InquirySummaryResponse = {
    ok:                       true,
    mode:                     "live",
    total_inquiries:          rows.length,
    new_inquiries:            newCount,
    reviewed_inquiries:       reviewedCount,
    replied_inquiries:        repliedCount,
    converted_inquiries:      convertedCount,
    latest_inquiry_timestamp,
    source_breakdown:         sourceBreakdown,
    request_type_breakdown,
    latest_inquiries,
  };

  console.log("[inquiry-summary] Returning live summary — total:", rows.length);
  return NextResponse.json(response);
}
