import { NextResponse } from "next/server";

// Force dynamic — must always run server-side, never statically cached.
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// /api/insight-report
//
// GET — reads the published Insight Reports CSV from Google Sheets and returns
// the latest qualifying report row.
//
// Env var required:  INSIGHT_REPORTS_CSV_URL
//   → Google Sheets: File → Share → Publish to web → CSV of the Insight Reports tab
//   → Server-side only. Never exposed to client.
//
// Selection priority:
//   1. Last row where status is "draft" or "approved" (case-insensitive)
//   2. Last row with any non-empty report_id (if no status-qualified row)
//
// Any failure path (env var missing, fetch error, parse error, no rows) returns
// mode:"fallback" with report:null. Never returns a non-2xx status.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ─────────────────────────────────────────────────────────────────────

interface InsightReport {
  report_id:               string;
  date_created:            string;
  signal_id:               string;
  signal_theme:            string;
  total_responses:         number;
  dominant_reaction:       string;
  dominant_percent:        string;
  emotional_pattern:       string;
  interpretation:          string;
  experience_implication:  string;
  brand_partner_value:     string;
  recommended_next_signal: string;
  status:                  string;
}

interface InsightReportResponse {
  ok:     true;
  mode:   "live" | "fallback";
  report: InsightReport | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildFallback(): InsightReportResponse {
  return { ok: true, mode: "fallback", report: null };
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

const STATUS_ACCEPTED = new Set(["draft", "approved"]);

export async function GET(): Promise<NextResponse> {
  const csvUrl = process.env.INSIGHT_REPORTS_CSV_URL;

  if (!csvUrl) {
    console.log("[insight-report] INSIGHT_REPORTS_CSV_URL not set — returning fallback");
    return NextResponse.json(buildFallback());
  }

  // ── Fetch CSV ───────────────────────────────────────────────────────────────
  let text: string;
  try {
    const res = await fetch(csvUrl, { cache: "no-store" });
    if (!res.ok) {
      console.error("[insight-report] CSV fetch returned HTTP", res.status);
      return NextResponse.json(buildFallback());
    }
    text = await res.text();
  } catch (fetchErr) {
    console.error("[insight-report] CSV fetch failed:", fetchErr);
    return NextResponse.json(buildFallback());
  }

  // ── Parse ───────────────────────────────────────────────────────────────────
  let rows: Record<string, string>[];
  try {
    rows = parseCSV(text);
  } catch (parseErr) {
    console.error("[insight-report] CSV parse failed:", parseErr);
    return NextResponse.json(buildFallback());
  }

  if (rows.length === 0) {
    console.warn("[insight-report] No data rows in CSV");
    return NextResponse.json(buildFallback());
  }

  // ── Select latest qualifying row ────────────────────────────────────────────
  const reversed = [...rows].reverse();

  // Priority 1: last row with status "draft" or "approved"
  // Priority 2: last row with any non-empty report_id
  const row =
    reversed.find((r) => STATUS_ACCEPTED.has((r["status"] ?? "").toLowerCase().trim())) ??
    reversed.find((r) => (r["report_id"] ?? "").trim() !== "");

  if (!row) {
    console.warn("[insight-report] No valid report row found");
    return NextResponse.json(buildFallback());
  }

  // ── Normalise ───────────────────────────────────────────────────────────────
  const totalRaw = parseInt(row["total_responses"] ?? "0", 10);

  const report: InsightReport = {
    report_id:               row["report_id"]               ?? "",
    date_created:            row["date_created"]            ?? "",
    signal_id:               row["signal_id"]               ?? "",
    signal_theme:            row["signal_theme"]            ?? "",
    total_responses:         isNaN(totalRaw) ? 0 : totalRaw,
    dominant_reaction:       row["dominant_reaction"]       ?? "",
    dominant_percent:        row["dominant_percent"]        ?? "",
    emotional_pattern:       row["emotional_pattern"]       ?? "",
    interpretation:          row["interpretation"]          ?? "",
    experience_implication:  row["experience_implication"]  ?? "",
    brand_partner_value:     row["brand_partner_value"]     ?? "",
    recommended_next_signal: row["recommended_next_signal"] ?? "",
    status:                  row["status"]                  ?? "",
  };

  console.log("[insight-report] Returning live report:", report.report_id);
  const response: InsightReportResponse = { ok: true, mode: "live", report };
  return NextResponse.json(response);
}
