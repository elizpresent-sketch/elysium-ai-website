"use client";

import { useEffect, useState } from "react";
import { ACTIVE_SIGNAL_ID, ACTIVE_SIGNAL, ACTIVE_SIGNAL_MODE, SIGNAL_ARCHIVE } from "@/lib/signals";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS — mirror homepage values so page inherits the same dark foundation
// ─────────────────────────────────────────────────────────────────────────────

const BG = "#050505";
const W  = "max-w-[1440px] mx-auto px-6 lg:px-12";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface SummaryMetric {
  reaction: string;
  label:    string;
  percent:  number;
  count:    number;
}

interface SignalSummaryData {
  ok:              boolean;
  mode:            "live" | "fallback";
  signal_id:       string;
  total_responses: number;
  last_updated:    string | null;
  metrics:         SummaryMetric[];
}

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

interface InsightReportData {
  ok:     boolean;
  mode:   "live" | "fallback";
  report: InsightReport | null;
}

interface LatestInquiry {
  inquiry_id:   string;
  timestamp:    string;
  source_page:  string;
  name:         string;
  company:      string;
  request_type: string;
  status:       string;
}

interface InquirySummaryData {
  ok:                       boolean;
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
  request_type_breakdown:   Array<{ request_type: string; count: number }>;
  latest_inquiries:         LatestInquiry[];
}

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

