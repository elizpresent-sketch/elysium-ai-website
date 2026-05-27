"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import CurrentSignalModule from "@/components/ui/CurrentSignalModule";
import PrivateAccessStrip from "@/components/ui/PrivateAccessStrip";

const BG = "#050505";
const W  = "max-w-[1440px] mx-auto px-6 lg:px-12";

// ─── SectionHead ─────────────────────────────────────────────────────────────
function SectionHead({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
      <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">{label}</span>
    </div>
  );
}

// ─── StatusDot ───────────────────────────────────────────────────────────────
function StatusDot({ live = false }: { live?: boolean }) {
  return (
    <span
      className={`inline-block w-1 h-1 rounded-full flex-shrink-0 ${live ? "bg-[#E2E8EE]/65" : "bg-[#3B4550]"}`}
      style={live ? { boxShadow: "0 0 3px 1px rgba(226,232,238,0.12)" } : undefined}
    />
  );
}

// ─── data ────────────────────────────────────────────────────────────────────
const DETAILS = [
  { k: "Company",       v: "Original Tema Ltd" },
  { k: "Registration",  v: "16376227" },
  { k: "Jurisdiction",  v: "United Kingdom" },
  { k: "Platform",      v: "ELIZIUM" },
  { k: "Category",      v: "Creative Technology" },
  { k: "Contact",       v: "admin@elizium.co.uk" },
];

const BUILT = [
  { id: "01", label: "Signal System",     live: true,  status: "Live",           desc: "Daily Signal of the Day — live emotional provocation with real-time audience response" },
  { id: "02", label: "Signal Reactions",  live: true,  status: "Live",           desc: "Audience reactions timestamped and recorded to structured data via Make automation" },
  { id: "03", label: "Signal Summary",    live: true,  status: "Live",           desc: "Aggregate emotional data per signal — distributions, patterns, collective response" },
  { id: "04", label: "Insight Reports",   live: true,  status: "Active",         desc: "Structured AI-assisted analysis of signal data — emotional patterns and interpretation" },
  { id: "05", label: "Signal Calendar",   live: true,  status: "Active",         desc: "Planned signal queue — daily signal management and scheduling layer" },
  { id: "06", label: "Inquiry CRM",       live: true,  status: "Active",         desc: "Private partner inquiry pipeline — from submission to review to conversion" },
  { id: "07", label: "Future Human",      live: false, status: "In Development", desc: "London flagship AI-human immersive experience — prototype and pre-production" },
];

const ROADMAP = [
  { n: "01", title: "Signal Platform",     live: true,  status: "LIVE",            desc: "Daily Signal of the Day — live emotional provocation and real-time response system" },
  { n: "02", title: "Data Intelligence",   live: true,  status: "ACTIVE",          desc: "Signal Summary, Insight Reports, Inquiry CRM and operator command centre" },
  { n: "03", title: "Experience Platform", live: false, status: "IN DEVELOPMENT",  desc: "Future Human — London flagship AI-human immersive experience, prototype phase" },
  { n: "04", title: "Global Deployment",   live: false, status: "PLANNED",         desc: "Multi-venue, multi-territory licensing and partner programme" },
];

