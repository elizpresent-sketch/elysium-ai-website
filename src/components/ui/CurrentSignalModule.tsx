"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import { ACTIVE_SIGNAL, REACTION_LABELS } from "@/lib/signals";

export default function CurrentSignalModule() {
  const sig = ACTIVE_SIGNAL;
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
            style={{ boxShadow: "0 0 5px 1px rgba(226,232,238,0.15)" }}
          />
          <span className="text-[7.5px] tracking-[0.28em] uppercase font-medium text-[#B8BEC4]">
            Active Signal
          </span>
          <span className="w-px h-2.5 bg-[#1C2530]" />
          <span className="text-[7px] tracking-[0.22em] uppercase text-[#4B5560] font-medium">
            Recording
          </span>
        </div>
        <span className="text-[7.5px] tracking-[0.22em] uppercase text-[#6B7278] font-medium">
          {sig.date}
        </span>
      </motion.div>

      {/* ── theme + statistic ── */}
      <motion.div
        variants={fadeUp}
        className="grid grid-cols-[1fr_auto] gap-6 px-4 py-3.5 border-b border-[#1C2530]/40"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
            Signal Theme
          </span>
          <span className="text-[12px] tracking-[0.12em] uppercase text-[#C8CDD2] font-medium">
            {sig.theme}
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
            Statistic
          </span>
          <span
            className="font-display font-normal text-[#E2E8EE] leading-none tracking-[0.04em]"
            style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
          >
            {sig.statistic}
          </span>
        </div>
      </motion.div>

      {/* ── signal statement ── */}
      <motion.div
        variants={fadeUp}
        className="px-4 py-3.5 border-b border-[#1C2530]/40"
      >
        <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium block mb-1.5">
          Signal
        </span>
        <p className="text-[12.5px] text-[#7B8188] leading-snug">
          <span className="text-[#C8CDD2] font-medium">{sig.statistic}</span>{" "}
          {sig.statement}
        </p>
      </motion.div>

      {/* ── prompt ── */}
      <motion.div
        variants={fadeUp}
        className="px-4 py-3.5 border-b border-[#1C2530]/40"
      >
        <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium block mb-1.5">
          Prompt
        </span>
        <p className="text-[12.5px] text-[#AAB0B6] leading-snug italic">{sig.prompt}</p>
      </motion.div>

      {/* ── response dimensions ── */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-[#1C2530]/40"
      >
        <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium whitespace-nowrap">
          Response Dimensions
        </span>
        <span className="w-px h-3 bg-[#1C2530]" />
        {sig.reactions.map((r) => (
          <span
            key={r}
            className="px-2 py-0.5 border border-[#1C2530]/60 text-[7.5px] tracking-[0.2em] uppercase text-[#7B8188] font-medium"
          >
            {REACTION_LABELS[r]}
          </span>
        ))}
      </motion.div>

      {/* ── signal cycle footer ── */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-3 px-4 py-2.5"
      >
        <span className="text-[6.5px] tracking-[0.28em] uppercase text-[#3B4550] font-medium">
          Signal Cycle: Daily
        </span>
        <span className="w-px h-2.5 bg-[#1C2530]" />
        <span className="text-[6.5px] tracking-[0.28em] uppercase text-[#3B4550] font-medium">
          London Time
        </span>
      </motion.div>
    </motion.div>
  );
}
