"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

interface PageIntroProps {
  label: string;
  headline: string;
  subheadline?: string;
  dark?: boolean;
  centered?: boolean;
}

export default function PageIntro({
  label,
  headline,
  subheadline,
  dark = false,
  centered = false,
}: PageIntroProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      className={`${centered ? "text-center items-center" : ""} flex flex-col gap-6`}
    >
      <motion.span
        variants={fadeUp}
        className={`inline-flex items-center gap-3 text-[10px] tracking-ultrawide uppercase font-medium ${
          dark ? "text-silver-mid" : "text-graphite-light"
        }`}
      >
        <span className={`w-6 h-px ${dark ? "bg-silver-mid" : "bg-graphite-light"}`} />
        {label}
      </motion.span>

      <motion.h1
        variants={fadeUp}
        className={`text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] max-w-3xl ${
          dark ? "text-porcelain" : "text-graphite"
        }`}
      >
        {headline}
      </motion.h1>

      {subheadline && (
        <motion.p
          variants={fadeUp}
          className={`text-base md:text-lg leading-relaxed max-w-xl ${
            dark ? "text-silver-mid" : "text-graphite-light"
          }`}
        >
          {subheadline}
        </motion.p>
      )}
    </motion.div>
  );
}
