"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import CurrentSignalModule from "@/components/ui/CurrentSignalModule";
import EmotionalSpacesGrid from "@/components/ui/EmotionalSpacesGrid";
import PrivateAccessStrip from "@/components/ui/PrivateAccessStrip";

// ─── shared constants ────────────────────────────────────────────────────────
const W  = "max-w-[1440px] mx-auto px-6 lg:px-12";
const BG = "#050505";

// ─── FadeImage ───────────────────────────────────────────────────────────────
interface FadeImageProps {
  src: string; alt: string; className?: string; position?: string;
  fadeLeft?: number; fadeRight?: number; fadeTop?: number; fadeBottom?: number;
  sizes?: string; priority?: boolean; objectFit?: "cover" | "contain";
  loading?: "lazy" | "eager";
}
function FadeImage({
  src, alt, className = "", position = "center center",
  fadeLeft = 0, fadeRight = 0, fadeTop = 10, fadeBottom = 10,
  sizes = "(max-width: 1024px) 100vw, 55vw", priority = false,
  objectFit = "cover", loading = "lazy",
}: FadeImageProps) {
  const layers: string[] = [];
  if (fadeTop > 0)    layers.push(`linear-gradient(to bottom, ${BG} 0%, transparent ${fadeTop}%)`);
  if (fadeBottom > 0) layers.push(`linear-gradient(to top,    ${BG} 0%, transparent ${fadeBottom}%)`);
  if (fadeLeft > 0)   layers.push(`linear-gradient(to right,  ${BG} 0%, transparent ${fadeLeft}%)`);
  if (fadeRight > 0)  layers.push(`linear-gradient(to left,   ${BG} 0%, transparent ${fadeRight}%)`);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill priority={priority}
        loading={priority ? undefined : loading}
        className={objectFit === "contain" ? "object-contain" : "object-cover"}
        style={{ objectPosition: position }} sizes={sizes} />
      {layers.length > 0 && (
        <div aria-hidden className="absolute inset-0 pointer-events-none z-10"
          style={{ background: layers.join(", ") }} />
      )}
    </div>
  );
}

// ─── SectionHead ─────────────────────────────────────────────────────────────
function SectionHead({ label, num }: { label: string; num?: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
      <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">{label}</span>
      {num && <span className="text-[9px] tracking-[0.36em] font-normal text-[#6B7278]/40">{num}</span>}
    </div>
  );
}

