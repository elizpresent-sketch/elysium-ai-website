"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import CurrentSignalModule from "@/components/ui/CurrentSignalModule";
import LiveEmotionalDataPreview from "@/components/ui/LiveEmotionalDataPreview";
import PrivateAccessStrip from "@/components/ui/PrivateAccessStrip";

const BG = "#050505";
const W  = "max-w-[1440px] mx-auto px-6 lg:px-12";

// ─── FadeImage ───────────────────────────────────────────────────────────────
interface FadeImageProps {
  src: string; alt: string; className?: string; position?: string;
  fadeLeft?: number; fadeRight?: number; fadeTop?: number; fadeBottom?: number;
  sizes?: string;
}
function FadeImage({
  src, alt, className = "", position = "center center",
  fadeLeft = 0, fadeRight = 0, fadeTop = 10, fadeBottom = 10, sizes = "100vw",
}: FadeImageProps) {
  const layers: string[] = [];
  if (fadeTop > 0)    layers.push(`linear-gradient(to bottom, ${BG} 0%, transparent ${fadeTop}%)`);
  if (fadeBottom > 0) layers.push(`linear-gradient(to top,    ${BG} 0%, transparent ${fadeBottom}%)`);
  if (fadeLeft > 0)   layers.push(`linear-gradient(to right,  ${BG} 0%, transparent ${fadeLeft}%)`);
  if (fadeRight > 0)  layers.push(`linear-gradient(to left,   ${BG} 0%, transparent ${fadeRight}%)`);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover"
        style={{ objectPosition: position }} sizes={sizes} />
      {layers.length > 0 && (
        <div aria-hidden className="absolute inset-0 pointer-events-none z-10"
          style={{ background: layers.join(", ") }} />
      )}
    </div>
  );
}

// ─── SectionHead ─────────────────────────────────────────────────────────────
function SectionHead({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-10">
      <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">{label}</span>
    </div>
  );
}

