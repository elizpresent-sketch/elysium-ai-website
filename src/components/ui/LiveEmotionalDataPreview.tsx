"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { ACTIVE_SIGNAL, REACTION_LABELS, type Reaction } from "@/lib/signals";

interface Metric {
  reaction: string;
  label:    string;
  percent:  number;
  count:    number;
}

interface SignalSummary {
  ok:               boolean;
  mode:             "live" | "fallback";
  signal_id:        string;
  total_responses:  number;
  last_updated:     string;
  metrics:          Metric[];
}

export default function LiveEmotionalDataPreview() {
  const [summary, setSummary]   = useState<SignalSummary | null>(null);
  const [loading, setLoading]   = useState(true);
  const sig = ACTIVE_SIGNAL;

  useEffect(() => {
    fetch("/api/signal-summary")
      .then((r) => r.json())
      .then((d: SignalSummary) => setSummary(d))
      .catch(() => setSummary(null))
      .finally(() => setLoading(false));
  }, []);

  const isLive = !loading && summary?.mode === "live";

  const metrics: Metric[] = summary?.metrics?.length
    ? summary.metrics
    : sig.reactions.map((r: Reaction) => ({
        reaction: r,
        label:    REACTION_LABELS[r],
        percent:  0,
        count:    0,
      }));

  const dominant = metrics.length
    ? metrics.reduce((a, b) => (a.percent > b.percent ? a : b))
    : null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      className="border border-[#1C2530]/60"
      style={{ background: "#080808" }}
    >
      {/* ── header ── */}
      <motion.div
        variants={fadeUp}
        className="flex items-center justify-between px-4 py-2.5 border-b border-[#1C2530]/50"
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#E2E8EE]/70 flex-shrink-0 animate-pulse"
            style={{ boxShadow: "0 0 5px 1px rgba(226,232,238,0.18)" }}
          />
          <span className="text-[7.5px] tracking-[0.28em] uppercase font-medium text-[#B8BEC4]">
            Live Emotional Data
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {isLive && (
            <span className="text-[7px] tracking-[0.22em] uppercase text-[#B8BEC4] font-medium">
              Live
            </span>
          )}
          <span className="text-[7px] tracking-[0.22em] uppercase text-[#4B5560] font-medium">
            Aggregate Only
          </span>
        </div>
      </motion.div>

      {/* ── signal identity + total ── */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3.5 border-b border-[#1C2530]/40"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
            Signal Theme
          </span>
          <span className="text-[11.5px] tracking-[0.1em] uppercase text-[#C8CDD2] font-medium">
            {sig.theme}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
            Responses
          </span>
          <span
            className="font-display font-normal text-[#E2E8EE] leading-none"
            style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
          >
            {loading ? "—" : (summary?.total_responses ?? "—")}
          </span>
        </div>
      </motion.div>

      {/* ── dominant reaction (only when live data available) ── */}
      {dominant && dominant.percent > 0 && (
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between px-4 py-2.5 border-b border-[#1C2530]/40"
        >
          <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
            Dominant Response
          </span>
          <span className="text-[7.5px] tracking-[0.22em] uppercase text-[#C8CDD2] font-medium">
            {dominant.label}
          </span>
        </motion.div>
      )}

      {/* ── response dimension bars ── */}
      <motion.div variants={fadeUp} className="px-4 py-3.5 border-b border-[#1C2530]/40">
        <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium block mb-3">
          Response Dimensions
        </span>
        <div className="flex flex-col gap-2.5">
          {metrics.map(({ reaction, label, percent }) => (
            <div key={reaction} className="flex items-center gap-3">
              <span className="text-[7px] tracking-[0.18em] uppercase text-[#5B6168] font-medium w-[4.5rem] flex-shrink-0">
                {label}
              </span>
              <div
                className="flex-1 relative"
                style={{ height: "1px", background: "rgba(28,37,48,0.55)" }}
              >
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-700"
                  style={{
                    width: loading ? "0%" : `${Math.min(percent, 100)}%`,
                    background:
                      "linear-gradient(to right, rgba(200,205,210,0.55), rgba(200,205,210,0.2))",
                  }}
                />
              </div>
              <span
                className="text-[7px] tracking-[0.18em] uppercase font-medium w-6 text-right flex-shrink-0"
                style={{ color: percent > 0 ? "#8A9098" : "#3B4550" }}
              >
                {loading ? "—" : percent > 0 ? `${Math.round(percent)}%` : "—"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── footer ── */}
      <motion.div variants={fadeUp} className="px-4 py-2.5">
        <span className="text-[6.5px] tracking-[0.25em] uppercase text-[#4B5560] font-medium">
          Aggregate emotional response only · No personal data collected or displayed
        </span>
      </motion.div>
    </motion.div>
  );
}
