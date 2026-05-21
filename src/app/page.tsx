"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const W = "max-w-[1440px] mx-auto px-6 lg:px-12";
const BG = "#050505";

// ─────────────────────────────────────────────────────────────────────────────
// COUNT-UP HOOK
// Numbers animate from 0 → target once when element enters viewport.
// Uses requestAnimationFrame + cubic ease-out — no dependencies needed.
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
// STAT COUNTER — animated number tile with inView trigger
// ─────────────────────────────────────────────────────────────────────────────

function StatCounter({
  end,
  suffix = "",
  label,
  size = "lg",
}: {
  end: number;
  suffix?: string;
  label: string;
  size?: "sm" | "lg";
}) {
  const { count, ref } = useCountUp(end);
  return (
    <div ref={ref} className="flex flex-col gap-1.5 py-3 lg:py-5 border-t border-[#1C2530]/50 pr-4">
      <span
        className={`font-display font-normal leading-none text-[#E2E8EE] tracking-[0.08em] ${
          size === "lg"
            ? "text-[3rem] lg:text-[3.6rem]"
            : "text-[1.8rem] lg:text-[2.2rem]"
        }`}
      >
        {count}
        {suffix}
      </span>
      <span className="text-[9px] tracking-[0.26em] uppercase text-[#969CA2] font-medium leading-snug">
        {label}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FADE IMAGE — images dissolve into the black background at every edge
// fadeLeft/Right/Top/Bottom = % of the image dimension to fade
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
// PLACEHOLDER — black gradient placeholder for missing/future images
// ─────────────────────────────────────────────────────────────────────────────

function Placeholder({ className = "", label = "" }: { className?: string; label?: string }) {
  return (
    <div
      className={`relative flex items-end p-3 overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #111214 50%, #080808 100%)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {label && (
        <span className="text-[7px] tracking-[0.25em] uppercase text-[#2a2f35] font-medium">
          {label}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEAD — compact top rule + label + number
// ─────────────────────────────────────────────────────────────────────────────

function SectionHead({ label, num }: { label: string; num: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3 mb-4 lg:mb-8">
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
// MODULE BOX — framed bottom-row capability chip
// ─────────────────────────────────────────────────────────────────────────────

function ModBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center px-4 py-3.5"
      style={{ border: "1px solid rgba(255,255,255,0.18)" }}
    >
      <span className="text-[10px] tracking-[0.22em] uppercase text-[#B0B6BC] font-medium leading-tight">
        {children}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY IMAGES — used in §10 Media/Gallery multi-tile grid
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
// FAQ DATA
// ─────────────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is ELIZIUM AI?",
    a: "ELIZIUM AI is an immersive creative-technology platform developing AI-human live experiences, audience interaction systems and scalable cultural formats.",
  },
  {
    q: "Is this a show or a platform?",
    a: "The first public experience is a flagship live format, but ELIZIUM AI is being developed as a wider platform structure for future experiences, partnerships and international expansion.",
  },
  {
    q: "Why AI-human interaction?",
    a: "The project explores how artificial intelligence can become physical, emotional and spatial inside a live cultural environment.",
  },
  {
    q: "Who is the platform for?",
    a: "ELIZIUM AI is designed for audiences, partners, venues, sponsors, cultural institutions, technology collaborators and international expansion partners.",
  },
  {
    q: "What happens after the experience?",
    a: "The audience journey can continue through private access, digital pathways, future invitations and post-event interaction systems.",
  },
];

// ═════════════════════════════════════════════════════════════════════════════
// PAGE
// ═════════════════════════════════════════════════════════════════════════════

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [inquiryType, setInquiryType] = useState<string | null>(null);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          01 · HOME / HERO
          Mobile: portrait visual dominates top, text card below.
          Desktop: full-bleed cinematic image with text overlay on the left.
      ═══════════════════════════════════════════════════════════════════ */}

      {/* ── Mobile hero — portrait first (matches PDF "should be") ── */}
      <section className="lg:hidden relative flex flex-col overflow-hidden pt-14" style={{ background: BG }}>
        {/* Cinematic AI-human portrait — fills upper portion of the screen */}
        <div className="relative w-full" style={{ height: "62vh", minHeight: 360 }}>
          <Image
            src="/images/elysium-ai/dark/willhero.png"
            alt="Elizium AI — AI-Human"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "50% center" }}
            sizes="100vw"
          />
          {/* Bottom + edge fades into pure black so text card sits cleanly */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(5,5,5,0.65) 80%, ${BG} 100%)`,
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-16 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, ${BG} 0%, rgba(5,5,5,0.5) 50%, transparent 100%)` }}
          />
        </div>

        {/* Text card */}
        <motion.div
          initial="hidden" animate="visible" variants={stagger}
          className="relative z-10 -mt-14 px-6 pb-10 flex flex-col gap-5"
        >
          <motion.h1
            variants={fadeUp}
            className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em]"
            style={{ fontSize: "clamp(1.85rem, 9vw, 2.5rem)" }}
          >
            Immersive
            <br />AI‑Human
            <br />Platform
          </motion.h1>

          <motion.p variants={fadeUp} className="text-[13px] text-[#B0B8C0] leading-relaxed">
            A future-facing creative-technology platform exploring the relationship
            between artificial intelligence, human performance and immersive audience
            systems.
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

      {/* ── Desktop hero — preserved cinematic side-by-side composition ── */}
      <section className="hidden lg:flex relative min-h-screen flex-col overflow-hidden" style={{ background: BG }}>

        {/* Full-bleed image — figure sits right of centre */}
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/willhero.png"
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
            className="absolute inset-x-0 top-0 h-52"
            style={{ background: `linear-gradient(to bottom, ${BG} 0%, ${BG} 8%, rgba(5,5,5,0.7) 55%, transparent 100%)` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-48"
            style={{ background: `linear-gradient(to top, ${BG} 0%, rgba(5,5,5,0.8) 55%, transparent 100%)` }}
          />
        </div>

        <div className={`relative z-10 flex-1 flex items-center w-full ${W} pt-32 pb-14`}>
          <div className="w-full max-w-[520px]">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col gap-6">

              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <span className="text-[8.5px] tracking-[0.38em] uppercase font-medium text-[#7B8188] flex items-center gap-3">
                  <span className="w-5 h-px bg-[#6B7278]/55" />
                  Not a show. A platform.
                </span>
                <div className="w-8 h-px bg-[#1C2530]/60" />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.11em]"
                style={{ fontSize: "clamp(3rem, 8vw, 5.75rem)" }}
              >
                Immersive
                <br />AI‑Human
                <br />Platform
              </motion.h1>

              <motion.p variants={fadeUp} className="text-[14px] text-[#B0B8C0] leading-relaxed max-w-[400px]">
                A future-facing creative-technology platform exploring the
                relationship between artificial intelligence, human performance and
                immersive audience systems.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5">
                {["AI-Human Interaction", "Emotional Storytelling", "Live Performance", "Immersive Environment", "Proof-of-Concept Platform"].map((t) => (
                  <span
                    key={t}
                    className="border border-[#1C2530]/60 px-2.5 py-1 text-[7.5px] tracking-[0.22em] uppercase text-[#7B8188] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </motion.div>

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

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="relative z-10 border-t border-[#1C2530]/50"
          style={{ background: "rgba(5,5,5,0.92)", backdropFilter: "blur(14px)" }}
        >
          <div className={`${W} py-3.5`}>
            <div className="flex items-center gap-8">
              <span className="text-[8px] tracking-[0.38em] uppercase font-semibold text-[#7B8188] whitespace-nowrap flex-shrink-0">
                Platform Status
              </span>
              <span className="block w-px h-3 bg-[#1C2530] flex-shrink-0" />
              <div className="grid grid-cols-4 gap-x-7 gap-y-2 flex-1">
                {[
                  { label: "Platform Online",                   d: 0,   dur: 3.2 },
                  { label: "Private Access Active",             d: 1.1, dur: 4.0 },
                  { label: "AI Systems Initialising",           d: 2.0, dur: 3.6 },
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
          02 · PLATFORM OVERVIEW
          Image: 02-platform-overview-stage.webp — right column, portal visual
          Layout: 40/60 text/image split + bottom stat row
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="Platform Overview" num="02" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-14 items-center">

            {/* Left — heading + intro + (mobile compact list + image) + (desktop ruled list) */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4 lg:gap-5"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Not a show.
                <br />A platform.
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                ELIZIUM is a scalable immersive platform that combines performance, technology,
                storytelling and audience interaction systems.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Our mission is to create the future of experience.
              </motion.p>

              {/* Mobile-only compact list (dot rows, tighter) */}
              <motion.ul variants={fadeUp} className="lg:hidden flex flex-col gap-0 mt-1">
                {[
                  "Immersive Live Experiences",
                  "AI-Human Storytelling",
                  "Audience Interaction Systems",
                  "Creative Technology",
                  "Partnerships",
                  "Global Expansion",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-2 border-t border-[#1C2530]/35"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#969CA2]/60 flex-shrink-0" />
                    <span className="text-[10px] tracking-[0.22em] uppercase text-[#A8AEB4] font-medium">
                      {item}
                    </span>
                  </li>
                ))}
                <li className="border-t border-[#1C2530]/35" />
              </motion.ul>

              {/* Mobile-only portal image — sits at end of section as strong vertical visual */}
              <motion.div variants={scaleIn} className="lg:hidden mt-2">
                <FadeImage
                  src="/images/elysium-ai/dark/globexp.png"
                  alt="Elizium AI — Platform Stage"
                  className="aspect-[3/4]"
                  position="center center"
                  fadeLeft={3} fadeTop={3} fadeBottom={4} fadeRight={3}
                  sizes="100vw"
                  loading="eager"
                />
              </motion.div>

              {/* Desktop-only ruled numbered list */}
              <motion.div variants={fadeUp} className="hidden lg:flex flex-col gap-0 mt-1">
                {[
                  "Immersive Live Experiences",
                  "AI-Human Storytelling",
                  "Audience Interaction Systems",
                  "Creative Technology",
                  "Partnerships",
                  "Global Expansion",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 py-3 border-t border-[#1C2530]/38"
                  >
                    <span className="text-[7.5px] tracking-[0.38em] text-[#6B7278]/32 font-medium flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#969CA2] font-medium">
                      {item}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/38" />
              </motion.div>
            </motion.div>

            {/* Desktop-only stage + portal visual */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block"
            >
              <FadeImage
                src="/images/elysium-ai/dark/globexp.png"
                alt="Elizium AI — Platform Stage"
                className="aspect-[4/3]"
                position="center center"
                fadeLeft={3} fadeTop={3} fadeBottom={3} fadeRight={3}
                sizes="50vw"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Bottom stat strip */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 mt-6 border-t border-l border-[#1C2530]/45"
          >
            {[
              { stat: "AI-Powered", label: "Real-time creative systems" },
              { stat: "Modular",    label: "Scalable show architecture" },
              { stat: "Live",       label: "Audience interaction loops" },
              { stat: "Global",     label: "Built to license and travel" },
            ].map((item) => (
              <motion.div
                key={item.stat} variants={fadeUp}
                className="flex flex-col gap-2 px-4 py-4 md:py-6 border-r border-b border-[#1C2530]/45"
              >
                <span className="font-display font-normal text-xl md:text-2xl text-[#E2E8EE] tracking-[0.10em]">{item.stat}</span>
                <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#7B8188] leading-snug">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          03 · FIRST FLAGSHIP EXPERIENCE
          Image: 03-first-experience-portal-card.webp — right, portal visual
          Layout: compact 2/3 text/image split panel
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="First Flagship Experience" num="03" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-14 items-center">

            {/* Text + mobile image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                The First Experience
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                The Beginning
                <br />of a New Era
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Our first AI-human immersive experience is the foundation of the ELIZIUM
                platform and the first step into a future where technology and humanity
                create together.
              </motion.p>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden">
                <FadeImage
                  src="/images/elysium-ai/dark/s2.png"
                  alt="Future Human — Elizium AI Flagship"
                  className="aspect-[4/3]"
                  position="center center"
                  fadeLeft={6} fadeTop={6} fadeBottom={6} fadeRight={4}
                  sizes="100vw"
                  loading="eager"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-0">
                {["AI-Human Interaction", "Emotional Storytelling", "Live Performance", "Immersive Environment", "Proof-of-Concept Platform"].map((cap) => (
                  <div key={cap} className="flex items-center gap-3 py-2 border-t border-[#1C2530]/45">
                    <span className="w-0.5 h-0.5 bg-[#6B7278]/55 rounded-full flex-shrink-0" />
                    <span className="text-[8.5px] tracking-[0.22em] uppercase text-[#969CA2] font-medium">{cap}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/future-human"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 border border-[#1C2530]/55 text-[#C8CDD2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
                >
                  Discover the Experience <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Desktop-only — AI face + portal ring */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block"
            >
              <FadeImage
                src="/images/elysium-ai/dark/s2.png"
                alt="Future Human — Elizium AI Flagship"
                className="aspect-[4/3]"
                position="center center"
                fadeLeft={8} fadeTop={6} fadeBottom={6} fadeRight={4}
                sizes="50vw"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          (Duplicate Technology Layer section removed — its scope is now
           covered solely by §12 "Technology Behind Elizium" below.)
      ═══════════════════════════════════════════════════════════════════ */}

      {/* ═══════════════════════════════════════════════════════════════════
          05 · AUDIENCE SYSTEM
          Images: 05-audience-system-silhouette.webp + 12-media-behind-scenes.webp
          Layout: text left, staggered image pair right, boxed modules bottom
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Audience System" num="05" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* Text + mobile image + mobile compact list */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-5 flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                The Audience Becomes Part of the System
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                The audience
                <br />becomes part
                <br />of the ecosystem.
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                The interaction continues after the event. Each audience member enters
                their own digital path.
              </motion.p>

              {/* Mobile-only image — sits right under intro for a card-like composition */}
              <motion.div variants={scaleIn} className="lg:hidden mt-1">
                <FadeImage
                  src="/images/elysium-ai/dark/audience-system-network-new.png"
                  alt="Audience System — Elizium AI"
                  className="aspect-[4/3]"
                  position="center center"
                  fadeTop={0} fadeBottom={0} fadeLeft={0} fadeRight={0}
                  sizes="100vw"
                  objectFit="contain"
                />
              </motion.div>

              {/* Mobile-only compact list per PDF target */}
              <motion.ul variants={fadeUp} className="lg:hidden flex flex-col gap-0 mt-1">
                {[
                  "QR Entry",
                  "Personal Pathway",
                  "Post-Event Interaction",
                  "Private Invitations",
                  "Audience Feedback",
                  "Access to Future Experiences",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 py-2 border-t border-[#1C2530]/35"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#969CA2]/60 flex-shrink-0" />
                    <span className="text-[10px] tracking-[0.22em] uppercase text-[#A8AEB4] font-medium">
                      {item}
                    </span>
                  </li>
                ))}
                <li className="border-t border-[#1C2530]/35" />
              </motion.ul>

              {/* Desktop-only two-column feature rows */}
              <motion.div variants={fadeUp} className="hidden lg:flex flex-col gap-0">
                {[
                  { a: "QR Entry",              b: "Private Invitations" },
                  { a: "Personal Pathway",       b: "Audience Feedback" },
                  { a: "Post-Event Interaction", b: "Access to Future Experiences" },
                ].map(({ a, b }) => (
                  <div key={a} className="grid grid-cols-2 gap-x-3 py-2.5 border-t border-[#1C2530]/45">
                    <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#969CA2] font-medium">{a}</span>
                    <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#7B8188] font-medium">{b}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </motion.div>

              {/* Desktop-only boxed modules (removed on mobile per reference) */}
              <motion.div variants={fadeUp} className="hidden lg:grid grid-cols-2 gap-1.5 mt-1">
                {["Opt-In Interaction", "Live Response", "Digital Pathway", "Personal Archive"].map((t) => (
                  <ModBox key={t}>{t}</ModBox>
                ))}
              </motion.div>
            </motion.div>

            {/* Desktop-only cinematic audience image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block lg:col-span-7"
            >
              <FadeImage
                src="/images/elysium-ai/dark/audience-system-network-new.png"
                alt="Audience System — Elizium AI"
                className="aspect-[4/5]"
                position="center center"
                fadeTop={0} fadeBottom={0} fadeLeft={0} fadeRight={0}
                sizes="58vw"
                objectFit="contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          06 · CREATIVE PRODUCTION
          Image: 06-creative-production-stage.webp — right column (NOT a wallpaper)
          Layout: text+stats left, contained stage image right, bottom icon row
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="Creative Production" num="06" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-14 items-center">

            {/* Left — text + animated stat row */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                Cinematic Production for Future Culture
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Cinematic production
                <br />for the future
                <br />of culture.
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed max-w-sm">
                We create immersive worlds where performance, technology and storytelling work as one unified system.
              </motion.p>

              {/* Non-interactive rows — replaces stat counters + module grid */}
              <motion.ul variants={fadeUp} className="flex flex-col gap-0 mt-2">
                {[
                  "Live Experiences",
                  "Brand Collaborations",
                  "Immersive Installations",
                  "AI-Human Performances",
                  "International Tours",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between gap-4 py-3 border-t border-[#1C2530]/45"
                  >
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#A8AEB4] font-medium">
                      {item}
                    </span>
                    <span aria-hidden className="text-[#6B7278]/50 text-[12px] leading-none">›</span>
                  </li>
                ))}
                <li className="border-t border-[#1C2530]/45" />
              </motion.ul>
            </motion.div>

            {/* Desktop-only — wide stage / spotlight visual */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block"
            >
              <FadeImage
                src="/images/elysium-ai/dark/creatingworlds.png"
                alt="Creative Production — Elizium AI"
                className="aspect-[4/3]"
                position="center center"
                fadeLeft={3} fadeTop={3} fadeBottom={3} fadeRight={3}
                sizes="50vw"
              />
            </motion.div>
          </div>

          {/* Mobile-only cinematic image at the bottom of the section, per reference */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
            className="lg:hidden mt-6"
          >
            <FadeImage
              src="/images/elysium-ai/dark/creatingworlds.png"
              alt="Creative Production — Elizium AI"
              className="aspect-[4/3]"
              position="center center"
              fadeLeft={3} fadeTop={3} fadeBottom={3} fadeRight={3}
              sizes="100vw"
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          07 · PARTNERSHIPS
          Layout: heading left, cinematic handshake top-right, stats row below
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Partnerships" num="07" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* Left — text + mobile image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-5 flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                For Brands, Partners and Institutions
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Together
                <br />We Build
                <br />the Future
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed max-w-sm">
                We collaborate with visionary brands, cultural institutions and technology
                companies to build the future of experiences.
              </motion.p>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden mt-1">
                <FadeImage
                  src="/images/elysium-ai/dark/s6.png"
                  alt="Partnership — Elizium AI"
                  className="aspect-[4/3]"
                  position="center 35%"
                  fadeLeft={6} fadeTop={6} fadeBottom={6} fadeRight={4}
                  sizes="100vw"
                />
              </motion.div>

              {/* Mobile-only stats grid — sits below image so partnership numbers are close to text */}
              <div className="grid grid-cols-2 gap-0 lg:hidden">
                <StatCounter end={50} suffix="+" label="Brand Partners" />
                <StatCounter end={20} suffix="+" label="Cultural Institutions" />
                <StatCounter end={10} suffix="+" label="Technology Partnerships" />
                <div className="flex flex-col gap-1.5 py-3 border-t border-[#1C2530]/50 pr-4">
                  <span className="font-display font-normal text-[1.8rem] leading-none text-[#E2E8EE] tracking-[0.08em]">
                    Global
                  </span>
                  <span className="text-[9px] tracking-[0.26em] uppercase text-[#969CA2] font-medium leading-snug">
                    Collaboration Network
                  </span>
                </div>
              </div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 border border-[#1C2530]/55 text-[#C8CDD2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
                >
                  Partnership Inquiry <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — desktop handshake image + stats */}
            <div className="hidden lg:flex lg:col-span-7 flex-col gap-0">
              <motion.div
                initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              >
                <FadeImage
                  src="/images/elysium-ai/dark/s6.png"
                  alt="Partnership — Elizium AI"
                  className="aspect-[16/9]"
                  position="center 35%"
                  fadeLeft={8} fadeTop={8} fadeBottom={10} fadeRight={6}
                  sizes="58vw"
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-0 -mt-2">
                <StatCounter end={50} suffix="+" label="Brand Partners" />
                <StatCounter end={20} suffix="+" label="Cultural Institutions" />
                <StatCounter end={10} suffix="+" label="Technology Partnerships" />
                <div className="flex flex-col gap-1.5 py-3 lg:py-5 border-t border-[#1C2530]/50 pr-4">
                  <span className="font-display font-normal text-[3rem] lg:text-[3.6rem] leading-none text-[#E2E8EE] tracking-[0.08em]">
                    Global
                  </span>
                  <span className="text-[9px] tracking-[0.26em] uppercase text-[#969CA2] font-medium leading-snug">
                    Collaboration Network
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          08 · COMPANY FOUNDATION
          Layout: company identity left, numbered pillar list right — no background image
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="pt-10 pb-10 lg:pt-28 lg:pb-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Company Foundation" num="08" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">

            {/* Left — identity block */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-5 flex flex-col gap-5"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-1">
                <span className="text-[8.5px] tracking-[0.38em] uppercase font-medium text-[#969CA2]">Built by</span>
                <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-[#E2E8EE]">Original Tema Ltd</span>
                <span className="text-[7.5px] tracking-[0.25em] uppercase text-[#6B7278]/50 font-medium mt-0.5">UK Creative-Tech Platform Company</span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.11em]"
                style={{ fontSize: "clamp(1.75rem, 3.8vw, 3.8rem)" }}
              >
                A Platform
                <br />with a Vision
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed">
                ELIZIUM AI is developed under Original Tema Ltd — a UK creative-technology
                company building immersive platforms and experiences.
              </motion.p>

              {/* Company data rows */}
              <motion.div variants={fadeUp} className="flex flex-col gap-0 mt-1">
                {[
                  { k: "Company Number", v: "16876027" },
                  { k: "Registered In",  v: "United Kingdom" },
                  { k: "Foundation",     v: "Creative Technology — Platform Development" },
                ].map(({ k, v }) => (
                  <div key={k} className="grid grid-cols-[2fr_3fr] gap-4 py-2.5 border-t border-[#1C2530]/45">
                    <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#8A9098] font-medium">{k}</span>
                    <span className="text-[8.5px] tracking-[0.1em] text-[#A0A6AC] font-medium">{v}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </motion.div>
            </motion.div>

            {/* Right — infrastructure pillar list */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-7 flex flex-col"
            >
              {[
                { n: "01", label: "Immersive Infrastructure" },
                { n: "02", label: "Future Audience Systems" },
                { n: "03", label: "International Platform Development" },
                { n: "04", label: "AI-Human Cultural Experiences" },
                { n: "05", label: "Scalable Live Experience Format" },
              ].map((item) => (
                <motion.div
                  key={item.n} variants={fadeUp}
                  className="flex items-baseline gap-5 py-4 border-t border-[#1C2530]/40"
                >
                  <span className="text-[7.5px] tracking-[0.38em] uppercase text-[#6B7278]/28 font-medium flex-shrink-0">{item.n}</span>
                  <span className="text-[10.5px] tracking-[0.25em] uppercase text-[#969CA2] font-medium leading-snug">{item.label}</span>
                </motion.div>
              ))}
              <div className="border-t border-[#1C2530]/40" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          09 · PRIVATE INQUIRY
          Form only — no image. Controlled narrow column on desktop.
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Private Inquiry" num="09" />

          <div className="max-w-[600px]">
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                Private Inquiry
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                For partners,
                <br />sponsors and
                <br />collaborators.
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed">
                Request access to the full presentation and explore
                collaboration opportunities.
              </motion.p>

              {/* Form fields */}
              <motion.div variants={fadeUp} className="flex flex-col gap-0 mt-2">
                {[
                  { id: "inq-name",    label: "Full Name", type: "text",  placeholder: "Your name" },
                  { id: "inq-company", label: "Company",   type: "text",  placeholder: "Company or institution" },
                  { id: "inq-role",    label: "Role",      type: "text",  placeholder: "Your role or title" },
                  { id: "inq-email",   label: "Email",     type: "email", placeholder: "your@email.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="flex flex-col border-t border-[#1C2530]/50 pt-3 pb-1 gap-1.5">
                    <label htmlFor={id} className="text-[8.5px] tracking-[0.28em] uppercase text-[#8A9098] font-medium">
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      placeholder={placeholder}
                      className="bg-transparent text-[12px] tracking-[0.06em] text-[#C8CDD2] placeholder:text-[#7B8188]/75 focus:outline-none w-full pb-2.5 border-b border-[#2A3340]/70 focus:border-[#8A9098]/60 transition-colors duration-200"
                    />
                  </div>
                ))}

                {/* Type of Inquiry — selectable button group */}
                <div className="flex flex-col border-t border-[#1C2530]/50 pt-3 pb-3 gap-2.5">
                  <span className="text-[8.5px] tracking-[0.28em] uppercase text-[#8A9098] font-medium">
                    Type of Inquiry
                  </span>
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
                  <label htmlFor="inq-message" className="text-[8.5px] tracking-[0.28em] uppercase text-[#8A9098] font-medium">
                    Message
                  </label>
                  <textarea
                    id="inq-message"
                    rows={3}
                    placeholder="Brief description of your inquiry…"
                    className="bg-transparent text-[12px] tracking-[0.06em] text-[#C8CDD2] placeholder:text-[#7B8188]/75 focus:outline-none w-full pb-2.5 resize-none border-b border-[#2A3340]/70 focus:border-[#8A9098]/60 transition-colors duration-200"
                  />
                </div>
                <div className="border-t border-[#1C2530]/50 mt-1" />
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
                >
                  Request Access <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          10 · MEDIA / GALLERY
          Image: grid10.png — full generated gallery board, landscape
          Layout: label + heading above, full-width cinematic image below
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-6 lg:py-10 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Media / Gallery" num="10" />

          {/* Side-by-side: compact text left, dominant gallery image right */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_7fr] gap-4 lg:gap-8 items-center">

            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                Platform Visuals
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Worlds
                <br />We Create
              </motion.h2>
              <Rule />

              {/* Mobile-only — full gallery image */}
              <motion.div variants={scaleIn} className="lg:hidden mt-2">
                <FadeImage
                  src="/images/elysium-ai/dark/perfect1.png"
                  alt="Elizium AI — Visual Gallery"
                  className="aspect-[4/3]"
                  position="center center"
                  fadeLeft={6} fadeRight={6} fadeTop={6} fadeBottom={6}
                  sizes="100vw"
                  objectFit="contain"
                />
              </motion.div>

              {/* Button sits below the grid on mobile and below the heading on desktop */}
              <motion.div variants={fadeUp} className="mt-2 lg:mt-0">
                <Link
                  href="/vision"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 border border-[#1C2530]/55 text-[#C8CDD2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
                >
                  View Full Gallery <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Desktop-only full gallery image — large and cinematic */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block"
            >
              <FadeImage
                src="/images/elysium-ai/dark/perfect1.png"
                alt="Elizium AI — Visual Gallery"
                className="aspect-[4/3]"
                position="center center"
                fadeLeft={6} fadeRight={4} fadeTop={6} fadeBottom={6}
                sizes="78vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          11 · ABOUT PLATFORM
          Image: 08-company-infrastructure.webp — right (globe/abstract)
          Layout: text left, globe image right, Vision/Mission/Focus/Impact strip bottom
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="About Platform" num="11" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-14 items-center">

            {/* Text + mobile image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 3.8vw, 3.8rem)" }}
              >
                About
                <br />Elizium AI
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed max-w-lg">
                ELIZIUM AI is a future-facing creative-technology platform exploring the
                relationship between artificial intelligence, human performance and immersive
                audience systems.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed max-w-lg">
                We build experiences that inspire, connect and transform.
              </motion.p>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden mt-1">
                <FadeImage
                  src="/images/elysium-ai/dark/11about.png"
                  alt="About Elizium AI"
                  className="aspect-[4/3]"
                  position="center center"
                  fadeLeft={6} fadeTop={6} fadeBottom={6} fadeRight={4}
                  sizes="100vw"
                />
              </motion.div>

              {/* Bottom boxed Vision / Mission / Focus / Impact modules */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2"
              >
                {[
                  { k: "Vision",  v: "Future Experiences" },
                  { k: "Mission", v: "Human-AI Connection" },
                  { k: "Focus",   v: "Immersive Platforms" },
                  { k: "Impact",  v: "Global Culture" },
                ].map(({ k, v }) => (
                  <div
                    key={k}
                    className="flex flex-col gap-1 p-3"
                    style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-[7.5px] tracking-[0.3em] uppercase text-[#6B7278]/45 font-medium">{k}</span>
                    <span className="text-[9px] tracking-[0.18em] uppercase text-[#969CA2] font-medium leading-snug">{v}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Desktop-only globe / platform visual */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block"
            >
              <FadeImage
                src="/images/elysium-ai/dark/11about.png"
                alt="About Elizium AI"
                className="aspect-[4/3]"
                position="center center"
                fadeLeft={6} fadeTop={6} fadeBottom={6} fadeRight={4}
                sizes="50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          12 · TECHNOLOGY
          Layout: heading/copy left, capability rows right, bottom module row
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Technology" num="12" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">

            {/* Left — heading + copy + numbered list (mobile image is desktop-only here to avoid duplicating §04) */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-5 flex flex-col gap-4 lg:gap-5"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 3.8vw, 3.8rem)" }}
              >
                Technology
                <br />Behind Elizium
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Our technology infrastructure enables immersive, interactive and personalised
                experiences at every level.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col gap-0">
                {[
                  { n: "01", label: "AI Systems",               desc: "Real-time AI reasoning and response layers" },
                  { n: "02", label: "Interaction Layer",         desc: "Audience input mapped to visual and narrative systems" },
                  { n: "03", label: "Audience Data & CRM",       desc: "Opt-in data collection and personal pathway management" },
                  { n: "04", label: "Access & Security",         desc: "Private invitation and entry control systems" },
                  { n: "05", label: "Scalable Infrastructure",   desc: "Modular architecture for global venue deployment" },
                ].map((item) => (
                  <div key={item.n} className="flex items-start gap-5 py-3 border-t border-[#1C2530]/40">
                    <span className="text-[7.5px] tracking-[0.38em] uppercase text-[#6B7278]/28 font-medium flex-shrink-0 pt-0.5">{item.n}</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[9.5px] tracking-[0.25em] uppercase text-[#969CA2] font-medium">{item.label}</span>
                      <span className="text-[13px] text-[#707880] leading-snug">{item.desc}</span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/40" />
              </motion.div>
            </motion.div>

            {/* Desktop-only vertical tech element — portrait container so the full asset is visible */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:flex lg:col-span-7 justify-center"
            >
              <div className="relative aspect-[3/4] w-full max-w-[520px]">
                <Image
                  src="/images/elysium-ai/dark/tech-final.png"
                  alt="Elizium AI — Technology System"
                  fill
                  className="object-contain"
                  sizes="520px"
                />
              </div>
            </motion.div>
          </div>

          {/* Bottom module row */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-6"
          >
            {["Secure Systems", "Real-Time Interaction", "Global Scalability", "Future Ready"].map((t) => (
              <motion.div key={t} variants={fadeUp}><ModBox>{t}</ModBox></motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          13 · GLOBAL EXPANSION
          Video: elizium-global-expansion.mp4 — right column
          Layout: text + city rows left, video right, city location boxes bottom
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="Global Expansion" num="13" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

            {/* Text + city list */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-4 flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                Global Expansion
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 3.8vw, 3.8rem)" }}
              >
                A Global
                <br />Journey
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                ELIZIUM AI is expanding to major cities worldwide, building a global network
                of immersive platforms and experiences.
              </motion.p>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden mt-1">
                <FadeImage
                  src="/images/elysium-ai/dark/global-map-pure-black.png"
                  alt="Elizium AI — Global Expansion Map"
                  className="aspect-[4/3]"
                  position="center center"
                  fadeLeft={0} fadeTop={0} fadeBottom={0} fadeRight={0}
                  sizes="100vw"
                  objectFit="contain"
                />
              </motion.div>

              {/* City rows */}
              <motion.div variants={fadeUp} className="flex flex-col gap-0 mt-1">
                {[
                  { city: "London",      country: "United Kingdom", note: "Founding" },
                  { city: "Dubai",       country: "UAE" },
                  { city: "Singapore",   country: "Singapore" },
                  { city: "Berlin",      country: "Germany" },
                  { city: "Los Angeles", country: "USA" },
                ].map(({ city, country, note }) => (
                  <div key={city} className="flex items-center justify-between py-2.5 border-t border-[#1C2530]/45">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[9.5px] tracking-[0.2em] uppercase text-[#969CA2] font-medium">{city}</span>
                      {note && (
                        <span className="text-[7px] tracking-[0.2em] uppercase text-[#6B7278]/40 border border-[#1C2530]/40 px-1.5 py-0.5">
                          {note}
                        </span>
                      )}
                    </div>
                    <span className="text-[7.5px] tracking-[0.15em] uppercase text-[#6B7278]/40">{country}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link
                  href="/platform"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-2.5 border border-[#1C2530]/55 text-[#C8CDD2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
                >
                  View All Locations <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Desktop-only global map image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block lg:col-span-8"
            >
              <FadeImage
                src="/images/elysium-ai/dark/global-map-pure-black.png"
                alt="Elizium AI — Global Expansion Map"
                className="aspect-[16/9]"
                position="center center"
                fadeLeft={0} fadeTop={0} fadeBottom={0} fadeRight={0}
                sizes="65vw"
                objectFit="contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          14 · TEAM / FOUNDING DIRECTION
          Three-card layout: portrait area + name + role.
          Real team portraits are not in the project yet — placeholder dark
          gradient portrait cells are used until proper portraits are added.
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="Team" num="14" />

          {/* Heading + intro */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
            className="flex flex-col gap-4 lg:gap-5 max-w-xl"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
              style={{ fontSize: "clamp(1.7rem, 3.8vw, 3.8rem)" }}
            >
              Founding
              <br />Direction
            </motion.h2>
            <Rule />
            <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
              ELIZIUM AI is led by a team of visionaries, creatives and technologists
              bringing the future of experiences to life.
            </motion.p>
          </motion.div>

          {/* Two portrait cards */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
            className="grid grid-cols-2 gap-3 lg:gap-4 mt-8 lg:mt-12 max-w-[760px]"
          >
            {[
              { name: "Maksim Volkov",        role: "Strategic Technology Direction", img: "/images/elysium-ai/dark/maksim-new.png" },
              { name: "Elizaveta Zhuravleva", role: "Founder & Platform Director",   img: "/images/elysium-ai/dark/portrait-elizaveta-zhuravleva.png" },
            ].map(({ name, role, img }) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="flex flex-col border border-[#1C2530]/55 bg-[#080808]"
              >
                <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden border-b border-[#1C2530]/55">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center top" }}
                    sizes="(max-width: 1024px) 50vw, 370px"
                  />
                </div>
                <div className="flex flex-col gap-2 px-5 py-5 lg:px-6 lg:py-6 text-center">
                  <span className="text-[10px] tracking-[0.28em] uppercase font-medium text-[#E2E8EE]">
                    {name}
                  </span>
                  <span className="text-[8.5px] tracking-[0.22em] uppercase text-[#7B8188] font-medium leading-snug">
                    {role}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* MEET THE TEAM button */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
            className="mt-6 lg:mt-10"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 border border-[#1C2530]/55 text-[#C8CDD2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
            >
              Meet the Team <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          15 · FAQ — dedicated section, separate from Contact
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="FAQ" num="15" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-5 flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                Frequently Asked Questions
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Important
                <br />answers
                <br />about the
                <br />platform.
              </motion.h2>
              <Rule />
              <motion.div variants={fadeUp} className="hidden lg:block">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-5 py-3 border border-[#1C2530]/55 text-[#C8CDD2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
                >
                  Read All FAQ <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-7 flex flex-col"
            >
              <div className="border-t border-[#1C2530]/35" />
              {FAQS.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="border-b border-[#1C2530]/35">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-3.5 text-left group"
                    aria-expanded={openFaq === i}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <span className="text-[7.5px] tracking-[0.38em] uppercase text-[#6B7278]/28 font-medium flex-shrink-0 pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[12px] font-light text-[#C8CDD2] group-hover:text-[#E2E8EE] transition-colors duration-200 leading-snug">
                        {item.q}
                      </span>
                    </div>
                    <span className="text-[13px] text-[#6B7278]/32 font-extralight flex-shrink-0 mt-0.5 group-hover:text-[#6B7278]/65 transition-colors">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="ans"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[13px] text-[#707880] leading-relaxed pl-8 pb-4 max-w-md">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              {/* Mobile-only Read All FAQ button beneath the accordion */}
              <motion.div variants={fadeUp} className="lg:hidden mt-5">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-between gap-3 px-5 py-3.5 border border-[#1C2530]/55 text-[#C8CDD2] text-[9px] tracking-[0.28em] uppercase font-medium"
                >
                  Read All FAQ <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          16 · CONTACT — clean, FAQ-free
          Bottom: ELIZIUM wordmark strip
      ═══════════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Contact" num="16" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">

            {/* Left — heading + contact rows + buttons */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-7 flex flex-col gap-4 lg:gap-5"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Let&apos;s Build
                <br />the Future
                <br />Together
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-md">
                Get in touch for partnerships, collaborations, media inquiries or
                private opportunities.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col gap-0 mt-1">
                {[
                  { k: "Email",        v: "admin@elizium.co.uk" },
                  { k: "Partnerships", v: "partnerships@elizium.co.uk" },
                  { k: "Press",        v: "press@elizium.co.uk" },
                  { k: "Phone",        v: "+44 7746 271397" },
                  { k: "Location",     v: "London, United Kingdom" },
                ].map(({ k, v }) => (
                  <div key={k} className="grid grid-cols-[2fr_3fr] gap-4 py-2.5 border-t border-[#1C2530]/45">
                    <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#8A9098] font-medium">{k}</span>
                    <span className="text-[8.5px] tracking-[0.1em] text-[#A0A6AC] font-medium">{v}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 bg-[#E2E8EE] text-[#050505] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#C8CDD2] transition-colors duration-300"
                >
                  Send Message
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 border border-[#1C2530]/55 text-[#969CA2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
                >
                  Private Access
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — contact map graphic */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block lg:col-span-5"
            >
              <FadeImage
                src="/images/elysium-ai/dark/contactmap.png"
                alt="Elizium AI — London, United Kingdom"
                className="aspect-[4/5]"
                position="center center"
                fadeLeft={10} fadeTop={8} fadeBottom={8} fadeRight={6}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </motion.div>
          </div>

          {/* ELIZIUM wordmark strip */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
            className="mt-8 lg:mt-16 pt-6 border-t border-[#1C2530]/40 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
          >
            <div className="flex flex-col gap-1">
              <span
                className="font-display font-normal uppercase text-[#E2E8EE]/12 leading-none tracking-[0.20em]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                Elizium
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#6B7278]/45 font-medium">
                Immersive AI-Human Platform
              </span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {["Future Platform", "AI-Human Technology", "Immersive Experiences", "Audience Systems", "Global Expansion"].map((t) => (
                <span key={t} className="text-[7.5px] tracking-[0.22em] uppercase text-[#6B7278]/38 font-medium">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