// ─── page ────────────────────────────────────────────────────────────────────
export default function CompanyPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: BG }} className="pt-24 pb-16 lg:pt-36 lg:pb-24">
        <div className={W}>
          <SectionHead label="Company" />
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
              A creative-technology platform building the systems for AI-human emotional interaction.
            </motion.h1>
            <div className="h-px w-8 bg-[#1C2530]/60" />
            <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[520px]">
              ELIZIUM is operated by Original Tema Ltd — a United Kingdom-registered
              creative-technology company building platforms, systems and experiences at the
              intersection of artificial intelligence, live performance and human emotional response.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-px" style={{ background: "rgba(28,37,48,0.6)" }}>
              {[
                { k: "Systems Built",    v: "7" },
                { k: "Signal Platform",  v: "Live" },
                { k: "Experience Layer", v: "In Dev" },
                { k: "Partner Access",   v: "By Inquiry" },
              ].map(({ k, v }) => (
                <div key={k} className="flex flex-col gap-0.5 px-3 py-2.5" style={{ background: BG }}>
                  <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">{k}</span>
                  <span className="text-[10px] tracking-[0.18em] uppercase text-[#C8CDD2] font-medium">{v}</span>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-4 pt-1">
              <span className="flex items-center gap-2 text-[8px] tracking-[0.3em] uppercase text-[#B8BEC4] font-medium">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#E2E8EE]/65 animate-pulse"
                  style={{ boxShadow: "0 0 4px 1px rgba(226,232,238,0.15)" }}
                />
                Platform Active
              </span>
              <span className="w-px h-3 bg-[#1C2530]" />
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#6B7278] font-medium">
                London, United Kingdom
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── ACTIVE SIGNAL ── */}
      <section style={{ background: "#080808" }} className="py-8 lg:py-12 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-14 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-3"
            >
              <SectionHead label="Signal Layer — Live" />
              <motion.p variants={fadeUp} className="text-[13px] text-[#7B8188] leading-relaxed">
                The ELIZIUM signal platform is live. A new emotional signal publishes
                daily — here is today&apos;s active signal.
              </motion.p>
            </motion.div>
            <div>
              <CurrentSignalModule />
            </div>
          </div>
        </div>
      </section>

      {/* ── PLATFORM STATUS — WHAT HAS BEEN BUILT ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Platform Status — What Has Been Built" />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="text-[13.5px] text-[#7B8188] leading-relaxed max-w-[600px] mb-10"
          >
            The ELIZIUM signal platform is live and operational. The experience platform is
            in active development. Seven distinct systems have been built and deployed.
          </motion.p>
          <div className="flex flex-col">
            {BUILT.map(({ id, label, live, status, desc }) => (
              <motion.div
                key={id}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="grid grid-cols-[2.5rem_1fr] lg:grid-cols-[4rem_16rem_1fr_8rem] gap-x-5 lg:gap-x-8 items-start py-4 border-t border-[#1C2530]/50"
              >
                <span className="text-[9px] tracking-[0.3em] font-normal text-[#6B7278]/50 pt-0.5">{id}</span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#C8CDD2] font-medium pt-0.5">{label}</span>
                <p className="col-start-2 lg:col-start-3 text-[13px] text-[#7B8188] leading-relaxed mt-1 lg:mt-0">{desc}</p>
                <span className={`hidden lg:flex items-center gap-1.5 text-[7.5px] tracking-[0.2em] uppercase font-medium justify-end ${live ? "text-[#B8BEC4]" : "text-[#3B4550]"}`}>
                  <StatusDot live={live} />
                  {status}
                </span>
              </motion.div>
            ))}
            <div className="border-t border-[#1C2530]/50" />
          </div>
        </div>
      </section>

      {/* ── REGISTRATION + MISSION ── */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">

            {/* Registration */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-4"
            >
              <SectionHead label="Registration" />
              <div className="flex flex-col gap-0">
                {DETAILS.map(({ k, v }) => (
                  <div key={k} className="grid grid-cols-[2fr_3fr] gap-4 py-3 border-t border-[#1C2530]/45">
                    <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#8A9098] font-medium">{k}</span>
                    <span className="text-[8.5px] tracking-[0.1em] text-[#A0A6AC] font-medium">{v}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </div>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
                >
                  Contact <span className="w-4 h-px bg-current" />
                </Link>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-4"
            >
              <SectionHead label="Mission" />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                ELIZIUM exists to establish a new category of experience — one in which
                artificial intelligence and human emotional response are in active,
                real-time dialogue.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                We build platforms at the intersection of AI, live performance and emotional
                response — capturing what audiences feel, not just what they do. The emotional
                signal is the rarest form of audience intelligence. We built the system to
                collect it.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                The platform is designed to be deployed globally, licensed by partners and
                operators, and continuously refined by the data it generates from live experience.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                We operate on an invitation basis, building toward a commercial launch with a
                select group of institutional partners, venue operators and brand collaborators.
              </motion.p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SYSTEM ARCHITECTURE STRIP ── */}
      <div style={{ background: BG }} className="overflow-hidden border-t border-[#1C2530]/50">
        <div className="relative w-full aspect-[21/7]">
          <Image
            src="/images/elysium-ai/dark/generated/elizium-system-architecture-map-optimised.webp"
            alt="ELIZIUM Platform — System Architecture"
            fill
            className="object-cover opacity-50"
            sizes="100vw"
          />
          <div aria-hidden className="absolute inset-0 pointer-events-none z-10"
            style={{ background: `linear-gradient(to right, #050505 0%, transparent 15%, transparent 85%, #050505 100%), linear-gradient(to bottom, #050505 0%, transparent 28%, transparent 72%, #050505 100%)` }} />
        </div>
      </div>

      {/* ── PLATFORM ROADMAP ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Platform Roadmap" />
          <div className="flex flex-col">
            {ROADMAP.map(({ n, title, live, status, desc }) => (
              <motion.div
                key={n}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="grid grid-cols-[2.5rem_1fr] lg:grid-cols-[4rem_18rem_1fr_10rem] gap-x-5 lg:gap-x-10 items-start py-6 border-t border-[#1C2530]/50"
              >
                <span className="text-[9px] tracking-[0.3em] font-normal text-[#6B7278]/50 pt-0.5">{n}</span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#C8CDD2] font-medium pt-0.5">{title}</span>
                <p className="col-start-2 lg:col-start-3 text-[13px] text-[#7B8188] leading-relaxed mt-2 lg:mt-0">{desc}</p>
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

      {/* ── PRIVATE ACCESS ── */}
      <PrivateAccessStrip />

      {/* ── LONDON & GLOBAL ── */}
      <section style={{ background: BG }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="London &amp; Global" />
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-start">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-5"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.8rem)" }}
              >
                Designed in London.
                <br />Built to travel.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                ELIZIUM operates from London — a global centre for creative technology, live
                experience and cultural innovation. The platform is engineered for international
                licensing, cultural adaptation and multi-territory deployment.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                From the first London proof-of-concept through to a global partner programme —
                the architecture is designed to travel.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-0"
            >
              {[
                { k: "Headquarters",    v: "London, United Kingdom" },
                { k: "Deployment",      v: "Venue-agnostic, international" },
                { k: "Licensing",       v: "Available to qualified partners" },
                { k: "Current Phase",   v: "Signal platform live. Experience in development." },
                { k: "Partner Access",  v: "By private inquiry only" },
              ].map(({ k, v }) => (
                <div key={k} className="grid grid-cols-[2fr_3fr] gap-4 py-3 border-t border-[#1C2530]/45">
                  <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#8A9098] font-medium">{k}</span>
                  <span className="text-[8.5px] tracking-[0.1em] text-[#A0A6AC] font-medium">{v}</span>
                </div>
              ))}
              <div className="border-t border-[#1C2530]/45" />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 pt-4">
                {[
                  { label: "Phase 01 · Signal Platform",   live: true,  status: "Live" },
                  { label: "Phase 02 · Data Intelligence", live: true,  status: "Active" },
                  { label: "Phase 03 · Experience",        live: false, status: "In Development" },
                  { label: "Phase 04 · Global Deployment", live: false, status: "Planned" },
                ].map(({ label, live, status }) => (
                  <span key={label} className={`flex items-center gap-1.5 text-[7.5px] tracking-[0.2em] uppercase font-medium ${live ? "text-[#B8BEC4]" : "text-[#3B4550]"}`}>
                    <StatusDot live={live} />
                    {label}: {status}
                  </span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