interface SignalCalendarData {
  ok:                   boolean;
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

// ─────────────────────────────────────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({ label, num }: { label: string; num: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[#1C2530]/70 pt-3 mb-6">
      <span className="text-[8px] tracking-[0.40em] uppercase font-medium text-[#6B7278]">
        {label}
      </span>
      <span className="text-[8px] tracking-[0.36em] font-normal text-[#6B7278]/30">
        {num}
      </span>
    </div>
  );
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
      style={{
        background: active
          ? "rgba(180,205,180,0.85)"
          : "rgba(110,120,130,0.45)",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SystemPreview() {
  const [summary, setSummary]           = useState<SignalSummaryData | null>(null);
  const [summaryLoading, setLoading]    = useState(true);
  const [mountedDate, setMountedDate]   = useState("");
  const [insight, setInsight]                             = useState<InsightReportData | null>(null);
  const [insightLoading, setInsightLoading]               = useState(true);
  const [inquirySummary, setInquirySummary]               = useState<InquirySummaryData | null>(null);
  const [inquirySummaryLoading, setInquirySummaryLoading] = useState(true);
  const [calendarData, setCalendarData]                   = useState<SignalCalendarData | null>(null);
  const [calendarLoading, setCalendarLoading]             = useState(true);

  useEffect(() => {
    setMountedDate(new Date().toISOString().slice(0, 10));
    fetch("/api/signal-summary")
      .then((r) => r.json())
      .then((data: SignalSummaryData) => { if (data?.ok) setSummary(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
    fetch("/api/insight-report")
      .then((r) => r.json())
      .then((data: InsightReportData) => { if (data?.ok) setInsight(data); })
      .catch(() => {})
      .finally(() => setInsightLoading(false));
    fetch("/api/inquiry-summary")
      .then((r) => r.json())
      .then((data: InquirySummaryData) => { if (data?.ok) setInquirySummary(data); })
      .catch(() => {})
      .finally(() => setInquirySummaryLoading(false));
    fetch("/api/signal-calendar")
      .then((r) => r.json())
      .then((data: SignalCalendarData) => { if (data?.ok) setCalendarData(data); })
      .catch(() => {})
      .finally(() => setCalendarLoading(false));
  }, []);

  const isLive                 = summary?.mode === "live" && (summary?.total_responses ?? 0) > 0;
  const insightIsLive          = insight?.mode === "live" && insight?.report !== null;
  const insightReport          = insight?.report ?? null;
  const inquiryIsLive          = inquirySummary?.mode === "live";
  const calendarIsLive         = calendarData?.mode === "live";

  // §00 — derived connection states (mode only, not data presence)
  const signalSummaryConnected = summary?.mode === "live";
  const insightConnected       = insight?.mode === "live";
  const allLoaded              = !summaryLoading && !insightLoading && !inquirySummaryLoading && !calendarLoading;

  const nextActions: string[] = [];
  if (allLoaded) {
    if ((calendarData?.report_pending  ?? 0) > 0)          nextActions.push("Review pending insight report");
    if ((inquirySummary?.new_inquiries ?? 0) > 0)          nextActions.push("Review new inquiries");
    if ((calendarData?.upcoming_signals.length ?? 0) > 0)  nextActions.push("Prepare next signal");
    const anyFallback = !signalSummaryConnected || !calendarIsLive || !inquiryIsLive || !insightConnected;
    if (anyFallback) nextActions.push("Check CSV env / published sheet connection");
    if (nextActions.length === 0) nextActions.push("System stable — continue monitoring");
  }

  // Reaction rows — live metrics if available, else zero-value from active signal
  const reactionRows: SummaryMetric[] = summary?.metrics ?? ACTIVE_SIGNAL.reactions.map((r) => ({
    reaction: r,
    label:    r.charAt(0).toUpperCase() + r.slice(1),
    percent:  0,
    count:    0,
  }));

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div
        className={`${W} pt-10 pb-6`}
        style={{ borderBottom: "1px solid rgba(28,37,48,0.70)" }}
      >
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="text-[7.5px] tracking-[0.45em] uppercase text-[#6B7278] font-medium">
              ELIZIUM Platform
            </span>
            <h1
              className="font-display font-normal uppercase text-[#E2E8EE] tracking-[0.07em] leading-none"
              style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.8rem)" }}
            >
              System Preview
            </h1>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[7px] tracking-[0.30em] uppercase text-[#6B7278]/55 font-medium">
              Internal — Read Only
            </span>
            {mountedDate && (
              <span className="text-[7px] tracking-[0.22em] text-[#6B7278]/35">
                {mountedDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className={`${W} pt-10 pb-24 flex flex-col gap-14`}>

        {/* ══════════════════════════════════════════════════════════════════
            §00 · SYSTEM STATUS / NEXT ACTIONS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel label="System Status / Next Actions" num="00" />

          {/* API connections + Active signal */}
          <div
            className="grid grid-cols-2"
            style={{ border: "1px solid rgba(28,37,48,0.65)" }}
          >
            {/* Left — API connections */}
            <div style={{ borderRight: "1px solid rgba(28,37,48,0.55)" }}>
              <div
                className="px-4 py-2.5"
                style={{ borderBottom: "1px solid rgba(28,37,48,0.55)" }}
              >
                <span className="text-[7.5px] tracking-[0.30em] uppercase text-[#6B7278]/45 font-medium">
                  API Connections
                </span>
              </div>
              {[
                { label: "Signal Reactions", connected: signalSummaryConnected, loading: summaryLoading },
                { label: "Signal Calendar",  connected: calendarIsLive,         loading: calendarLoading },
                { label: "Inquiry CRM",      connected: inquiryIsLive,          loading: inquirySummaryLoading },
                { label: "Insight Reports",  connected: insightConnected,       loading: insightLoading },
              ].map(({ label, connected, loading }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(28,37,48,0.40)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <StatusDot active={!loading && connected} />
                    <span className="text-[8px] tracking-[0.22em] uppercase text-[#969CA2] font-medium">
                      {label}
                    </span>
                  </div>
                  <span className="text-[8px] tracking-[0.18em] uppercase font-medium text-[#C8CDD2]">
                    {loading ? "Connecting…" : connected ? "Live" : "Fallback"}
                  </span>
                </div>
              ))}
            </div>

            {/* Right — Active signal identity */}
            <div>
              <div
                className="px-4 py-2.5"
                style={{ borderBottom: "1px solid rgba(28,37,48,0.55)" }}
              >
                <span className="text-[7.5px] tracking-[0.30em] uppercase text-[#6B7278]/45 font-medium">
                  Active Signal
                </span>
              </div>
              {[
                { key: "Signal ID",     val: ACTIVE_SIGNAL_ID },
                { key: "Theme",         val: ACTIVE_SIGNAL.theme },
                {
                  key: "Report Status",
                  val: calendarLoading
                    ? "Connecting…"
                    : (calendarData?.latest_active_signal?.report_status ?? "—"),
                },
              ].map(({ key, val }) => (
                <div
                  key={key}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(28,37,48,0.40)" }}
                >
                  <span className="text-[8px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
                    {key}
                  </span>
                  <span className="text-[10px] tracking-[0.08em] text-[#C8CDD2] text-right max-w-[60%]">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Next actions */}
          <div style={{ border: "1px solid rgba(28,37,48,0.65)", borderTop: "none" }}>
            <div
              className="px-4 py-2.5"
              style={{ borderBottom: "1px solid rgba(28,37,48,0.55)" }}
            >
              <span className="text-[7.5px] tracking-[0.30em] uppercase text-[#6B7278]/45 font-medium">
                Next Actions
              </span>
            </div>
            {!allLoaded ? (
              <div className="px-4 py-4">
                <span className="text-[10px] tracking-[0.06em] text-[#3A4048]">Analyzing…</span>
              </div>
            ) : (
              nextActions.map((action, i) => (
                <div
                  key={action}
                  className="flex items-start gap-5 px-4 py-4"
                  style={{ borderBottom: "1px solid rgba(28,37,48,0.35)" }}
                >
                  <span className="text-[8px] tracking-[0.32em] uppercase text-[#6B7278]/45 font-medium w-5 flex-shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[12.5px] text-[#8E949A] leading-relaxed tracking-[0.03em]">
                    {action}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            §01 · ACTIVE SIGNAL
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel label="Active Signal" num="01" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

            {/* Identity table */}
            <div style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { key: "Signal ID",       val: ACTIVE_SIGNAL_ID },
                { key: "Activation Mode", val: ACTIVE_SIGNAL_MODE === "manual" ? "Manual" : "Date-Based" },
                { key: "Theme",           val: ACTIVE_SIGNAL.theme },
                { key: "Date",       val: ACTIVE_SIGNAL.date },
                { key: "Status",     val: "Active" },
                { key: "Source",     val: ACTIVE_SIGNAL.source_page },
              ].map(({ key, val }) => (
                <div
                  key={key}
                  className="flex items-baseline justify-between px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(28,37,48,0.55)" }}
                >
                  <span className="text-[8px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
                    {key}
                  </span>
                  <span className="text-[10.5px] tracking-[0.08em] text-[#C8CDD2] text-right max-w-[60%]">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="text-[8px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
                  Statistic
                </span>
                <span
                  className="font-display font-normal text-[#E2E8EE] leading-none tracking-[0.04em]"
                  style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}
                >
                  {ACTIVE_SIGNAL.statistic}
                </span>
              </div>
              <div
                className="flex flex-col gap-2 pt-4"
                style={{ borderTop: "1px solid rgba(28,37,48,0.55)" }}
              >
                <span className="text-[8px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
                  Statement
                </span>
                <p className="text-[13px] text-[#C8CDD2] leading-relaxed">
                  {ACTIVE_SIGNAL.statement}
                </p>
              </div>
              <div
                className="flex flex-col gap-2 pt-4"
                style={{ borderTop: "1px solid rgba(28,37,48,0.55)" }}
              >
                <span className="text-[8px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
                  Prompt
                </span>
                <p className="text-[13px] text-[#8E949A] leading-relaxed">
                  &ldquo;{ACTIVE_SIGNAL.prompt}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            §02 · LIVE SUMMARY
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel label="Live Summary" num="02" />

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ border: "1px solid rgba(28,37,48,0.65)" }}
          >
            <div className="flex items-center gap-2.5">
              <StatusDot active={isLive} />
              <span className="text-[8px] tracking-[0.28em] uppercase font-medium text-[#969CA2]">
                {summaryLoading
                  ? "Connecting…"
                  : isLive
                  ? "Live Data"
                  : "Fallback Mode"}
              </span>
            </div>
            <div className="flex items-center gap-5">
              {!summaryLoading && summary && (
                <span className="text-[8px] tracking-[0.20em] uppercase text-[#6B7278]">
                  {summary.total_responses} response{summary.total_responses !== 1 ? "s" : ""}
                </span>
              )}
              {summary?.last_updated && (
                <span className="text-[7.5px] tracking-[0.14em] text-[#6B7278]/50">
                  updated {summary.last_updated.slice(0, 10)}
                </span>
              )}
            </div>
          </div>

          {/* Reaction distribution */}
          <div style={{ border: "1px solid rgba(28,37,48,0.65)", borderTop: "none" }}>
            {/* Column headers */}
            <div
              className="grid grid-cols-[120px_1fr_52px_40px] gap-4 px-4 py-2"
              style={{ borderBottom: "1px solid rgba(28,37,48,0.55)" }}
            >
              {["Reaction", "Distribution", "%", "n"].map((h) => (
                <span
                  key={h}
                  className="text-[7.5px] tracking-[0.30em] uppercase text-[#6B7278]/45 font-medium"
                >
                  {h}
                </span>
              ))}
            </div>

            {reactionRows.map((m) => (
              <div
                key={m.reaction}
                className="grid grid-cols-[120px_1fr_52px_40px] gap-4 items-center px-4 py-3.5"
                style={{ borderBottom: "1px solid rgba(28,37,48,0.40)" }}
              >
                <span className="text-[8.5px] tracking-[0.20em] uppercase text-[#8E949A] font-medium">
                  {m.label}
                </span>
                {/* Bar track */}
                <div
                  className="w-full h-0.5 relative"
                  style={{ background: "rgba(28,37,48,0.90)" }}
                >
                  <div
                    className="absolute left-0 top-0 h-full"
                    style={{
                      width: `${m.percent}%`,
                      background: m.percent > 0 ? "rgba(200,205,210,0.55)" : "transparent",
                      transition: "width 0.8s ease",
                    }}
                  />
                </div>
                <span
                  className="font-display text-right tracking-[0.04em] leading-none"
                  style={{
                    fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                    color: m.percent > 0 ? "#C8CDD2" : "#3A4048",
                  }}
                >
                  {m.percent > 0 ? `${m.percent}` : "—"}
                </span>
                <span
                  className="text-[9px] tracking-[0.12em] text-right"
                  style={{ color: m.count > 0 ? "#6B7278" : "#3A4048" }}
                >
                  {m.count > 0 ? m.count : "—"}
                </span>
              </div>
            ))}
          </div>

          {!isLive && !summaryLoading && (
            <p className="text-[8px] tracking-[0.18em] uppercase text-[#6B7278]/45 mt-2.5">
              No live row found for {ACTIVE_SIGNAL_ID} in Signal Summary tab — add row to enable live mode.
            </p>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            §03 · SIGNAL ARCHIVE
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel label="Signal Archive" num="03" />
          <div style={{ border: "1px solid rgba(28,37,48,0.65)" }}>

            {/* Column headers */}
            <div
              className="grid grid-cols-[2fr_1.4fr_0.9fr_0.7fr] gap-4 px-4 py-2.5"
              style={{ borderBottom: "1px solid rgba(28,37,48,0.65)" }}
            >
              {["Signal ID", "Theme", "Date", "Status"].map((h) => (
                <span
                  key={h}
                  className="text-[7.5px] tracking-[0.30em] uppercase text-[#6B7278]/45 font-medium"
                >
                  {h}
                </span>
              ))}
            </div>

            {SIGNAL_ARCHIVE.map((signal) => {
              const isActive   = signal.signal_id === ACTIVE_SIGNAL_ID;
              const isArchived = signal.date < ACTIVE_SIGNAL.date;
              const statusLabel = isActive ? "Active" : isArchived ? "Past" : "Draft";
              return (
                <div
                  key={signal.signal_id}
                  className="grid grid-cols-[2fr_1.4fr_0.9fr_0.7fr] gap-4 items-center px-4 py-3"
                  style={{
                    borderBottom: "1px solid rgba(28,37,48,0.40)",
                    background: isActive ? "rgba(200,205,210,0.035)" : "transparent",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    {isActive ? (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "rgba(200,205,210,0.85)" }}
                      />
                    ) : (
                      <span className="w-1.5 flex-shrink-0" />
                    )}
                    <span
                      className="text-[10px] tracking-[0.06em]"
                      style={{ color: isActive ? "#E2E8EE" : isArchived ? "#505860" : "#707880" }}
                    >
                      {signal.signal_id}
                    </span>
                  </div>
                  <span
                    className="text-[10px] tracking-[0.06em]"
                    style={{ color: isActive ? "#C8CDD2" : isArchived ? "#505860" : "#6B7278" }}
                  >
                    {signal.theme}
                  </span>
                  <span
                    className="text-[10px] tracking-[0.06em]"
                    style={{ color: isArchived && !isActive ? "#505860" : "#6B7278" }}
                  >
                    {signal.date}
                  </span>
                  <span
                    className="text-[8px] tracking-[0.22em] uppercase font-medium"
                    style={{
                      color: isActive
                        ? "#C8CDD2"
                        : isArchived
                        ? "#3A4048"
                        : "#606870",
                    }}
                  >
                    {statusLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            §04 · SYSTEM STATUS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel label="System Status" num="04" />
          <div style={{ border: "1px solid rgba(28,37,48,0.65)" }}>
            {[
              {
                label:  "Signal Collection",
                value:  "Active",
                detail: `signal_id: ${ACTIVE_SIGNAL_ID}`,
                active: true,
              },
              {
                label:  "Summary API",
                value:  summaryLoading ? "Connecting…" : isLive ? "Live" : "Fallback",
                detail: summary ? `mode: ${summary.mode}` : "no data returned",
                active: isLive,
              },
              {
                label:  "Raw Data",
                value:  "Private",
                detail: "Sheet1 — not published",
                active: false,
              },
              {
                label:  "Summary CSV",
                value:  "Published",
                detail: "Signal Summary tab — aggregate only",
                active: true,
              },
              {
                label:  "Signal Rotation",
                value:  ACTIVE_SIGNAL_MODE === "manual" ? "Manual" : "Date-Based",
                detail: `mode: ${ACTIVE_SIGNAL_MODE} · id: ${ACTIVE_SIGNAL_ID}`,
                active: ACTIVE_SIGNAL_MODE === "date",
              },
              {
                label:  "Date Activation",
                value:  ACTIVE_SIGNAL_MODE === "date" ? "Active" : "Prepared",
                detail: "Set ACTIVE_SIGNAL_MODE to 'date' in signals.ts",
                active: ACTIVE_SIGNAL_MODE === "date",
              },
              {
                label:  "Insight Reports",
                value:  "Manual MVP",
                detail: "Insight Reports tab — Google Sheets",
                active: false,
              },
            ].map(({ label, value, detail, active }) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid rgba(28,37,48,0.40)" }}
              >
                <div className="flex items-center gap-3">
                  <StatusDot active={active} />
                  <span className="text-[8.5px] tracking-[0.22em] uppercase text-[#969CA2] font-medium">
                    {label}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="hidden sm:block text-[8px] tracking-[0.12em] text-[#6B7278]/50">
                    {detail}
                  </span>
                  <span className="text-[8.5px] tracking-[0.18em] uppercase font-medium text-[#C8CDD2]">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            §05 · NEXT OPERATIONAL STEPS
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel label="Next Operational Steps" num="05" />
          <div style={{ border: "1px solid rgba(28,37,48,0.65)" }}>
            {[
              {
                n:    "01",
                step: "Create next Insight Report once signal-2026-05-25 reaches a stronger response count.",
              },
              {
                n:    "02",
                step: "Rotate to next signal by changing ACTIVE_SIGNAL_ID in src/lib/signals.ts and deploying.",
              },
              {
                n:    "—",
                step: "Production-grade later: replace public CSV endpoint with private Google Sheets API access.",
              },
            ].map(({ n, step }) => (
              <div
                key={n}
                className="flex items-start gap-5 px-4 py-4"
                style={{ borderBottom: "1px solid rgba(28,37,48,0.40)" }}
              >
                <span className="text-[8px] tracking-[0.32em] uppercase text-[#6B7278]/45 font-medium w-5 flex-shrink-0 pt-0.5">
                  {n}
                </span>
                <p className="text-[12.5px] text-[#8E949A] leading-relaxed tracking-[0.03em]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            §06 · LATEST INSIGHT REPORT
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel label="Latest Insight Report" num="06" />

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ border: "1px solid rgba(28,37,48,0.65)" }}
          >
            <div className="flex items-center gap-2.5">
              <StatusDot active={insightIsLive} />
              <span className="text-[8px] tracking-[0.28em] uppercase font-medium text-[#969CA2]">
                {insightLoading
                  ? "Connecting…"
                  : insightIsLive
                  ? "Report Loaded"
                  : "No Report"}
              </span>
            </div>
            {insightReport && (
              <span className="text-[7.5px] tracking-[0.18em] text-[#6B7278]/50">
                {insightReport.report_id}
              </span>
            )}
          </div>

          {/* Fallback */}
          {!insightLoading && !insightIsLive && (
            <div
              className="px-4 py-5"
              style={{ border: "1px solid rgba(28,37,48,0.65)", borderTop: "none" }}
            >
              <p className="text-[12px] tracking-[0.05em] text-[#6B7278]/50">
                No insight report loaded yet.
              </p>
            </div>
          )}

          {/* Live report */}
          {insightIsLive && insightReport && (
            <>
              {/* Staleness notice — shown when report belongs to a previous signal */}
              {insightReport.signal_id !== ACTIVE_SIGNAL_ID && (
                <div
                  className="px-4 py-3"
                  style={{ border: "1px solid rgba(28,37,48,0.65)", borderTop: "none" }}
                >
                  <p className="text-[10.5px] tracking-[0.04em] text-[#707880] leading-relaxed">
                    Report references previous signal: {insightReport.signal_id}. Current active signal is {ACTIVE_SIGNAL_ID}. New report pending.
                  </p>
                </div>
              )}

              {/* Identity rows */}
              <div style={{ border: "1px solid rgba(28,37,48,0.65)", borderTop: "none" }}>
                {[
                  { key: "Report ID",       val: insightReport.report_id },
                  { key: "Date Created",    val: insightReport.date_created },
                  { key: "Signal ID",       val: insightReport.signal_id },
                  { key: "Signal Theme",    val: insightReport.signal_theme },
                  { key: "Total Responses", val: String(insightReport.total_responses) },
                  {
                    key: "Dominant",
                    val: [insightReport.dominant_reaction, insightReport.dominant_percent]
                      .filter(Boolean).join(" · ") || "—",
                  },
                  { key: "Status",          val: insightReport.status },
                ].map(({ key, val }) => (
                  <div
                    key={key}
                    className="flex items-baseline justify-between px-4 py-3"
                    style={{ borderBottom: "1px solid rgba(28,37,48,0.45)" }}
                  >
                    <span className="text-[8px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
                      {key}
                    </span>
                    <span className="text-[10.5px] tracking-[0.08em] text-[#C8CDD2] text-right max-w-[65%]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Text fields — only rendered when content exists */}
              <div style={{ border: "1px solid rgba(28,37,48,0.65)", borderTop: "none" }}>
                {[
                  { key: "Emotional Pattern",       val: insightReport.emotional_pattern },
                  { key: "Interpretation",          val: insightReport.interpretation },
                  { key: "Experience Implication",  val: insightReport.experience_implication },
                  { key: "Brand Partner Value",     val: insightReport.brand_partner_value },
                  { key: "Recommended Next Signal", val: insightReport.recommended_next_signal },
                ].map(({ key, val }) =>
                  val ? (
                    <div
                      key={key}
                      className="flex flex-col gap-2 px-4 py-4"
                      style={{ borderBottom: "1px solid rgba(28,37,48,0.40)" }}
                    >
                      <span className="text-[8px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
                        {key}
                      </span>
                      <p className="text-[12.5px] text-[#969CA2] leading-relaxed tracking-[0.03em]">
                        {val}
                      </p>
                    </div>
                  ) : null
                )}
              </div>
            </>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            §07 · INQUIRY PIPELINE
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel label="Inquiry Pipeline" num="07" />

          {/* Status bar */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ border: "1px solid rgba(28,37,48,0.65)" }}
          >
            <div className="flex items-center gap-2.5">
              <StatusDot active={inquiryIsLive} />
              <span className="text-[8px] tracking-[0.28em] uppercase font-medium text-[#969CA2]">
                {inquirySummaryLoading
                  ? "Connecting…"
                  : inquiryIsLive
                  ? "Live Data"
                  : "Fallback Mode"}
              </span>
            </div>
            <div className="flex items-center gap-5">
              {!inquirySummaryLoading && inquirySummary && (
                <span className="text-[8px] tracking-[0.20em] uppercase text-[#6B7278]">
                  {inquirySummary.total_inquiries} total
                </span>
              )}
              {inquirySummary?.latest_inquiry_timestamp && (
                <span className="text-[7.5px] tracking-[0.14em] text-[#6B7278]/50">
                  last {inquirySummary.latest_inquiry_timestamp.slice(0, 10)}
                </span>
              )}
            </div>
          </div>

          {/* Stat tiles */}
          <div
            className="grid grid-cols-5"
            style={{ border: "1px solid rgba(28,37,48,0.65)", borderTop: "none" }}
          >
            {[
              { label: "Total",     val: inquirySummary?.total_inquiries    ?? 0 },
              { label: "New",       val: inquirySummary?.new_inquiries       ?? 0 },
              { label: "Reviewed",  val: inquirySummary?.reviewed_inquiries  ?? 0 },
              { label: "Replied",   val: inquirySummary?.replied_inquiries   ?? 0 },
              { label: "Converted", val: inquirySummary?.converted_inquiries ?? 0 },
            ].map(({ label, val }, i) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 px-4 py-4"
                style={{
                  borderRight: i < 4 ? "1px solid rgba(28,37,48,0.55)" : "none",
                }}
              >
                <span className="text-[7.5px] tracking-[0.28em] uppercase text-[#6B7278]/60 font-medium">
                  {label}
                </span>
                <span
                  className="font-display font-normal leading-none tracking-[0.04em]"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    color: val > 0 ? "#C8CDD2" : "#3A4048",
                  }}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Source breakdown + Request type breakdown */}
          <div
            className="grid grid-cols-2"
            style={{ border: "1px solid rgba(28,37,48,0.65)", borderTop: "none" }}
          >
            {/* Source */}
            <div style={{ borderRight: "1px solid rgba(28,37,48,0.55)" }}>
              <div
                className="px-4 py-2.5"
                style={{ borderBottom: "1px solid rgba(28,37,48,0.55)" }}
              >
                <span className="text-[7.5px] tracking-[0.30em] uppercase text-[#6B7278]/45 font-medium">
                  Source
                </span>
              </div>
              {[
                { label: "Contact Page",   val: inquirySummary?.source_breakdown.contact_page ?? 0 },
                { label: "Homepage PA",    val: inquirySummary?.source_breakdown.homepage_private_access ?? 0 },
                { label: "Other",          val: inquirySummary?.source_breakdown.other ?? 0 },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(28,37,48,0.35)" }}
                >
                  <span className="text-[8.5px] tracking-[0.18em] uppercase text-[#8E949A]">{label}</span>
                  <span
                    className="text-[10px] tracking-[0.06em]"
                    style={{ color: val > 0 ? "#C8CDD2" : "#3A4048" }}
                  >
                    {val > 0 ? val : "—"}
                  </span>
                </div>
              ))}
            </div>

            {/* Request type */}
            <div>
              <div
                className="px-4 py-2.5"
                style={{ borderBottom: "1px solid rgba(28,37,48,0.55)" }}
              >
                <span className="text-[7.5px] tracking-[0.30em] uppercase text-[#6B7278]/45 font-medium">
                  Request Type
                </span>
              </div>
              {inquirySummary?.request_type_breakdown.length ? (
                inquirySummary.request_type_breakdown.map(({ request_type, count }) => (
                  <div
                    key={request_type}
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: "1px solid rgba(28,37,48,0.35)" }}
                  >
                    <span className="text-[8.5px] tracking-[0.18em] uppercase text-[#8E949A]">
                      {request_type || "—"}
                    </span>
                    <span className="text-[10px] tracking-[0.06em] text-[#C8CDD2]">{count}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3">
                  <span className="text-[10px] tracking-[0.06em] text-[#3A4048]">—</span>
                </div>
              )}
            </div>
          </div>

          {/* Latest 3 inquiries */}
          {inquirySummary && inquirySummary.latest_inquiries.length > 0 && (
            <div style={{ border: "1px solid rgba(28,37,48,0.65)", borderTop: "none" }}>
              <div
                className="grid grid-cols-[1.6fr_0.8fr_0.9fr_0.7fr] gap-4 px-4 py-2.5"
                style={{ borderBottom: "1px solid rgba(28,37,48,0.55)" }}
              >
                {["ID / Name", "Source", "Type", "Status"].map((h) => (
                  <span
                    key={h}
                    className="text-[7.5px] tracking-[0.30em] uppercase text-[#6B7278]/45 font-medium"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {inquirySummary.latest_inquiries.map((inq) => (
                <div
                  key={inq.inquiry_id || inq.timestamp}
                  className="grid grid-cols-[1.6fr_0.8fr_0.9fr_0.7fr] gap-4 items-start px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(28,37,48,0.35)" }}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[8.5px] tracking-[0.04em] text-[#C8CDD2]">
                      {inq.name || "—"}
                    </span>
                    {inq.company && (
                      <span className="text-[8px] tracking-[0.04em] text-[#6B7278]">
                        {inq.company}
                      </span>
                    )}
                    <span className="text-[7.5px] tracking-[0.04em] text-[#505860]">
                      {inq.inquiry_id || "—"}
                    </span>
                  </div>
                  <span className="text-[8px] tracking-[0.10em] uppercase text-[#8E949A] pt-0.5">
                    {inq.source_page === "contact_page"
                      ? "Contact"
                      : inq.source_page === "homepage_private_access"
                      ? "Homepage"
                      : inq.source_page || "—"}
                  </span>
                  <span className="text-[8px] tracking-[0.10em] uppercase text-[#8E949A] pt-0.5">
                    {inq.request_type || "—"}
                  </span>
                  <span className="text-[8px] tracking-[0.16em] uppercase text-[#969CA2] pt-0.5">
                    {inq.status || "new"}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Fallback notice */}
          {!inquirySummaryLoading && !inquiryIsLive && (
            <p className="text-[8px] tracking-[0.18em] uppercase text-[#6B7278]/45 mt-2.5">
              Set INQUIRY_LOG_CSV_URL to enable live Inquiry Pipeline data.
            </p>
          )}
        </section>

        {/* ── §08 Scheduled Signals ──────────────────────────────────────────── */}
        <section className="mt-10">
          <SectionLabel label="Scheduled Signals" num="08" />

          {calendarLoading && (
            <p className="text-[8px] tracking-[0.18em] uppercase text-[#6B7278]/45">
              Loading…
            </p>
          )}

          {!calendarLoading && calendarIsLive && calendarData && (
            <>
              {/* Status breakdown */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-6 sm:grid-cols-4">
                {[
                  { label: "Total",    value: calendarData.total_signals    },
                  { label: "Active",   value: calendarData.active_signals   },
                  { label: "Draft",    value: calendarData.draft_signals    },
                  { label: "Archived", value: calendarData.archived_signals },
                  { label: "Skipped",  value: calendarData.skipped_signals  },
                  { label: "Report Pending", value: calendarData.report_pending },
                  { label: "Report Created", value: calendarData.report_created },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278]/50 mb-0.5">
                      {label}
                    </p>
                    <p className="text-[13px] font-light tracking-wide text-[#C8D4DC]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Latest active signal identity card */}
              {calendarData.latest_active_signal && (
                <div
                  className="mb-6 p-4 rounded"
                  style={{ background: "rgba(28,37,48,0.45)" }}
                >
                  <p className="text-[7px] tracking-[0.32em] uppercase text-[#6B7278]/50 mb-2">
                    Latest Active Signal
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <StatusDot active={true} />
                    <span className="text-[10px] tracking-[0.22em] uppercase font-medium text-[#C8D4DC]">
                      {calendarData.latest_active_signal.theme}
                    </span>
                    <span className="text-[8px] tracking-[0.18em] text-[#6B7278]/60 ml-auto">
                      {calendarData.latest_active_signal.signal_id}
                    </span>
                  </div>
                  <p className="text-[8px] tracking-[0.14em] text-[#6B7278]/70 mb-1">
                    {calendarData.latest_active_signal.date}
                  </p>
                  {calendarData.latest_active_signal.statistic && (
                    <p className="text-[8px] tracking-[0.14em] text-[#C8D4DC]/60 mb-1">
                      {calendarData.latest_active_signal.statistic}
                    </p>
                  )}
                  {calendarData.latest_active_signal.statement && (
                    <p className="text-[8px] tracking-[0.12em] italic text-[#6B7278]/55 mb-1">
                      &ldquo;{calendarData.latest_active_signal.statement}&rdquo;
                    </p>
                  )}
                  {calendarData.latest_active_signal.prompt && (
                    <p className="text-[8px] tracking-[0.12em] text-[#6B7278]/50">
                      Prompt: {calendarData.latest_active_signal.prompt}
                    </p>
                  )}
                  <p className="text-[7px] tracking-[0.24em] uppercase text-[#6B7278]/35 mt-2">
                    Report: {calendarData.latest_active_signal.report_status}
                  </p>
                </div>
              )}

              {/* Upcoming (draft) signals */}
              {calendarData.upcoming_signals.length > 0 && (
                <div className="mb-6">
                  <p className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278]/50 mb-2">
                    Upcoming Signals
                  </p>
                  <div className="space-y-1.5">
                    {calendarData.upcoming_signals.map((sig) => (
                      <div key={sig.signal_id} className="flex items-center gap-3">
                        <StatusDot active={false} />
                        <span className="text-[8px] tracking-[0.18em] text-[#6B7278]/60 w-24 flex-shrink-0">
                          {sig.date}
                        </span>
                        <span className="text-[8px] tracking-[0.18em] text-[#C8D4DC]/70 flex-1">
                          {sig.theme}
                        </span>
                        <span className="text-[7px] tracking-[0.22em] uppercase text-[#6B7278]/35">
                          {sig.report_status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All signals compact table */}
              {calendarData.all_signals.length > 0 && (
                <div>
                  <p className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278]/50 mb-2">
                    All Signals
                  </p>
                  <div className="space-y-1.5">
                    {calendarData.all_signals.map((sig) => (
                      <div key={sig.signal_id} className="flex items-center gap-3">
                        <StatusDot active={sig.status === "active"} />
                        <span className="text-[8px] tracking-[0.18em] text-[#6B7278]/60 w-24 flex-shrink-0">
                          {sig.date}
                        </span>
                        <span className="text-[8px] tracking-[0.18em] text-[#C8D4DC]/70 flex-1">
                          {sig.theme}
                        </span>
                        <span className="text-[7px] tracking-[0.22em] uppercase text-[#6B7278]/40 w-16 text-right">
                          {sig.status}
                        </span>
                        <span className="text-[7px] tracking-[0.20em] uppercase text-[#6B7278]/30 w-28 text-right">
                          {sig.report_status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Fallback notice */}
          {!calendarLoading && !calendarIsLive && (
            <p className="text-[8px] tracking-[0.18em] uppercase text-[#6B7278]/45 mt-2.5">
              Set SIGNAL_CALENDAR_CSV_URL to enable live Signal Calendar data.
            </p>
          )}
        </section>

        {/* ── Page foot ──────────────────────────────────────────────────────── */}
        <div
          className="pt-6"
          style={{ borderTop: "1px solid rgba(28,37,48,0.55)" }}
        >
          <span className="text-[7.5px] tracking-[0.30em] uppercase text-[#6B7278]/35">
            ELIZIUM — Internal system preview — not linked publicly
          </span>
        </div>

      </div>
    </div>
  );
}
