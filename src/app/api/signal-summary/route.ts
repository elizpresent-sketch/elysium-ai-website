import { NextResponse } from "next/server";
import { ACTIVE_SIGNAL, REACTION_LABELS, type Reaction } from "@/lib/signals";

// Force dynamic — this route must always run server-side, never be statically cached.
// Without this, Next.js 14 GET handlers can be pre-rendered at build time,
// which would freeze the fallback response and never fetch live CSV data.
export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// /api/signal-summary
//
// GET — reads the published Signal Summary CSV from Google Sheets and returns
// normalised aggregate JSON for the active signal.
//
// Env var required:  SIGNAL_SUMMARY_CSV_URL
//   → Google Sheets: File → Share → Publish to web → CSV of the summary tab
//   → Server-side only. Never exposed to client.
//
// If the env var is missing, the CSV is unreachable, or the active signal row
// is not found, the route returns mode:"fallback" with zero values.
// It never returns a non-2xx status for data unavailability.
// ─────────────────────────────────────────────────────────────────────────────

// ── Response types ────────────────────────────────────────────────────────────

interface ReactionMetric {
  reaction: Reaction;
  label:    string;
  percent:  number;
  count:    number;
}

interface SignalSummaryResponse {
  ok:              true;
  mode:            "live" | "fallback";
  signal_id:       string;
  total_responses: number;
  last_updated:    string | null;
  metrics:         ReactionMetric[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Build a zero-value fallback response for the active signal.
 * Used when the env var is absent, the CSV is unreachable, or no row is found.
 */
function buildFallback(): SignalSummaryResponse {
  return {
    ok:              true,
    mode:            "fallback",
    signal_id:       ACTIVE_SIGNAL.signal_id,
    total_responses: 0,
    last_updated:    null,
    metrics:         ACTIVE_SIGNAL.reactions.map((reaction) => ({
      reaction,
      label:   REACTION_LABELS[reaction],
      percent: 0,
      count:   0,
    })),
  };
}

/**
 * Parse a percent value that may arrive from Google Sheets as:
 *   "50.00%"  — formatted string   → return 50.0
 *   "0.5"     — decimal proportion → return 50.0
 *   "50"      — plain number       → return 50.0
 * Returns 0 for any unparseable input.
 */
function parsePercent(raw: string): number {
  const trimmed = raw.trim();
  if (trimmed === "" || trimmed === "0") return 0;

  // Formatted percentage string, e.g. "50.00%"
  if (trimmed.endsWith("%")) {
    const n = parseFloat(trimmed); // parseFloat stops before "%"
    return isNaN(n) ? 0 : Math.round(n * 10) / 10;
  }

  const n = parseFloat(trimmed);
  if (isNaN(n)) return 0;

  // Decimal proportion in [0, 1] range → convert to 0–100
  if (n >= 0 && n <= 1) return Math.round(n * 1000) / 10;

  // Already expressed as a percentage value
  return Math.round(n * 10) / 10;
}

/**
 * Minimal CSV parser — splits on newlines and commas.
 * Safe for the Signal Summary sheet (no embedded commas or newlines in values).
 * Strips surrounding double-quotes from each cell.
 */
function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0]
    .split(",")
    .map((h) => h.trim().replace(/^"|"$/g, ""));

  return lines.slice(1).map((line) => {
    const values = line
      .split(",")
      .map((v) => v.trim().replace(/^"|"$/g, ""));
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] ?? "";
    });
    return row;
  });
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(): Promise<NextResponse> {
  const csvUrl = process.env.SIGNAL_SUMMARY_CSV_URL;

  // ── Local / env-missing mode ──────────────────────────────────────────────
  if (!csvUrl) {
    console.log("[signal-summary] SIGNAL_SUMMARY_CSV_URL not set — returning fallback");
    return NextResponse.json(buildFallback());
  }

  // ── Fetch CSV ─────────────────────────────────────────────────────────────
  let text: string;
  try {
    const res = await fetch(csvUrl, { cache: "no-store" });
    if (!res.ok) {
      console.error("[signal-summary] CSV fetch returned HTTP", res.status);
      return NextResponse.json(buildFallback());
    }
    text = await res.text();
  } catch (fetchErr) {
    console.error("[signal-summary] CSV fetch failed:", fetchErr);
    return NextResponse.json(buildFallback());
  }

  // ── Parse + find active row ───────────────────────────────────────────────
  let rows: Record<string, string>[];
  try {
    rows = parseCSV(text);
  } catch (parseErr) {
    console.error("[signal-summary] CSV parse failed:", parseErr);
    return NextResponse.json(buildFallback());
  }

  const row = rows.find((r) => r["signal_id"] === ACTIVE_SIGNAL.signal_id);

  if (!row) {
    console.warn(
      "[signal-summary] No row found for signal_id:",
      ACTIVE_SIGNAL.signal_id,
      "— available:",
      rows.map((r) => r["signal_id"]).join(", ") || "(none)"
    );
    return NextResponse.json(buildFallback());
  }

  // ── Normalise ─────────────────────────────────────────────────────────────
  const totalRaw  = parseInt(row["total_responses"] ?? "0", 10);
  const total     = isNaN(totalRaw) ? 0 : totalRaw;

  const metrics: ReactionMetric[] = ACTIVE_SIGNAL.reactions.map((reaction) => {
    const countRaw = parseInt(row[`${reaction}_count`] ?? "0", 10);
    return {
      reaction,
      label:   REACTION_LABELS[reaction],
      percent: parsePercent(row[`${reaction}_percent`] ?? "0"),
      count:   isNaN(countRaw) ? 0 : countRaw,
    };
  });

  const response: SignalSummaryResponse = {
    ok:              true,
    mode:            "live",
    signal_id:       ACTIVE_SIGNAL.signal_id,
    total_responses: total,
    last_updated:    row["last_updated"] ?? null,
    metrics,
  };

  console.log("[signal-summary] Returning live data — total_responses:", total);
  return NextResponse.json(response);
}
