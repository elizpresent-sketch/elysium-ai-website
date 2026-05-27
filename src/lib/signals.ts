// ─────────────────────────────────────────────────────────────────────────────
// ELIZIUM SIGNAL CONFIG
// Single source of truth for all Signal of the Day data and related types.
//
// ACTIVE_SIGNAL_MODE = "date" — signals activate automatically on their date (Europe/London).
//
// To add a new scheduled signal:
//   1. Add an entry to SIGNAL_ARCHIVE below with the correct date, theme, statistic,
//      statement, prompt. Use Signal Calendar as the content source.
//   2. Update ACTIVE_SIGNAL_ID to this signal's signal_id (becomes the fallback).
//   3. Add a row to the Google Sheets Signal Summary tab (same signal_id) before
//      the activation date is reached — required for live reaction data.
//   4. No other file needs to change — the resolver auto-activates on the date.
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
    signal_id:   "signal-2026-05-27",
    date:        "2026-05-27",
    theme:       "Machine Intimacy",
    statistic:   "61%",
    statement:   "felt that intelligent systems become more powerful when they feel personally close.",
    prompt:      "When does technology begin to feel intimate rather than useful?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  // ── Scheduled — add to Signal Summary tab before each date is reached ──────
  // Source: Signal Calendar Google Sheet. Add new entries here + update ACTIVE_SIGNAL_ID.

  {
    signal_id:   "signal-2026-05-28",
    date:        "2026-05-28",
    theme:       "Future Trust",
    statistic:   "69%",
    statement:   "said they would trust AI more if the system showed its limits clearly.",
    prompt:      "What makes an intelligent system feel trustworthy?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  {
    signal_id:   "signal-2026-05-29",
    date:        "2026-05-29",
    theme:       "Synthetic Presence",
    statistic:   "54%",
    statement:   "felt emotionally aware of an artificial presence even when they knew it was not human.",
    prompt:      "Can something artificial still feel present?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  {
    signal_id:   "signal-2026-05-30",
    date:        "2026-05-30",
    theme:       "Artificial Empathy",
    statistic:   "63%",
    statement:   "said AI empathy feels powerful but difficult to fully believe.",
    prompt:      "When does simulated empathy become emotionally convincing?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  {
    signal_id:   "signal-2026-05-31",
    date:        "2026-05-31",
    theme:       "The Right to Refuse AI",
    statistic:   "71%",
    statement:   "felt safer when human refusal remained part of the system.",
    prompt:      "Should people always have the right to refuse intelligent systems?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  {
    signal_id:   "signal-2026-06-01",
    date:        "2026-06-01",
    theme:       "Emotional Memory",
    statistic:   "58%",
    statement:   "felt that systems become more unsettling when they remember emotional behaviour over time.",
    prompt:      "Would you let a system remember how you felt?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  {
    signal_id:   "signal-2026-06-02",
    date:        "2026-06-02",
    theme:       "Human Override",
    statistic:   "66%",
    statement:   "said intelligent assistance feels safer when human override remains visible.",
    prompt:      "At what point should human control interrupt AI decision-making?",
    source_page: "homepage_signal_of_the_day",
    reactions:   ["anxiety", "interest", "trust", "discomfort", "emptiness"],
  },

  // ── Archived — past signals ───────────────────────────────────────────────

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
    signal_id:   "signal-2026-05-23",
    date:        "2026-05-23",
    theme:       "AI Anxiety",
    statistic:   "67%",
    statement:   "experienced anxiety when AI began to speak too humanly.",
    prompt:      "What did you feel?",
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
//   "manual" — always use ACTIVE_SIGNAL_ID below. Explicit override.
//   "date"   — select the signal whose date matches today in Europe/London time.
//              Falls back to ACTIVE_SIGNAL_ID if no signal in SIGNAL_ARCHIVE
//              matches today's date.
//
// Current mode: "date" — automatic date-based selection is active.
// ACTIVE_SIGNAL_ID below is the fallback when no date match exists.

export type ActiveSignalMode = "manual" | "date";

/**
 * Activation mode for the Signal of the Day.
 * "date" — resolves by matching today's Europe/London date against signal.date.
 * Falls back to ACTIVE_SIGNAL_ID when no archive entry matches today.
 */
export const ACTIVE_SIGNAL_MODE: ActiveSignalMode = "date";

// ── Fallback Signal ID ────────────────────────────────────────────────────────
// In date mode: used when today's date has no matching signal in SIGNAL_ARCHIVE.
// In manual mode: the always-active signal.
//
// Keep this pointing to the most recently confirmed, safe signal.
// When adding a new signal to SIGNAL_ARCHIVE, also add a row to the
// Google Sheets Signal Summary tab before that date is reached.

/** Fallback signal_id when no date-based match is found. */
export const ACTIVE_SIGNAL_ID = "signal-2026-05-27";

/**
 * Returns today's date as YYYY-MM-DD in the Europe/London timezone.
 * Correctly handles both GMT (UTC+0) and BST (UTC+1) transitions.
 * Used by getResolvedActiveSignal() and available for display in system-preview.
 */
export function getLondonDateString(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });
}

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
 * - "date":   returns the signal matching today's Europe/London date,
 *             falling back to ACTIVE_SIGNAL_ID if no match.
 *
 * Always returns a valid Signal. Throws if ACTIVE_SIGNAL_ID is not in SIGNAL_ARCHIVE.
 */
export function getResolvedActiveSignal(): Signal {
  if (ACTIVE_SIGNAL_MODE === "date") {
    const today = getLondonDateString();
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

// ── Archive integrity check ───────────────────────────────────────────────
// Verifies that every scheduled signal (2026-05-27 through 2026-06-02) is
// present in SIGNAL_ARCHIVE with the correct signal_id.
// Runs at module initialisation — any build will catch a missing or
// mis-dated entry before it reaches production.
// Update this list whenever new signals are added to SIGNAL_ARCHIVE.
const _scheduledSignals: Array<[string, string]> = [
  ["2026-05-27", "signal-2026-05-27"],
  ["2026-05-28", "signal-2026-05-28"],
  ["2026-05-29", "signal-2026-05-29"],
  ["2026-05-30", "signal-2026-05-30"],
  ["2026-05-31", "signal-2026-05-31"],
  ["2026-06-01", "signal-2026-06-01"],
  ["2026-06-02", "signal-2026-06-02"],
];
for (const [date, expectedId] of _scheduledSignals) {
  const match = getSignalForDate(date);
  if (!match || match.signal_id !== expectedId) {
    throw new Error(
      `[signals] Archive integrity failure: ${expectedId} not found in SIGNAL_ARCHIVE. ` +
      `Add the entry (date: ${date}) before deploying.`
    );
  }
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