// ─── StatusDot ───────────────────────────────────────────────────────────────
function StatusDot({ live = false }: { live?: boolean }) {
  return (
    <span
      className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${live ? "bg-[#E2E8EE]/65 animate-pulse" : "bg-[#3B4550]"}`}
      style={live ? { boxShadow: "0 0 4px 1px rgba(226,232,238,0.15)" } : undefined}
    />
  );
}

// ─── data ────────────────────────────────────────────────────────────────────
const STAGES = [
  {
    num: "01",
    name: "Signal",
    live: true,
    status: "Live",
    description:
      "A daily emotional provocation is published to the platform. Each signal captures a real statistic about AI-human experience — surfaced publicly, active for 24 hours, designed to provoke a genuine response.",
  },
  {
    num: "02",
    name: "Response",
    live: true,
    status: "Live",
    description:
      "The audience encounters the active signal and responds emotionally in real time. Reactions — anxiety, interest, trust, discomfort, emptiness — are captured without friction at the point of encounter.",
  },
  {
    num: "03",
    name: "Pattern",
    live: true,
    status: "Active",
    description:
      "Individual responses aggregate into collective emotional patterns. Distributions are calculated, dominant reactions identified and shifts across the audience mapped — producing the first layer of structured intelligence.",
  },
  {
    num: "04",
    name: "Insight",
    live: true,
    status: "Active",
    description:
      "Pattern data is processed into structured Insight Reports — AI-assisted analysis identifying what the collective emotional response means, what it predicts and what it implies for the next experience.",
  },
  {
    num: "05",
    name: "Experience",
    live: false,
    status: "Pre-Launch",
    description:
      "Insight data directly informs the design of live AI-human experiences. Future Human stages the emotional encounter as a live, unrepeatable event — read and adapted by the platform in real time.",
  },
  {
    num: "06",
    name: "Application",
    live: false,
    status: "By Inquiry",
    description:
      "Partners, venues and institutions receive the platform's structured intelligence output — emotional archives, insight reports and experience deployments calibrated for their specific context and objectives.",
  },
];

const METHOD_STATUS = [
  { id: "01", label: "Signal Layer",    status: "Live",       live: true,  note: "Signal of the Day active and recording" },
  { id: "02", label: "Response Capture", status: "Live",     live: true,  note: "Reactions writing to structured data in real time" },
  { id: "03", label: "Pattern Analysis", status: "Active",   live: true,  note: "Signal Summary calculating distributions per signal" },
  { id: "04", label: "Insight Layer",   status: "Active",    live: true,  note: "Latest report: Human Control / Machine Intimacy" },
  { id: "05", label: "Experience Layer", status: "Pre-Launch", live: false, note: "Future Human: London, in development" },
  { id: "06", label: "Partner Access",  status: "By Inquiry", live: false, note: "Private partner pipeline open" },
];

const PLATFORM_OUTPUT = [
  {
    n: "01",
    title: "Emotional Archives",
    body: "Full timestamped records of collective audience emotional signal — structured and accessible post-event.",
    format: "Data Archive",
  },
  {
    n: "02",
    title: "Partner Signal Reports",
    body: "Post-event intelligence for brand partners and venue operators — emotional engagement maps, peak moments and pattern analysis.",
    format: "Intelligence Brief",
  },
  {
    n: "03",
    title: "Collective Pattern Data",
    body: "Aggregate emotional behaviour across sessions — the foundation for future experience design, cultural insight and AI development.",
    format: "Pattern Report",
  },
];

// ─── page ────────────────────────────────────────────────────────────────────
export default function MethodPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: BG }} className="pt-24 pb-16 lg:pt-36 lg:pb-24">
        <div className={W}>
          <SectionHead label="The Method" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-6 max-w-[680px]"
          >
            <motion.h1
              variants={fadeUp}
              className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)" }}
            >
              A six-stage operating methodology for reading, shaping and archiving emotional response.
            </motion.h1>
            <div className="h-px w-8 bg-[#1C2530]/60" />
            <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[480px]">
              The ELIZIUM Method is a structured operational system — from daily signal to live
              experience to structured partner intelligence. Each stage produces data that feeds
              the next.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <StatusDot live />
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#B8BEC4] font-medium">
                Stages 01 – 04 Active
              </span>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
              >
                Discuss the Method <span className="w-4 h-px bg-current" />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: "rgba(28,37,48,0.6)" }}>
              {[
                { k: "Live Signal",   v: "Machine Intimacy" },
                { k: "Top Response",  v: "Interest" },
                { k: "Pattern",       v: "Trust + Latent Anxiety" },
                { k: "Output",        v: "Insight Report" },
              ].map(({ k, v }) => (
                <div key={k} className="flex flex-col gap-0.5 px-3 py-2.5" style={{ background: BG }}>
                  <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">{k}</span>
                  <span className="text-[9px] tracking-[0.15em] uppercase text-[#C8CDD2] font-medium leading-snug">{v}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── METHOD IMAGE ── */}
      <div style={{ background: BG }} className="overflow-hidden border-t border-[#1C2530]/50">
        <FadeImage
          src="/images/elysium-ai/dark/generated/elizium-method-symbols-set-clean-optimised.webp"
          alt="ELIZIUM Method — Signal and Pattern System"
          className="w-full aspect-[21/7]"
          fadeLeft={12} fadeRight={12} fadeTop={22} fadeBottom={22}
          sizes="100vw"
        />
      </div>

      {/* ── SIX STAGES ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Six Stages" />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mb-8">
            {[
              { label: "Stages 01–04", live: true,  status: "Active" },
              { label: "Stage 05",     live: false, status: "Pre-Launch" },
              { label: "Stage 06",     live: false, status: "By Inquiry" },
            ].map(({ label, live, status }) => (
              <span key={label} className={`flex items-center gap-1.5 text-[7.5px] tracking-[0.2em] uppercase font-medium ${live ? "text-[#B8BEC4]" : "text-[#3B4550]"}`}>
                <StatusDot live={live} />
                {label}: {status}
              </span>
            ))}
          </div>
          <div className="flex flex-col">
            {STAGES.map(({ num, name, live, status, description }) => (
              <motion.div
                key={num}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="grid grid-cols-[2.5rem_1fr] lg:grid-cols-[4rem_14rem_1fr_7rem] gap-x-5 lg:gap-x-10 items-start py-6 border-t border-[#1C2530]/50"
              >
                <span className="text-[9px] tracking-[0.3em] font-normal text-[#6B7278]/50 pt-0.5">
                  {num}
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#C8CDD2] font-medium pt-0.5">
                  {name}
                </span>
                <p className="col-start-2 lg:col-start-3 text-[13px] text-[#7B8188] leading-relaxed mt-2 lg:mt-0">
                  {description}
                </p>
                <span className={`hidden lg:flex items-center gap-1.5 text-[7.5px] tracking-[0.2em] uppercase font-medium justify-end pt-0.5 ${live ? "text-[#B8BEC4]" : "text-[#3B4550]"}`}>
                  <StatusDot live={live} />
                  {status}
                </span>
              </motion.div>
            ))}
            <div className="border-t border-[#1C2530]/50" />
          </div>
        </div>
      </section>

      {/* ── LIVE SYSTEM STATUS ── */}
      <section style={{ background: BG }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Method System Status" />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="text-[13.5px] text-[#7B8188] leading-relaxed max-w-[580px] mb-8"
          >
            The ELIZIUM Method is a live operational system. Stages 01 – 04 are active now.
            Stage 05 (Experience) is in pre-production. Stage 06 (Application) opens by private inquiry.
          </motion.p>
          <div className="flex flex-col">
            {METHOD_STATUS.map(({ id, label, status, live, note }) => (
              <motion.div
                key={id}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="grid grid-cols-[2.5rem_1fr] lg:grid-cols-[4rem_14rem_1fr_7rem] gap-x-5 lg:gap-x-10 items-center py-3.5 border-t border-[#1C2530]/45"
              >
                <span className="text-[9px] tracking-[0.3em] font-normal text-[#6B7278]/40 pt-0.5">{id}</span>
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#969CA2] font-medium">{label}</span>
                <span className="col-start-2 lg:col-start-3 text-[12px] text-[#6B7278] mt-1 lg:mt-0">{note}</span>
                <span className={`hidden lg:flex items-center gap-1.5 text-[7.5px] tracking-[0.2em] uppercase font-medium justify-end ${live ? "text-[#B8BEC4]" : "text-[#3B4550]"}`}>
                  <StatusDot live={live} />
                  {status}
                </span>
              </motion.div>
            ))}
            <div className="border-t border-[#1C2530]/45" />
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
                The ELIZIUM Method begins here. Stage 01 is live — an active emotional
                provocation published daily, generating real audience response in real time.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[12px] text-[#6B7278] leading-relaxed">
                This is what Stage 01 produces. Every subsequent stage operates from this data.
              </motion.p>
            </motion.div>
            <div>
              <CurrentSignalModule />
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE RESPONSE DATA ── */}
      <section style={{ background: BG }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-3"
            >
              <SectionHead label="Live Response Data" />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#7B8188] leading-relaxed">
                Stage 01 is live and recording. The aggregate of public emotional responses
                to the current signal is available here — this is what Stage 03 processes
                into patterns and Stage 04 translates into insight.
              </motion.p>
            </motion.div>
            <div>
              <LiveEmotionalDataPreview />
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM OUTPUT ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Platform Output" />
          <div className="flex flex-col gap-4 mb-8 max-w-[680px]">
            <p className="text-[14px] text-[#AAB0B6] leading-relaxed">
              Every ELIZIUM deployment produces structured data that extends beyond the experience
              itself — creating lasting value for partners, venues and cultural institutions.
            </p>
            <p className="text-[12px] text-[#6B7278] tracking-[0.04em] leading-relaxed">
              Future Human — premiering in London — is the first flagship deployment of the ELIZIUM Method.
            </p>
          </div>
          <div className="flex flex-col">
            {PLATFORM_OUTPUT.map(({ n, title, body, format }) => (
              <motion.div
                key={n}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="grid grid-cols-[2.5rem_1fr] lg:grid-cols-[4rem_16rem_1fr_8rem] gap-x-5 lg:gap-x-8 items-start py-4 border-t border-[#1C2530]/50"
              >
                <span className="text-[9px] tracking-[0.3em] font-normal text-[#6B7278]/50 pt-0.5">{n}</span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#C8CDD2] font-medium pt-0.5">{title}</span>
                <p className="col-start-2 lg:col-start-3 text-[12.5px] text-[#7B8188] leading-relaxed mt-1 lg:mt-0">{body}</p>
                <span className="hidden lg:block text-[7.5px] tracking-[0.2em] uppercase text-[#4B5560] font-medium text-right pt-0.5">{format}</span>
              </motion.div>
            ))}
            <div className="border-t border-[#1C2530]/50" />
          </div>
        </div>
      </section>

      {/* ── PRIVATE ACCESS ── */}
      <PrivateAccessStrip />

      {/* ── CTA ── */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-6 max-w-[560px]"
          >
            <motion.p variants={fadeUp} className="text-[8.5px] tracking-[0.36em] uppercase text-[#6B7278] font-medium">
              Methodology Access
            </motion.p>
            <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed">
              Full methodology documentation, technical specifications and deployment frameworks
              are available to qualified partners on request.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
              >
                Discuss the Method <span className="w-4 h-px bg-current" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