// ─── StatusDot ───────────────────────────────────────────────────────────────
function StatusDot({ live = false }: { live?: boolean }) {
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[1px] ${live ? "bg-[#4ADE80]" : "bg-[#3B4550]"}`} />
  );
}

// ─── data ────────────────────────────────────────────────────────────────────
const PLATFORM_LAYERS = [
  {
    tag: "01",
    live: true,
    status: "Live",
    title: "Signal Layer",
    description:
      "A daily emotional provocation — the Signal of the Day — is published to the platform. Each signal captures a real statistic about AI-human experience and invites public emotional response. Active and updating daily.",
    io: "Provocation Published → Audience Encounter",
  },
  {
    tag: "02",
    live: true,
    status: "Live",
    title: "Interaction Layer",
    description:
      "Audience encounters the active signal and responds emotionally in real time. Every reaction is timestamped, recorded and mapped against the signal — building a continuous live record of collective emotional state.",
    io: "Signal Encounter → Timestamped Reaction",
  },
  {
    tag: "03",
    live: true,
    status: "Live",
    title: "Data Layer",
    description:
      "Raw emotional responses are aggregated into structured signal summaries — distributions, reaction patterns and collective emotional state calculated per signal. Feeds directly into the insight layer.",
    io: "Raw Reactions → Distribution Calculated",
  },
  {
    tag: "04",
    live: true,
    status: "Active",
    title: "Insight Layer",
    description:
      "Signal data is processed into structured Insight Reports — AI-assisted pattern analysis identifying emotional peaks, inflection points and collective response direction across each deployment.",
    io: "Pattern Data → Insight Report",
  },
  {
    tag: "05",
    live: false,
    status: "Pre-Launch",
    title: "Experience Layer",
    description:
      "Future Human is the first flagship deployment — a live AI-human immersive experience in which audience emotional signals are captured spatially in real time. Premiering in London.",
    io: "Platform Intelligence → Live Experience",
  },
  {
    tag: "06",
    live: false,
    status: "By Inquiry",
    title: "Partner Application Layer",
    description:
      "Brands, venues and institutions access the platform's structured intelligence — Signal Reports, Experience Data and co-commissioned deployments. Available by private inquiry only.",
    io: "Experience Data → Structured Intelligence",
  },
];

const SIGNAL_OUTPUT = [
  {
    n: "01",
    title: "Emotional Archives",
    body: "Timestamped signal records from every deployment — a structured record of collective emotional state across the full experience.",
  },
  {
    n: "02",
    title: "Collective Response Patterns",
    body: "Aggregate analysis of audience response: emotional peaks, inflection points and pattern maps across individual and group behaviour.",
  },
  {
    n: "03",
    title: "Partner Insight Reports",
    body: "Post-event intelligence reports structured for brand partners, venue operators and creative institutions.",
  },
];

const PLATFORM_PROPERTIES = [
  { label: "Deployment",   title: "Venue-Agnostic",  description: "Black box theatres, arenas, museums and purpose-built installations.",          detail: "Theatre · Arena · Museum · Installation" },
  { label: "Technology",   title: "Real-Time AI",    description: "Live inference, generative response and adaptive signal logic in production.",   detail: "Live Inference · Generative Response" },
  { label: "Format",       title: "Licensable",      description: "A complete creative and technical package for partners, promoters and operators.", detail: "Creative + Technical · Full Package" },
  { label: "Scalability",  title: "Global-Ready",    description: "Designed from day one for international deployment and cultural adaptation.",     detail: "Multi-Territory · Cultural Adaptation" },
];

// ─── page ────────────────────────────────────────────────────────────────────
export default function PlatformPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: BG }}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/generated/elizium-system-aperture-hero-optimised.webp"
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "60% center" }}
            sizes="100vw"
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg,
                ${BG} 0%, ${BG} 16%,
                rgba(5,5,5,0.88) 34%,
                rgba(5,5,5,0.42) 58%,
                rgba(5,5,5,0.12) 78%,
                transparent 100%)`,
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-48"
            style={{ background: `linear-gradient(to bottom, ${BG} 0%, ${BG} 8%, rgba(5,5,5,0.65) 55%, transparent 100%)` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: `linear-gradient(to top, ${BG} 0%, rgba(5,5,5,0.75) 55%, transparent 100%)` }}
          />
        </div>

        <div className={`relative z-10 flex-1 flex items-center w-full ${W} pt-24 pb-8 lg:pt-32 lg:pb-14`}>
          <div className="w-full lg:max-w-[580px]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col gap-5 lg:gap-6"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <span className="text-[8.5px] tracking-[0.38em] uppercase font-medium text-[#7B8188] flex items-center gap-3">
                  <span className="w-5 h-px bg-[#7B8188]/55" />
                  The Platform
                </span>
                <div className="w-8 h-px bg-[#1C2530]/60" />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3.8rem)" }}
              >
                AI-Human
                <br />Emotional
                <br />Interaction
                <br />Platform
              </motion.h1>

              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[420px]">
                ELIZIUM is a six-layer operating system — from daily emotional signal to live
                immersive experience to structured partner intelligence. Active now.
              </motion.p>

              <motion.div variants={fadeUp} className="flex items-center gap-3 pt-1">
                <StatusDot live />
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#4ADE80] font-medium">
                  Signal Layer Active
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-px" style={{ background: "rgba(28,37,48,0.6)" }}>
                {[
                  { k: "Signal Cycle", v: "Daily" },
                  { k: "Response Capture", v: "Live" },
                  { k: "Partner Access", v: "By Inquiry" },
                ].map(({ k, v }) => (
                  <div key={k} className="flex flex-col gap-0.5 px-3 py-2.5" style={{ background: BG }}>
                    <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">{k}</span>
                    <span className="text-[10px] tracking-[0.18em] uppercase text-[#C8CDD2] font-medium">{v}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#E2E8EE]/70 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
                >
                  Request Private Access <span className="w-4 h-px bg-current" />
                </Link>
                <Link
                  href="/future-human"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#1C2530]/55 text-[#969CA2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
                >
                  Future Human Experience
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM STATUS STRIP ── */}
      <div className="border-t border-[#1C2530]/50" style={{ background: "#080808" }}>
        <div className={`${W} py-3`}>
          <div className="flex items-center gap-6">
            <span className="text-[8px] tracking-[0.38em] uppercase font-semibold text-[#7B8188] whitespace-nowrap">
              Platform Status
            </span>
            <span className="hidden sm:block w-px h-3 bg-[#1C2530]" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {[
                { label: "Signal System",  status: "Live",       live: true },
                { label: "Data Layer",     status: "Recording",  live: true },
                { label: "Insight Layer",  status: "Active",     live: true },
                { label: "Experience",     status: "Pre-Launch", live: false },
              ].map(({ label, status, live }) => (
                <span key={label} className="flex items-center gap-1.5 text-[7.5px] tracking-[0.22em] uppercase text-[#7B8188]">
                  <span className={`w-1 h-1 rounded-full ${live ? "bg-[#4ADE80]" : "bg-[#3B4550]"}`} />
                  {label}: {status}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PLATFORM ARCHITECTURE ── */}
      <section style={{ background: BG }} className="py-10 lg:py-20">
        <div className={W}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-3 mb-8 lg:mb-12"
          >
            <SectionHead label="Platform Architecture" />
            <motion.h2
              variants={fadeUp}
              className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE] max-w-xl"
              style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.6rem)" }}
            >
              Six integrated layers.
              <br />One operating system.
            </motion.h2>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-1">
              {[
                { label: "Layers 01–04", live: true,  status: "Live" },
                { label: "Layer 05",     live: false, status: "Pre-Launch" },
                { label: "Layer 06",     live: false, status: "By Inquiry" },
              ].map(({ label, live, status }) => (
                <span key={label} className={`flex items-center gap-1.5 text-[7.5px] tracking-[0.2em] uppercase font-medium ${live ? "text-[#4ADE80]" : "text-[#3B4550]"}`}>
                  <StatusDot live={live} />
                  {label}: {status}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: "rgba(28,37,48,0.6)" }}
          >
            {PLATFORM_LAYERS.map((layer) => (
              <motion.div
                key={layer.tag}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="flex flex-col gap-3 p-5 lg:p-6"
                style={{ background: BG }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] tracking-[0.3em] uppercase text-[#6B7278] font-medium">{layer.tag}</span>
                  <span className={`flex items-center gap-1.5 text-[7.5px] tracking-[0.2em] uppercase font-medium ${layer.live ? "text-[#4ADE80]" : "text-[#3B4550]"}`}>
                    <StatusDot live={layer.live} />
                    {layer.status}
                  </span>
                </div>
                <span className="text-[12px] tracking-[0.08em] uppercase text-[#C8CDD2] font-medium">{layer.title}</span>
                <p className="text-[13px] text-[#7B8188] leading-relaxed">{layer.description}</p>
                <div className="pt-2 border-t border-[#1C2530]/40 mt-auto">
                  <span className="text-[7px] tracking-[0.22em] uppercase text-[#4B5560] font-medium">{layer.io}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM ARCHITECTURE IMAGE ── */}
      <div style={{ background: BG }} className="overflow-hidden border-t border-[#1C2530]/50">
        <FadeImage
          src="/images/elysium-ai/dark/generated/elizium-system-architecture-map-optimised.webp"
          alt="ELIZIUM Platform — System Architecture Map"
          className="w-full aspect-[21/7]"
          fadeLeft={12} fadeRight={12} fadeTop={22} fadeBottom={22}
          sizes="100vw"
        />
      </div>

      {/* ── SIGNAL OUTPUT ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Signal Output" />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="text-[13.5px] text-[#7B8188] leading-relaxed max-w-[600px] mb-8"
          >
            Every deployment produces a structured emotional archive: audience signals,
            collective response patterns and partner-ready insight reports.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <span className="text-[7.5px] tracking-[0.22em] uppercase font-medium text-[#4ADE80]">Live Audience Signal</span>
            <span className="text-[#3B4550] text-[10px]">→</span>
            <span className="text-[7.5px] tracking-[0.22em] uppercase font-medium text-[#7B8188]">Aggregation + Analysis</span>
            <span className="text-[#3B4550] text-[10px]">→</span>
            <span className="text-[7.5px] tracking-[0.22em] uppercase font-medium text-[#C8CDD2]">Structured Output</span>
          </motion.div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ background: "rgba(28,37,48,0.6)" }}
          >
            {SIGNAL_OUTPUT.map(({ n, title, body }) => (
              <motion.div
                key={n}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="flex flex-col gap-3 p-5 lg:p-6"
                style={{ background: BG }}
              >
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#6B7278] font-medium">{n}</span>
                <span className="text-[12px] tracking-[0.08em] uppercase text-[#C8CDD2] font-medium">{title}</span>
                <p className="text-[13px] text-[#7B8188] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVE SIGNAL ── */}
      <section style={{ background: BG }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-3"
            >
              <SectionHead label="Active Signal" />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#7B8188] leading-relaxed">
                Every day the ELIZIUM platform publishes an active signal — a real statistic
                about AI-human experience, open to public emotional response.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[12px] text-[#6B7278] leading-relaxed">
                This is the live signal layer in operation. Signal 01 of the platform architecture.
              </motion.p>
            </motion.div>
            <div>
              <CurrentSignalModule />
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE DEPLOYMENT ── */}
      <section
        style={{ background: BG }}
        className="py-10 lg:py-20 border-t border-[#1C2530]/50 relative overflow-hidden"
      >
        <div className="absolute inset-0 lg:left-[50%] pointer-events-none">
          <Image
            src="/images/elysium-ai/dark/generated/featured-experience-future-human-hall.webp"
            alt=""
            fill
            aria-hidden
            className="object-cover"
            style={{ objectPosition: "center center" }}
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right, ${BG} 0%, ${BG} 24%, rgba(5,5,5,0.88) 45%, rgba(5,5,5,0.20) 72%, transparent 100%)`,
          }}
        />
        <div className={`relative z-10 ${W}`}>
          <SectionHead label="Experience Deployment" num="05" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-5 max-w-[480px]"
          >
            <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
              Layer 05 — First Flagship Deployment
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE]"
              style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.6rem)" }}
            >
              Future Human
              <br />Premiering London
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
              The first flagship deployment of the ELIZIUM platform — a live AI-human immersive
              experience in which audience emotional signals are captured spatially in real time.
              The experience layer made visible.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/future-human"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium text-[#E2E8EE] hover:text-[#8E949A] transition-colors group"
              >
                Explore Future Human
                <span className="w-8 h-px bg-[#E2E8EE] group-hover:w-12 transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PLATFORM PROPERTIES ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Platform Properties" />
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(28,37,48,0.6)" }}
          >
            {PLATFORM_PROPERTIES.map(({ label, title, description, detail }) => (
              <motion.div
                key={label}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="flex flex-col gap-3 p-5 lg:p-6"
                style={{ background: BG }}
              >
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#6B7278] font-medium">{label}</span>
                <span className="text-[12px] tracking-[0.08em] uppercase text-[#C8CDD2] font-medium">{title}</span>
                <p className="text-[13px] text-[#7B8188] leading-relaxed">{description}</p>
                <div className="pt-2 border-t border-[#1C2530]/40 mt-auto">
                  <span className="text-[7px] tracking-[0.22em] uppercase text-[#4B5560] font-medium">{detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMOTIONAL SPACES ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Emotional Spaces" />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="text-[13.5px] text-[#7B8188] leading-relaxed max-w-[600px] mb-8"
          >
            Six emotional territories that define the AI-human encounter. Every ELIZIUM
            signal and experience operates within one of these spaces.
          </motion.p>
          <EmotionalSpacesGrid />
        </div>
      </section>

      {/* ── PRIVATE ACCESS ── */}
      <PrivateAccessStrip />
    </>
  );
}
