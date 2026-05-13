"use client";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

interface SectionLabelProps {
  text: string;
  accent?: boolean;
  light?: boolean;
  className?: string;
  animate?: boolean;
}

export default function SectionLabel({
  text,
  accent = false,
  light = false,
  className = "",
  animate = true,
}: SectionLabelProps) {
  const color = accent
    ? "text-violet-soft"
    : light
    ? "text-silver-mid"
    : "text-graphite-light";

  const content = (
    <span
      className={`inline-flex items-center gap-3 text-[10px] tracking-ultrawide uppercase font-medium ${color} ${className}`}
    >
      <span className={`w-6 h-px ${accent ? "bg-violet-soft" : light ? "bg-silver-mid" : "bg-graphite-light"}`} />
      {text}
    </span>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
    >
      {content}
    </motion.div>
  );
}
