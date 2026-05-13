"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

interface CTASectionProps {
  label?: string;
  headline: string;
  body?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  dark?: boolean;
}

export default function CTASection({
  label,
  headline,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  dark = false,
}: CTASectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      className="flex flex-col items-center text-center gap-8"
    >
      {label && (
        <motion.span
          variants={fadeUp}
          className={`text-[10px] tracking-ultrawide uppercase font-medium flex items-center gap-3 ${
            dark ? "text-silver-mid" : "text-graphite-light"
          }`}
        >
          <span className={`w-6 h-px ${dark ? "bg-silver-mid" : "bg-graphite-light"}`} />
          {label}
          <span className={`w-6 h-px ${dark ? "bg-silver-mid" : "bg-graphite-light"}`} />
        </motion.span>
      )}

      <motion.h2
        variants={fadeUp}
        className={`text-3xl md:text-4xl lg:text-5xl font-light tracking-tight max-w-2xl leading-tight ${
          dark ? "text-porcelain" : "text-graphite"
        }`}
      >
        {headline}
      </motion.h2>

      {body && (
        <motion.p
          variants={fadeUp}
          className={`text-base leading-relaxed max-w-xl ${
            dark ? "text-silver-mid" : "text-graphite-light"
          }`}
        >
          {body}
        </motion.p>
      )}

      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
        <Link
          href={primaryHref}
          className={`px-8 py-3.5 text-[11px] tracking-superwide uppercase font-medium transition-colors duration-200 ${
            dark
              ? "bg-porcelain text-graphite hover:bg-silver-light"
              : "bg-graphite text-porcelain hover:bg-graphite-mid"
          }`}
        >
          {primaryLabel}
        </Link>
        {secondaryHref && secondaryLabel && (
          <Link
            href={secondaryHref}
            className={`px-8 py-3.5 text-[11px] tracking-superwide uppercase font-medium border transition-colors duration-200 ${
              dark
                ? "border-silver-mid/60 text-silver-mid hover:border-porcelain hover:text-porcelain"
                : "border-graphite/60 text-graphite hover:border-graphite"
            }`}
          >
            {secondaryLabel}
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}
