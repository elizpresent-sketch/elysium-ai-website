"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const W = "max-w-[1440px] mx-auto px-6 lg:px-12";
const BG = "#050505";
const GRID_BG = "rgba(28,37,48,0.6)";

// ─────────────────────────────────────────────────────────────────────────────
// COUNT-UP HOOK
// ─────────────────────────────────────────────────────────────────────────────

function useCountUp(end: number, duration = 2800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    const run = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * end));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [inView, end, duration]);

  return { count, ref };
}

// ─────────────────────────────────────────────────────────────────────────────
// BIG METRIC — hero-scale animated number
// ─────────────────────────────────────────────────────────────────────────────

function BigMetric({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col gap-2">
      <span
        className="font-display font-normal text-[#E2E8EE] leading-none tracking-[0.04em]"
        style={{ fontSize: "clamp(3.5rem, 7vw, 5.5rem)" }}
      >
        {count}{suffix}
      </span>
      <span className="text-[8.5px] tracking-[0.28em] uppercase text-[#7B8188] font-medium">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA TILE — animated metric tile for gap-px grid
// ─────────────────────────────────────────────────────────────────────────────

function DataTile({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col justify-between gap-4 p-4 lg:p-5" style={{ background: BG }}>
      <span
        className="font-display font-normal text-[#E2E8EE] leading-none tracking-[0.04em]"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
      >
        {count}{suffix}
      </span>
      <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#7B8188] font-medium leading-snug">{label}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FADE IMAGE — images dissolve into the black background at every edge
// ─────────────────────────────────────────────────────────────────────────────

interface FadeImageProps {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  fadeLeft?: number;
  fadeRight?: number;
  fadeTop?: number;
  fadeBottom?: number;
  sizes?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
  loading?: "lazy" | "eager";
}

function FadeImage({
  src,
  alt,
  className = "",
  position = "center center",
  fadeLeft = 0,
  fadeRight = 0,
  fadeTop = 10,
  fadeBottom = 10,
  sizes = "(max-width: 1024px) 100vw, 55vw",
  priority = false,
  objectFit = "cover",
  loading = "lazy",
}: FadeImageProps) {
  const layers: string[] = [];
  if (fadeTop > 0)
    layers.push(`linear-gradient(to bottom, ${BG} 0%, transparent ${fadeTop}%)`);
  if (fadeBottom > 0)
    layers.push(`linear-gradient(to top, ${BG} 0%, transparent ${fadeBottom}%)`);
  if (fadeLeft > 0)
    layers.push(`linear-gradient(to right, ${BG} 0%, transparent ${fadeLeft}%)`);
  if (fadeRight > 0)
    layers.push(`linear-gradient(to left, ${BG} 0%, transparent ${fadeRight}%)`);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? undefined : loading}
        className={objectFit === "contain" ? "object-contain" : "object-cover"}
        style={{ objectPosition: position }}
        sizes={sizes}
      />
      {layers.length > 0 && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: layers.join(", ") }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEAD — compact top rule + label + number
// ─────────────────────────────────────────────────────────────────────────────

function SectionHead({ label, num }: { label: string; num: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3 mb-4 lg:mb-6">
      <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
        {label}
      </span>
      <span className="text-[9px] tracking-[0.36em] font-normal text-[#6B7278]/40">
        {num}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RULE — thin architectural divider
// ─────────────────────────────────────────────────────────────────────────────

function Rule({ w = "w-8", className = "" }: { w?: string; className?: string }) {
  return <div className={`h-px bg-[#1C2530]/60 ${w} ${className}`} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE BOX — framed capability chip
// ─────────────────────────────────────────────────────────────────────────────

function ModBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center px-4 py-3.5"
      style={{ border: "1px solid rgba(255,255,255,0.10)" }}
    >
      <span className="text-[9px] tracking-[0.22em] uppercase text-[#969CA2] font-medium leading-tight">
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY — retained for future media page
// ─────────────────────────────────────────────────────────────────────────────

const GALLERY = [
  { src: "/images/elysium-ai/dark/03-first-experience-portal-wide.webp",  alt: "Portal Experience" },
  { src: "/images/elysium-ai/dark/05-audience-system-silhouette.webp",    alt: "Audience System" },
  { src: "/images/elysium-ai/dark/06-creative-production-stage.webp",     alt: "Creative Production" },
  { src: "/images/elysium-ai/dark/07-partnerships-private-room.webp",     alt: "Partnerships" },
  { src: "/images/elysium-ai/dark/09-private-inquiry-access.webp",        alt: "Private Inquiry" },
  { src: "/images/elysium-ai/dark/10-visual-gallery-worlds.webp",         alt: "Worlds We Create" },
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQ DATA — retained for future /contact or FAQ page
// ─────────────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is ELIZIUM?",
    a: "ELIZIUM is an AI-human emotional interaction platform — a system that captures, processes and responds to collective human emotion in real time through live immersive experiences.",
  },
  {
    q: "Is this a show or a platform?",
    a: "ELIZIUM is a platform. Future Human is the first flagship experience it has produced — one output of a wider system built for global deployment.",
  },
  {
    q: "Why emotional interaction?",
    a: "Emotion is the primary signal. ELIZIUM is built on the belief that collective human emotional state is the most powerful and underused data layer in live culture.",
  },
  {
    q: "Who is the platform for?",
    a: "ELIZIUM is designed for audiences, brands, venues, cultural institutions, technology collaborators and international expansion partners.",
  },
  {
    q: "What happens after the experience?",
    a: "Every participant enters a personal emotional pathway — accessible through private digital channels, future invitations and post-event interaction systems.",
  },
];

void GALLERY;
void FAQS;

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════

export default function Home() {
  const [inquiryType, setInquiryType] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  async function handleInquirySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(false);
    const form = e.currentTarget;
    const data = {
      full_name: (form.elements.namedItem("pa-name") as HTMLInputElement).value,
      company: (form.elements.namedItem("pa-company") as HTMLInputElement).value,
      email: (form.elements.namedItem("pa-email") as HTMLInputElement).value,
      inquiry_type: inquiryType,
      message: (form.elements.namedItem("pa-message") as HTMLTextAreaElement).value,
      source_page: "homepage_private_access",
    };
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) { setSubmitError(true); return; }
      setSubmitted(true);
    } catch (_err) {
      setSubmitError(true);
    }
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          01 · HERO — one cinematic moment, everything after is system
      ═══════════════════════════════════════════════════════════════════ */}

      {/* Mobile hero */}
      <section className="lg:hidden relative flex flex-col overflow-hidden pt-14" style={{ background: BG }}>
        <div className="relative w-full" style={{ height: "62vh", minHeight: 360 }}>
          <Image
            src="/images/elysium-ai/dark/willhero.webp"
            alt="ELIZIUM — AI-Human Emotional Interaction Platform"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "50% center" }}
            sizes="100vw"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(5,5,5,0.65) 80%, ${BG} 100%)` }}
          />
          <div
            className="absolute inset-x-0 top-0 h-16 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${BG} 0%, rgba(5,5,5,0.5) 50%, transparent 100%)` }}
          />
        </div>
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="relative z-10 -mt-14 px-6 pb-10 flex flex-col gap-5"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em]"
            style={{ fontSize: "clamp(1.85rem, 9vw, 2.5rem)" }}
          >
            AI‑Human<br />Emotional<br />Interaction
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[13px] text-[#B0B8C0] leading-relaxed">
            A future-facing AI-human emotional interaction platform — built at the
            intersection of artificial intelligence, collective human emotion and live
            immersive audience systems.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col gap-2.5 pt-1">
            <Link
              href="/platform"
              className="w-full inline-flex items-center justify-between gap-3 px-5 py-3.5 border border-[#E2E8EE]/70 text-[#E2E8EE] text-[9px] tracking-[0.3em] uppercase font-medium"
            >
              Enter Platform <span className="w-4 h-px bg-current" />
            </Link>
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-between gap-3 px-5 py-3.5 border border-[#1C2530]/70 text-[#969CA2] text-[9px] tracking-[0.3em] uppercase font-medium"
            >
              Private Inquiry <span className="w-4 h-px bg-current opacity-50" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Desktop hero — compressed, tag chips removed */}
      <section className="hidden lg:flex relative min-h-[82vh] flex-col overflow-hidden" style={{ background: BG }}>
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/generated/elizium-system-aperture-hero-optimised.webp"
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center center" }}
            sizes="100vw"
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg,
                ${BG} 0%, ${BG} 28%,
                rgba(5,5,5,0.96) 44%,
                rgba(5,5,5,0.70) 60%,
                rgba(5,5,5,0.24) 78%,
                transparent 100%)`,
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-40"
            style={{ background: `linear-gradient(to bottom, ${BG} 0%, ${BG} 8%, rgba(5,5,5,0.7) 55%, transparent 100%)` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{ background: `linear-gradient(to top, ${BG} 0%, rgba(5,5,5,0.8) 55%, transparent 100%)` }}
          />
        </div>

        <div className={`relative z-10 flex-1 flex items-center w-full ${W} pt-20 pb-8`}>
          <div className="w-full max-w-[480px]">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col gap-5">
              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <span className="text-[8.5px] tracking-[0.38em] uppercase font-medium text-[#7B8188] flex items-center gap-3">
                  <span className="w-5 h-px bg-[#6B7278]/55" />
                  An AI-human emotional interaction system.
                </span>
                <div className="w-8 h-px bg-[#1C2530]/60" />
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.11em]"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                AI‑Human<br />Emotional<br />Interaction
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#B0B8C0] leading-relaxed max-w-[380px]">
                A future-facing platform built at the intersection of artificial
                intelligence, collective human emotion and live immersive audience systems.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-row gap-3 pt-1">
                <Link
                  href="/platform"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#E2E8EE]/70 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
                >
                  Enter Platform <span className="w-4 h-px bg-current" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#1C2530]/55 text-[#969CA2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
                >
                  Private Inquiry
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative z-10 border-t border-[#1C2530]/50"
          style={{ background: "rgba(5,5,5,0.92)", backdropFilter: "blur(14px)" }}
        >
          <div className={`${W} py-3`}>
            <div className="flex items-center gap-8">
              <span className="text-[8px] tracking-[0.38em] uppercase font-semibold text-[#7B8188] whitespace-nowrap flex-shrink-0">
                Platform Status
              </span>
              <span className="block w-px h-3 bg-[#1C2530] flex-shrink-0" />
              <div className="grid grid-cols-4 gap-x-7 gap-y-2 flex-1">
                {[
                  { label: "Platform Online",                   d: 0,   dur: 3.2 },
                  { label: "Private Access Active",             d: 1.1, dur: 4.0 },
                  { label: "Emotional Processing Active",       d: 2.0, dur: 3.6 },
                  { label: "Global Expansion Framework Active", d: 0.5, dur: 4.4 },
                ].map(({ label, d, dur }) => (
                  <div key={label} className="flex items-center gap-2">
                    <motion.span
                      className="w-1 h-1 rounded-full bg-[#C8CDD2] flex-shrink-0"
                      animate={{
                        opacity: [0.25, 0.9, 0.25],
                        boxShadow: ["0 0 0px rgba(180,200,220,0)", "0 0 4px 1px rgba(180,200,220,0.28)", "0 0 0px rgba(180,200,220,0)"],
                      }}
                      transition={{ duration: dur, delay: d, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="text-[7.5px] tracking-[0.22em] uppercase text-[#7B8188] leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          02 · SIGNAL OF THE DAY
          Eye image full-section bg; metric left, readout rows right
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-6 lg:py-10 border-t border-[#1C2530]/50 relative overflow-hidden">
        {/* Eye image — full section background */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.72 }}>
          <Image
            src="/images/elysium-ai/dark/generated/elizium-signal-eye-data-optimised.webp"
            alt="" fill aria-hidden
            className="object-cover"
            style={{ objectPosition: "center center" }}
            sizes="100vw"
          />
        </div>
        {/* Soft overlay — text stays legible, image clearly visible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.52) 40%, rgba(5,5,5,0.42) 100%)" }}
        />
        <div className={`relative z-10 ${W}`}>
          <SectionHead label="Signal of the Day" num="02" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 items-start">

            {/* Left — big ERI metric + summary rows */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-5"
            >
              <motion.div variants={fadeUp}>
                <BigMetric value={78} label="Emotional Response Index" />
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col gap-0">
                {[
                  { label: "Dominant Signal", value: "Curiosity" },
                  { label: "Collective Depth", value: "High" },
                  { label: "Alignment",        value: "Strong Convergence" },
                ].map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-2 py-2.5 border-t border-[#1C2530]/50 items-center">
                    <span className="text-[8.5px] tracking-[0.22em] uppercase text-[#6B7278] font-medium">{label}</span>
                    <span className="text-[8.5px] tracking-[0.15em] uppercase text-[#C8CDD2] font-medium">{value}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/50" />
              </motion.div>
            </motion.div>

            {/* Right — signal readout rows, no card border, over image bg */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col"
            >
              <div className="flex items-center justify-between py-3 border-t border-[#1C2530]/50">
                <span className="text-[7.5px] tracking-[0.38em] uppercase text-[#6B7278] font-medium">Signal State</span>
                <div className="flex items-center gap-2">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-[#C8CDD2]"
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="text-[7px] tracking-[0.28em] uppercase text-[#969CA2]">Active</span>
                </div>
              </div>
              {[
                { label: "Dominant Emotion",  value: "Curiosity" },
                { label: "Response Index",    value: "78 / 100" },
                { label: "Collective Depth",  value: "High" },
                { label: "Peak Moment",       value: "Scene III — Min 18:42" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="grid grid-cols-[2fr_3fr] gap-4 py-2 border-t border-[#1C2530]/50 items-center"
                >
                  <span className="text-[8.5px] tracking-[0.22em] uppercase text-[#6B7278] font-medium">{label}</span>
                  <span className="text-[9px] tracking-[0.15em] uppercase text-[#C8CDD2] font-medium">{value}</span>
                </div>
              ))}
              <div className="border-t border-[#1C2530]/50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          03 · EMOTIONAL CHOICE
          Compact text left, 3×2 emotion card grid right (gap-px)
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-6 lg:py-10 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Emotional Choice" num="03" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-10 items-start">

            {/* Left */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em]"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
              >
                The audience<br />chooses.<br />The system<br />responds.
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13px] text-[#AAB0B6] leading-relaxed">
                ELIZIUM reads collective emotional choice in real time. Each decision
                alters the narrative, environment and outcome.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col gap-0">
                {[
                  "Collective emotional state captured in real time",
                  "System adapts narrative to audience field",
                  "Personal response pathway per participant",
                  "Post-session emotional arc archived",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 py-2 border-t border-[#1C2530]/45">
                    <span className="w-1 h-1 rounded-full bg-[#969CA2]/40 flex-shrink-0 mt-1.5" />
                    <span className="text-[8.5px] tracking-[0.18em] uppercase text-[#969CA2] font-medium leading-snug">{item}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </motion.div>
            </motion.div>

            {/* Right — 3×2 emotion cards (gap-px) */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-2"
            >
              <span className="text-[7.5px] tracking-[0.38em] uppercase text-[#6B7278] font-medium mb-1">
                Emotional Index — Session Preview
              </span>
              <div className="grid grid-cols-3 gap-px" style={{ background: GRID_BG }}>
                {[
                  { emotion: "Acceptance",   index: 92, state: "Dominant" },
                  { emotion: "Anticipation", index: 85, state: "Active" },
                  { emotion: "Curiosity",    index: 78, state: "Rising" },
                  { emotion: "Tension",      index: 67, state: "Secondary" },
                  { emotion: "Release",      index: 55, state: "Latent" },
                  { emotion: "Resistance",   index: 41, state: "Subdued" },
                ].map(({ emotion, index, state }) => (
                  <motion.div
                    key={emotion}
                    variants={fadeUp}
                    className="flex flex-col justify-between gap-3 p-4"
                    style={{ background: BG }}
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[8px] tracking-[0.2em] uppercase text-[#E2E8EE] font-medium">{emotion}</span>
                      <div className="w-full h-px bg-[#1C2530]/40 relative">
                        <div className="absolute left-0 top-0 h-full bg-[#C8CDD2]/30" style={{ width: `${index}%` }} />
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="font-display text-[1.4rem] text-[#C8CDD2] leading-none">{index}</span>
                      <span className="text-[7px] tracking-[0.2em] uppercase text-[#6B7278]/55 font-medium">{state}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <span className="text-[7.5px] tracking-[0.22em] uppercase text-[#6B7278]/35 font-medium mt-1">
                Emotional index — static preview
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          04 · EMOTIONAL SPACES
          Horizontal strip of 6 image tiles
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-6 lg:py-10 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Emotional Spaces" num="04" />
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
            className="flex gap-px overflow-x-auto"
            style={{ background: GRID_BG }}
          >
            {[
              { label: "Human",    img: "emotional-space-human.webp" },
              { label: "Memory",   img: "emotional-space-memory.webp" },
              { label: "Control",  img: "emotional-space-control.webp" },
              { label: "Solitude", img: "emotional-space-solitude.webp" },
              { label: "Trust",    img: "emotional-space-trust.webp" },
              { label: "AI",       img: "emotional-space-ai.webp" },
            ].map(({ label, img }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="relative flex-shrink-0 lg:flex-1 overflow-hidden w-[140px]"
                style={{ aspectRatio: "3/4", background: BG }}
              >
                <Image
                  src={`/images/elysium-ai/dark/generated/${img}`}
                  alt={label}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center center" }}
                  sizes="(max-width: 1024px) 140px, 17vw"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(5,5,5,0.90) 0%, transparent 100%)" }}
                />
                <span className="absolute bottom-3 left-3 text-[8px] tracking-[0.28em] uppercase text-[#C8CDD2] font-medium">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          05 · ELIZIUM METHOD
          5-col horizontal gap-px grid — tall portrait image removed
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-6 lg:py-10 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="ELIZIUM Method" num="05" />
          <div className="flex flex-col gap-5">

            {/* Heading + body row */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-4"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em]"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
              >
                How the<br />System Works
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[13px] text-[#AAB0B6] leading-relaxed max-w-sm">
                A five-stage interaction cycle where human emotion becomes the input
                that drives the entire system.
              </motion.p>
            </motion.div>

            {/* 5-col gap-px method cards — per-card symbol backgrounds */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-5 gap-px"
              style={{ background: GRID_BG }}
            >
              {[
                { n: "01", label: "Read",    img: "1", desc: "Emotional signals captured from every audience member in real time" },
                { n: "02", label: "Process", img: "2", desc: "AI layers interpret collective state and generate a live narrative response" },
                { n: "03", label: "Respond", img: "3", desc: "The environment, narrative and outcome shift to the audience's emotional field" },
                { n: "04", label: "Record",  img: "4", desc: "Every interaction enters the participant's personal pathway archive" },
                { n: "05", label: "Scale",   img: "5", desc: "The system is designed to deploy in any venue, city or cultural context" },
              ].map((item) => (
                <motion.div
                  key={item.n}
                  variants={fadeUp}
                  className="relative overflow-hidden p-4 lg:p-5"
                  style={{ background: BG }}
                >
                  {/* Per-card symbol image — centered, visible but subtle */}
                  <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.28 }}>
                    <Image
                      src={`/images/elysium-ai/dark/generated/${item.img}.webp`}
                      alt="" fill aria-hidden
                      className="object-contain"
                      style={{ objectPosition: "center 40%" }}
                      sizes="(max-width: 640px) 100vw, 20vw"
                    />
                  </div>
                  <div className="relative flex flex-col gap-3">
                    <span className="text-[7.5px] tracking-[0.38em] uppercase text-[#6B7278]/40 font-medium">{item.n}</span>
                    <span className="text-[9.5px] tracking-[0.25em] uppercase text-[#C8CDD2] font-medium">{item.label}</span>
                    <Rule />
                    <span className="text-[11.5px] text-[#707880] leading-snug">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Module chips */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-4 gap-1.5"
            >
              {["Emotional Read", "Live Processing", "System Response", "Personal Archive"].map((t) => (
                <motion.div key={t} variants={fadeUp}><ModBox>{t}</ModBox></motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          06 · LIVE EMOTIONAL DATA
          4 DataTile metrics only
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-6 lg:py-10 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Live Emotional Data" num="06" />

          <div className="flex flex-col gap-px" style={{ background: GRID_BG }}>

            {/* 4-tile metric strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px">
              <DataTile value={78}  label="Emotional Response Index" />
              <DataTile value={91} suffix="%" label="Signal Continuity" />
              <DataTile value={64} suffix="%" label="Post-Event Interaction Rate" />
              <DataTile value={5}   label="Brand Insight Layers" />
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          07 · FEATURED EXPERIENCE — FUTURE HUMAN
          Cinematic banner — text left, image fills right
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-6 lg:py-10 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="Featured Experience" num="07" />

          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
            className="relative overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.06)", minHeight: "260px" }}
          >
            {/* Image — full bleed, right-biased on desktop; storm banner */}
            <div className="absolute inset-0 lg:left-[30%]">
              <Image
                src="/images/elysium-ai/dark/generated/featured-experience-future-human-storm-banner.webp"
                alt="Future Human — ELIZIUM Platform"
                fill
                className="object-cover"
                style={{ objectPosition: "center center" }}
                sizes="(max-width: 1024px) 100vw, 70vw"
                loading="eager"
              />
            </div>
            {/* Gradient — lighter so storm imagery reads clearly */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `linear-gradient(to right, ${BG} 0%, ${BG} 18%, rgba(5,5,5,0.70) 36%, rgba(5,5,5,0.08) 58%, transparent 100%)`,
              }}
            />
            {/* Text — left, over gradient */}
            <motion.div
              variants={fadeUp}
              className="relative z-20 flex flex-col justify-between gap-4 p-6 lg:p-8"
              style={{ minHeight: "260px", maxWidth: "420px" }}
            >
              <div className="flex flex-col gap-3">
                <span className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                  The First Flagship Experience
                </span>
                <h2
                  className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em]"
                  style={{ fontSize: "clamp(1.7rem, 3.5vw, 3rem)" }}
                >
                  Future<br />Human
                </h2>
                <Rule />
                <p className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                  Future Human is the first flagship experience of the ELIZIUM platform —
                  a live AI-human performance where collective audience emotion shapes the
                  narrative, the environment and the outcome in real time.
                </p>
              </div>
              <Link
                href="/future-human"
                className="inline-flex items-center gap-3 px-5 py-3 border border-[#1C2530]/55 text-[#C8CDD2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300 w-fit"
              >
                Discover Future Human <span className="w-4 h-px bg-current" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          08 · PARTNER ACCESS
          Split panel: For Brands left, Hidden Access right
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-6 lg:py-10 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="Partner Access" num="08" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ background: GRID_BG }}>

            {/* Left panel — For Brands */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col justify-between gap-4 py-5 pr-5 lg:py-7 lg:pr-7"
              style={{ background: BG }}
            >
              <div className="flex flex-col gap-3">
                <span className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                  For Brands & Partners
                </span>
                <motion.h2
                  variants={fadeUp}
                  className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em]"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
                >
                  A platform built<br />for partnership.
                </motion.h2>
                <Rule />
                <motion.p variants={fadeUp} className="text-[13px] text-[#AAB0B6] leading-relaxed">
                  ELIZIUM is built from the ground up for brand integration — not as
                  sponsorship, but as a structural layer of the experience and insight system.
                </motion.p>
              </div>
              <motion.div variants={fadeUp}>
                <Link
                  href="/for-brands"
                  className="inline-flex items-center gap-3 px-5 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300 w-fit"
                >
                  Partnership Overview <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right panel — Hidden Access */}
            <div className="relative overflow-hidden min-h-[300px] flex flex-col">
              <Image
                src="/images/elysium-ai/dark/generated/elizium-system-aperture-hero-optimised.webp"
                alt="" fill aria-hidden
                className="object-cover"
                style={{ objectPosition: "center center" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to right, rgba(5,5,5,0.58) 0%, rgba(5,5,5,0.32) 50%, rgba(5,5,5,0.10) 100%)",
                }}
              />
              <div className="relative z-10 flex flex-col justify-between gap-6 p-6 lg:p-8 flex-1">
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] tracking-[0.38em] uppercase text-[#B0B8C0] font-medium">
                    Hidden Access
                  </span>
                  <Rule w="w-5" />
                  <p className="text-[13.5px] text-[#E2E8EE] font-light tracking-wide leading-snug">
                    System access available for 72 hours.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-5 py-3 border border-[#E2E8EE]/55 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300 w-fit"
                >
                  Request Access <span className="w-4 h-px bg-current" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          09 · PRIVATE ACCESS
          Bordered gate panel — restricted access language
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-6 lg:py-10 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Private Access" num="09" />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-10">

            {/* Left — context */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em]"
                style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)" }}
              >
                Access is<br />by inquiry<br />only.
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                ELIZIUM does not operate through open channels. Partnership, press and
                platform access is available by private inquiry only.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col gap-0">
                {["Partnership", "Sponsorship", "Venue", "Technology", "Press", "Private Meeting"].map((t) => (
                  <div key={t} className="flex items-center gap-3 py-2.5 border-t border-[#1C2530]/45">
                    <span className="w-1 h-1 rounded-full bg-[#969CA2]/30 flex-shrink-0" />
                    <span className="text-[8.5px] tracking-[0.22em] uppercase text-[#969CA2] font-medium">{t}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </motion.div>
            </motion.div>

            {/* Right — bordered gate panel */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="px-5 py-3.5 border-b border-[#1C2530]/50">
                <span className="text-[7.5px] tracking-[0.38em] uppercase text-[#6B7278] font-medium">Private Inquiry</span>
              </div>
              {submitted ? (
                <div className="px-5 py-8 flex flex-col gap-5">
                  <p className="text-[13px] text-[#C8CDD2] leading-relaxed">
                    Your inquiry has been received.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setInquiryType(null); }}
                    className="text-[8px] tracking-[0.28em] uppercase text-[#7B8188] hover:text-[#C8CDD2] transition-colors duration-200 text-left"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
              <form onSubmit={handleInquirySubmit}>
              <div className="flex flex-col gap-0 px-5 py-4">
                {[
                  { id: "pa-name",    label: "Full Name", type: "text",  placeholder: "Your name" },
                  { id: "pa-company", label: "Company",   type: "text",  placeholder: "Company or institution" },
                  { id: "pa-email",   label: "Email",     type: "email", placeholder: "your@email.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="flex flex-col border-t border-[#1C2530]/50 pt-3 pb-1 gap-1.5">
                    <label htmlFor={id} className="text-[8.5px] tracking-[0.28em] uppercase text-[#8A9098] font-medium">
                      {label}
                    </label>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      placeholder={placeholder}
                      className="bg-transparent text-[12px] tracking-[0.06em] text-[#C8CDD2] placeholder:text-[#7B8188]/75 focus:outline-none w-full pb-2.5 border-b border-[#2A3340]/70 focus:border-[#8A9098]/60 transition-colors duration-200"
                    />
                  </div>
                ))}

                {/* Type of Inquiry */}
                <div className="flex flex-col border-t border-[#1C2530]/50 pt-3 pb-3 gap-2.5">
                  <span className="text-[8.5px] tracking-[0.28em] uppercase text-[#8A9098] font-medium">Type of Inquiry</span>
                  <div className="flex flex-wrap gap-2">
                    {["Partnership", "Sponsorship", "Venue", "Technology", "Press", "Private Meeting"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setInquiryType(inquiryType === t ? null : t)}
                        className={`px-3 py-1.5 border text-[8px] tracking-[0.22em] uppercase font-medium transition-all duration-200 ${
                          inquiryType === t
                            ? "border-[#E2E8EE]/60 text-[#E2E8EE]"
                            : "border-[#2A3340]/70 text-[#969CA2] hover:border-[#707880] hover:text-[#C8CDD2]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col border-t border-[#1C2530]/50 pt-3 pb-1 gap-1.5">
                  <label htmlFor="pa-message" className="text-[8.5px] tracking-[0.28em] uppercase text-[#8A9098] font-medium">
                    Message
                  </label>
                  <textarea
                    id="pa-message"
                    name="pa-message"
                    rows={3}
                    placeholder="Brief description of your inquiry…"
                    className="bg-transparent text-[12px] tracking-[0.06em] text-[#C8CDD2] placeholder:text-[#7B8188]/75 focus:outline-none w-full pb-2.5 resize-none border-b border-[#2A3340]/70 focus:border-[#8A9098]/60 transition-colors duration-200"
                  />
                </div>

                <div className="border-t border-[#1C2530]/50 pt-4 mt-1 flex flex-col gap-2">
                  {submitError && (
                    <span className="text-[8px] tracking-[0.18em] uppercase text-[#9A6060]">
                      Something went wrong. Please try again.
                    </span>
                  )}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
                  >
                    Request Access <span className="w-4 h-px bg-current" />
                  </button>
                </div>
              </div>
              </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer rendered by layout.tsx ── */}
    </>
  );
}
