import { NextResponse } from "next/server";

// Force dynamic — must always run server-side, never statically cached.
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// /api/signal-calendar
//
// GET — reads the published Signal Calendar CSV from Google Sheets and returns
// an operational summary for the internal /system-preview dashboard.
//
// Env var required:  SIGNAL_CALENDAR_CSV_URL
//   → Google Sheets: File → Share → Publish to web → CSV of the Signal Calendar tab
//   → Server-side only. Never exposed to client.
//
// Privacy rule: reactions, image_asset, mobile_image_asset, and notes are
// NEVER included in the response. Only operational metadata is returned.
//
// Any failure path (env var missing, fetch error, parse error, no rows) returns
// mode:"fallback" with zero counts and empty arrays. Never returns a non-2xx status.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

interface CalendarSignal {
  signal_id:     string;
  date:          string;
  theme:         string;
  status:        string;
  report_status: string;
}

interface CalendarActiveSignal {
  signal_id:     string;
  date:          string;
  theme:         string;
  statistic:     string;
  statement:     string;
  prompt:        string;
  status:        string;
  report_status: string;
}

interface SignalCalendarResponse {
  ok:                   true;
  mode:                 "live" | "fallback";
  total_signals:        number;
  active_signals:       number;
  draft_signals:        number;
  archived_signals:     number;
  skipped_signals:      number;
  report_pending:       number;
  report_created:       number;
  latest_active_signal: CalendarActiveSignal | null;
  upcoming_signals:     CalendarSignal[];
  all_signals:          CalendarSignal[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildFallback(): SignalCalendarResponse {
  return {
    ok:                   true,
    mode:                 "fallback",
    total_signals:        0,
    active_signals:       0,
    draft_signals:        0,
    archived_signals:     0,
    skipped_signals:      0,
    report_pending:       0,
    report_created:       0,
    latest_active_signal: null,
    upcoming_signals:     [],
    all_signals:          [],
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
  const csvUrl = process.env.SIGNAL_CALENDAR_CSV_URL;

  if (!csvUrl) {
    console.log("[signal-calendar] SIGNAL_CALENDAR_CSV_URL not set — returning fallback");
    return NextResponse.json(buildFallback());
  }

  // ── Fetch CSV ───────────────────────────────────────────────────────────────
  let text: string;
  try {
    const res = await fetch(csvUrl, { cache: "no-store" });
    if (!res.ok) {
      console.error("[signal-calendar] CSV fetch returned HTTP", res.status);
      return NextResponse.json(buildFallback());
    }
    text = await res.text();
  } catch (fetchErr) {
    console.error("[signal-calendar] CSV fetch failed:", fetchErr);
    return NextResponse.json(buildFallback());
  }

  // ── Parse ───────────────────────────────────────────────────────────────────
  let rows: Record<string, string>[];
  try {
    rows = parseCSV(text);
  } catch (parseErr) {
    console.error("[signal-calendar] CSV parse failed:", parseErr);
    return NextResponse.json(buildFallback());
  }

  if (rows.length === 0) {
    console.warn("[signal-calendar] No data rows in CSV");
    return NextResponse.json(buildFallback());
  }

  // ── Aggregate ───────────────────────────────────────────────────────────────

  let activeCount   = 0;
  let draftCount    = 0;
  let archivedCount = 0;
  let skippedCount  = 0;
  let pendingCount  = 0;
  let createdCount  = 0;

  for (const row of rows) {
    const status       = (row["status"]        ?? "").toLowerCase().trim();
    const reportStatus = (row["report_status"] ?? "").toLowerCase().trim();

    if      (status === "active")   activeCount++;
    else if (status === "draft")    draftCount++;
    else if (status === "archived") archivedCount++;
    else if (status === "skipped")  skippedCount++;

    if      (reportStatus === "report_pending") pendingCount++;
    else if (reportStatus === "report_created") createdCount++;
  }

  // Latest active signal — first row with status === "active"
  const activeRow = rows.find((r) => (r["status"] ?? "").toLowerCase().trim() === "active");
  const latest_active_signal: CalendarActiveSignal | null = activeRow
    ? {
        signal_id:     activeRow["signal_id"]     ?? "",
        date:          activeRow["date"]           ?? "",
        theme:         activeRow["theme"]          ?? "",
        statistic:     activeRow["statistic"]      ?? "",
        statement:     activeRow["statement"]      ?? "",
        prompt:        activeRow["prompt"]         ?? "",
        status:        activeRow["status"]         ?? "",
        report_status: activeRow["report_status"]  ?? "",
      }
    : null;

  // Upcoming signals — rows with status === "draft", sorted date ascending
  const upcoming_signals: CalendarSignal[] = rows
    .filter((r) => (r["status"] ?? "").toLowerCase().trim() === "draft")
    .map((r) => ({
      signal_id:     r["signal_id"]     ?? "",
      date:          r["date"]          ?? "",
      theme:         r["theme"]         ?? "",
      status:        r["status"]        ?? "",
      report_status: r["report_status"] ?? "",
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // All signals — compact shape (no statistic, statement, prompt, reactions,
  // image_asset, mobile_image_asset, notes)
  const all_signals: CalendarSignal[] = rows.map((r) => ({
    signal_id:     r["signal_id"]     ?? "",
    date:          r["date"]          ?? "",
    theme:         r["theme"]         ?? "",
    status:        r["status"]        ?? "",
    report_status: r["report_status"] ?? "",
  }));

  const response: SignalCalendarResponse = {
    ok:                   true,
    mode:                 "live",
    total_signals:        rows.length,
    active_signals:       activeCount,
    draft_signals:        draftCount,
    archived_signals:     archivedCount,
    skipped_signals:      skippedCount,
    report_pending:       pendingCount,
    report_created:       createdCount,
    latest_active_signal,
    upcoming_signals,
    all_signals,
  };

  console.log("[signal-calendar] Returning live summary — total:", rows.length);
  return NextResponse.json(response);
}
