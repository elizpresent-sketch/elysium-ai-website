// ─────────────────────────────────────────────────────────────────────────────
// ELIZIUM SIGNAL CONFIG
// Single source of truth for the active Signal of the Day and related types.
// The active signal drives the homepage §02 display and the signal-reaction API.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────────────────────

/** Lowercase reaction values — must match ALLOWED_REACTIONS in /api/signal-reaction/route.ts */
export type Reaction = "anxiety" | "interest" | "trust" | "discomfort" | "emptiness";

/** Display labels for each reaction (shown in UI, not sent to API) */
export const REACTION_LABELS: Record<Reaction, string> = {
  anxiety:    "Anxiety",
  interest:   "Interest",
  trust:      "Trust",
  discomfort: "Discomfort",
  emptiness:  "Emptiness",
};

/** Full Signal config shape */
export interface Signal {
  signal_id:   string;    // sent to Make / Google Sheets
  date:        string;    // ISO date string YYYY-MM-DD
  theme:       string;    // descriptive theme label
  statistic:   string;    // large display figure, e.g. "67%"
  statement:   string;    // sentence following the statistic
  prompt:      string;    // reaction prompt label, e.g. "What did you feel?"
  source_page: string;    // sent to Make / Google Sheets — must match API validation
  reactions:   Reaction[]; // ordered list of allowed reactions for this signal
}

// ── Active Signal ─────────────────────────────────────────────────────────────
// Update this object when rotating to a new Signal of the Day.
// All homepage §02 values and the signal-reaction API payload derive from here.

export const ACTIVE_SIGNAL: Signal = {
  signal_id:   "signal-2026-05-23",
  date:        "2026-05-23",
  theme:       "AI Anxiety",
  statistic:   "67%",
  statement:   "experienced anxiety when AI began to speak too humanly.",
  prompt:      "What did you feel?",
  source_page: "homepage_signal_of_the_day",
  reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
};

// ─────────────────────────────────────────────────────────────────────────────
// LIVE EMOTIONAL DATA — FALLBACK METRICS
// These static values drive the homepage §06 Live Emotional Data display.
// Future: replace with aggregate data fetched from Google Sheets summary sheet.
// When real data is available, swap LIVE_EMOTIONAL_FALLBACK for a fetched array
// of the same shape without changing the rendering code.
// ─────────────────────────────────────────────────────────────────────────────

/** A single display metric in the Live Emotional Data section */
export interface EmotionalMetric {
  value:            number;
  suffix?:          string;
  label:            string;
  description?:     string;
  relatedReaction?: Reaction;
}

/**
 * Current fallback metrics for §06.
 * These represent platform-level figures, not per-signal aggregates.
 *
 * Future Google Sheets summary shape (do not implement yet):
 *   signal_id | total_responses
 *   | anxiety_count  | interest_count  | trust_count  | discomfort_count  | emptiness_count
 *   | anxiety_percent| interest_percent| trust_percent| discomfort_percent| emptiness_percent
 *   | last_updated
 */
export const LIVE_EMOTIONAL_FALLBACK: EmotionalMetric[] = [
  {
    value:       78,
    label:       "Emotional Response Index",
    description: "Aggregate interaction rate across live signal events",
  },
  {
    value:       91,
    suffix:      "%",
    label:       "Signal Continuity",
    description: "Proportion of completed signal interactions",
  },
  {
    value:       64,
    suffix:      "%",
    label:       "Post-Event Interaction Rate",
    description: "Audience re-engagement after initial experience",
  },
  {
    value:       5,
    label:       "Brand Insight Layers",
    description: "Emotional intelligence dimensions extracted per signal",
  },
];
