"use client";

import { useEffect, useState } from "react";
import { ACTIVE_SIGNAL_ID, ACTIVE_SIGNAL, SIGNAL_ARCHIVE } from "@/lib/signals";

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
  const [insight, setInsight]           = useState<InsightReportData | null>(null);
  const [insightLoading, setInsightLoading] = useState(true);

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
  }, []);

  const isLive        = summary?.mode === "live" && (summary?.total_responses ?? 0) > 0;
  const insightIsLive = insight?.mode === "live" && insight?.report !== null;
  const insightReport = insight?.report ?? null;

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
            §01 · ACTIVE SIGNAL
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <SectionLabel label="Active Signal" num="01" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

            {/* Identity table */}
            <div style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                { key: "Signal ID",  val: ACTIVE_SIGNAL_ID },
                { key: "Theme",      val: ACTIVE_SIGNAL.theme },
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
                value:  "Manual",
                detail: "ACTIVE_SIGNAL_ID in src/lib/signals.ts",
                active: false,
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
