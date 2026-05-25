// ─────────────────────────────────────────────────────────────────────────────
// ELIZIUM SIGNAL CONFIG
// Single source of truth for all Signal of the Day data and related types.
//
// To rotate to a new signal:
//   1. Change ACTIVE_SIGNAL_ID to the signal_id of the next signal.
//   2. Ensure that signal exists in SIGNAL_ARCHIVE.
//   3. Ensure the corresponding row exists in the Google Sheets Signal Summary tab.
//   4. No other file needs to change.
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
  signal_id:   string;     // sent to Make / Google Sheets — must be unique per signal
  date:        string;     // ISO date string YYYY-MM-DD
  theme:       string;     // descriptive theme label
  statistic:   string;     // large display figure, e.g. "67%"
  statement:   string;     // sentence following the statistic
  prompt:      string;     // reaction prompt shown to the audience
  source_page: string;     // sent to Make / Google Sheets — must match API validation
  reactions:   Reaction[]; // ordered list of allowed reactions for this signal
}

// ── Signal Archive ────────────────────────────────────────────────────────────
// Complete list of all signals — active and draft.
// The active signal is identified by ACTIVE_SIGNAL_ID below, not by array position.
// Drafts are not displayed and do not affect any live system until activated.
// Google Sheets Signal Summary should have one row per signal_id when activated.

export const SIGNAL_ARCHIVE: Signal[] = [

  // ── Currently active ──────────────────────────────────────────────────────
  {
    signal_id:   "signal-2026-05-23",
    date:        "2026-05-23",
    theme:       "AI Anxiety",
    statistic:   "67%",
    statement:   "experienced anxiety when AI began to speak too humanly.",
    prompt:      "What did you feel?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  // ── Drafts — do not activate without updating ACTIVE_SIGNAL_ID ───────────

  {
    signal_id:   "signal-2026-05-24",
    date:        "2026-05-24",
    theme:       "System Trust",
    statistic:   "72%",
    statement:   "hesitated before trusting an AI system that seemed emotionally aware.",
    prompt:      "What makes you trust a system that seems to understand you?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  {
    signal_id:   "signal-2026-05-25",
    date:        "2026-05-25",
    theme:       "Human Control",
    statistic:   "58%",
    statement:   "felt uncertainty when control shifted from human decision to intelligent system response.",
    prompt:      "When does assistance become control?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  {
    signal_id:   "signal-2026-05-26",
    date:        "2026-05-26",
    theme:       "Emotional Memory",
    statistic:   "64%",
    statement:   "felt uneasy imagining a system that remembers emotional responses over time.",
    prompt:      "Would you let a system remember how you felt?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

];

// ── Archive helper ────────────────────────────────────────────────────────────

/** Look up a signal from the archive by its signal_id. Returns undefined if not found. */
export function getSignalById(id: string): Signal | undefined {
  return SIGNAL_ARCHIVE.find((s) => s.signal_id === id);
}

// ── Activation Mode ───────────────────────────────────────────────────────────
// Controls how the active signal is chosen.
//
//   "manual" (current) — always use ACTIVE_SIGNAL_ID below. Safe, explicit, default.
//   "date"             — select the signal whose date matches today (YYYY-MM-DD).
//                        Falls back to ACTIVE_SIGNAL_ID if no signal matches today.
//
// ⚠️  DO NOT switch to "date" until:
//   1. Google Sheets Signal Summary has a row for every scheduled signal_id.
//   2. A decision has been made on whether Insight Reports are auto or manually approved.
//   3. All signals in the archive have been reviewed and their content confirmed.

export type ActiveSignalMode = "manual" | "date";

/**
 * Activation mode for the Signal of the Day.
 * Change to "date" to enable automatic date-based signal selection.
 * Must remain "manual" until the checklist above is satisfied.
 */
export const ACTIVE_SIGNAL_MODE: ActiveSignalMode = "manual";

// ── Active Signal ─────────────────────────────────────────────────────────────
// In manual mode: change ACTIVE_SIGNAL_ID to rotate to a different signal.
// In date mode: ACTIVE_SIGNAL_ID is used as the fallback when no date match exists.

/** The signal_id used in manual mode, or as fallback in date mode. */
export const ACTIVE_SIGNAL_ID = "signal-2026-05-25";

/**
 * Returns the signal whose date field matches the given YYYY-MM-DD string.
 * Returns null if no signal in SIGNAL_ARCHIVE has that date.
 */
export function getSignalForDate(dateString: string): Signal | null {
  return SIGNAL_ARCHIVE.find((s) => s.date === dateString) ?? null;
}

/**
 * Resolves the active signal based on ACTIVE_SIGNAL_MODE.
 * - "manual": returns the signal matching ACTIVE_SIGNAL_ID.
 * - "date":   returns the signal matching today's date, falling back to ACTIVE_SIGNAL_ID.
 *
 * Always returns a valid Signal. Throws if ACTIVE_SIGNAL_ID is not in SIGNAL_ARCHIVE.
 */
export function getResolvedActiveSignal(): Signal {
  if (ACTIVE_SIGNAL_MODE === "date") {
    const today = new Date().toISOString().slice(0, 10);
    return getSignalForDate(today) ?? getSignalById(ACTIVE_SIGNAL_ID)!;
  }
  return getSignalById(ACTIVE_SIGNAL_ID)!;
}

/**
 * The currently active Signal of the Day.
 * Resolved via ACTIVE_SIGNAL_MODE — see getResolvedActiveSignal() above.
 * Used by homepage §02, /api/signal-summary, and /api/signal-reaction payload.
 *
 * Non-null assertion in getResolvedActiveSignal is intentional:
 * ACTIVE_SIGNAL_ID must always exist in SIGNAL_ARCHIVE — runtime error if not.
 */
export const ACTIVE_SIGNAL: Signal = getResolvedActiveSignal();

/** Return the currently active signal. Convenience wrapper around ACTIVE_SIGNAL. */
export function getActiveSignal(): Signal {
  return ACTIVE_SIGNAL;
}

// ─────────────────────────────────────────────────────────────────────────────
// LIVE EMOTIONAL DATA — FALLBACK METRICS
// These static values drive the homepage §06 Live Emotional Data display
// when /api/signal-summary returns fallback mode (no live data available).
// When real aggregate data is available, the live API values are shown instead.
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
 * Static fallback metrics for §06 Live Emotional Data.
 * These represent platform-level figures shown when no live signal data is available.
 *
 * Google Sheets Signal Summary shape (one row per signal_id):
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
