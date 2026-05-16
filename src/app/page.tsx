"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/ui/CTASection";

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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ─────────────────────────────────────────
          1. HERO
      ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/01-hero-ai-human-portrait.webp"
            alt="Elizium AI — Future of Live Entertainment"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-porcelain/55 via-porcelain/30 to-porcelain/78" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-8 max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-3 text-[10px] tracking-ultrawide uppercase font-medium text-silver-dark"
            >
              <span className="w-6 h-px bg-silver-dark" />
              Creative Technology · London
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] font-light tracking-wide uppercase leading-[1.08] text-graphite"
            >
              The future of live entertainment is becoming intelligent.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-silver-mid leading-relaxed max-w-xl"
            >
              ELIZIUM AI is a UK-based creative-tech company developing AI-powered
              immersive entertainment experiences where human emotion, real-time
              visual systems, robotics and artificial intelligence meet.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/platform"
                className="px-8 py-3.5 bg-graphite text-porcelain text-[11px] tracking-superwide uppercase font-medium hover:bg-graphite-mid transition-colors duration-200"
              >
                Explore the Platform
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 border border-graphite/80 sm:border-graphite/60 bg-porcelain/80 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none text-graphite text-[11px] tracking-superwide uppercase font-medium hover:border-graphite transition-colors duration-200"
              >
                Request Private Access
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── PLATFORM STATUS — pinned to hero bottom ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 border-t border-b border-silver-light bg-porcelain/80 backdrop-blur-md overflow-hidden"
        >
          {/* Breathing radial gradient — quiet atmosphere layer */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 120% at 15% 50%, rgba(180,200,220,0.06) 0%, transparent 70%)",
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />

          {/* Light sweep — once every ~11 seconds */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 pointer-events-none"
            style={{
              width: "220px",
              background:
                "linear-gradient(to right, transparent 0%, rgba(180,200,220,0.045) 50%, transparent 100%)",
            }}
            animate={{ x: ["-220px", "calc(100vw + 220px)"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 6.5,
              ease: "linear",
              delay: 2.5,
            }}
          />

          {/* Content — z-10 so it sits above atmosphere layers */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-10">
              {/* Label */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-[9px] tracking-ultrawide uppercase font-semibold text-graphite whitespace-nowrap">
                  Platform Status
                </span>
                <span className="hidden sm:block w-px h-3 bg-silver-light" />
              </div>
              {/* Items */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3 flex-1">
                {[
                  { label: "Platform Online",                   delay: 0,   duration: 3.2 },
                  { label: "Private Access Active",             delay: 1.1, duration: 4.0 },
                  { label: "AI Systems Initialising",           delay: 2.0, duration: 3.6 },
                  { label: "Global Expansion Framework Active", delay: 0.5, duration: 4.4 },
                ].map(({ label, delay, duration }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-graphite-mid flex-shrink-0"
                      animate={{
                        opacity: [0.4, 0.95, 0.4],
                        boxShadow: [
                          "0 0 0px 0px rgba(180,200,220,0)",
                          "0 0 5px 1px rgba(180,200,220,0.38)",
                          "0 0 0px 0px rgba(180,200,220,0)",
                        ],
                      }}
                      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="text-[9px] tracking-superwide uppercase text-graphite-mid leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────
          2. STATEMENT
      ───────────────────────────────────────── */}
      <section className="bg-porcelain py-20 lg:py-28 border-b border-silver-light lg:border-b-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section rule */}
          <div className="flex items-center justify-between border-t border-silver-light pt-6 mb-10">
            <SectionLabel text="The Platform" animate={false} />
            <span className="text-[10px] text-silver-mid font-light tracking-superwide">01</span>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-8 max-w-4xl"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-graphite"
            >
              Not a single show.
              <br />
              A scalable entertainment system.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-graphite-light leading-relaxed max-w-2xl"
            >
              ELIZIUM AI is a modular creative-tech platform for AI-powered immersive
              entertainment. It brings together AI-assisted creative systems, immersive
              visual architecture, audience interaction, robotics and scalable show logic
              into a format designed for launch, licensing and global expansion.
            </motion.p>
          </motion.div>


          {/* Divider with stat strip */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="mt-16 pt-10 border-t border-silver-light grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { stat: "AI-Powered", label: "Real-time creative systems" },
              { stat: "Modular", label: "Scalable show architecture" },
              { stat: "Live", label: "Audience interaction loops" },
              { stat: "Global", label: "Built to license and travel" },
            ].map((item) => (
              <motion.div key={item.stat} variants={fadeUp} className="flex flex-col gap-2">
                <span className="text-xl md:text-2xl font-light tracking-tight text-graphite">
                  {item.stat}
                </span>
                <span className="text-[11px] text-graphite-light leading-snug">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          3. PLATFORM PREVIEW
      ───────────────────────────────────────── */}
      <section className="bg-pearl py-20 lg:py-28 overflow-hidden border-b border-silver-light lg:border-b-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section rule */}
          <div className="flex items-center justify-between border-t border-silver-light pt-6 mb-10">
            <SectionLabel text="Platform" animate={false} />
            <span className="text-[10px] text-silver-mid font-light tracking-superwide">02</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text — left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-6 order-2 lg:order-1"
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                A modular system built for the world&apos;s stages.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed">
                AI-assisted creative systems, immersive visual architecture,
                real-time audience interaction, robotics and scalable show logic —
                all engineered to launch, license and travel globally.
              </motion.p>
              <motion.div variants={fadeUp} className="pt-2">
                <Link
                  href="/platform"
                  className="inline-flex items-center gap-3 text-[11px] tracking-superwide uppercase font-semibold text-graphite hover:text-graphite-mid transition-colors group"
                >
                  Explore the Platform
                  <span className="w-8 h-px bg-graphite group-hover:w-12 transition-all duration-300" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image — right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="relative aspect-square lg:aspect-[3/4] order-1 lg:order-2"
            >
              <Image
                src="/images/elysium-ai/dark/02-platform-overview-stage.webp"
                alt="Elizium AI Platform"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pearl/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          4. FUTURE HUMAN PREVIEW
      ───────────────────────────────────────── */}
      <section className="bg-porcelain py-20 lg:py-28 overflow-hidden border-b border-silver-light lg:border-b-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-4 h-px bg-silver-dark/25 flex-shrink-0" />
            <span className="text-[8px] tracking-[0.38em] uppercase text-silver-dark/38 font-medium">Access Layer Active</span>
          </div>
          {/* Section rule */}
          <div className="flex items-center justify-between border-t border-silver-light pt-6 mb-10">
            <SectionLabel text="Flagship Experience" animate={false} />
            <span className="text-[10px] text-silver-mid font-light tracking-superwide">03</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image — left */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="relative aspect-square lg:aspect-[3/4]"
            >
              <Image
                src="/images/elysium-ai/dark/03-first-experience-portal-card.webp"
                alt="Future Human — Elizium AI Flagship Experience"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Text — right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                Future Human
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed">
                FUTURE HUMAN is the first flagship London experience built to
                demonstrate the ELIZIUM AI platform. It stages the emotional
                encounter between humanity and artificial intelligence through
                immersive visuals, live audience interaction and a robotic AI
                presence.
              </motion.p>
              <motion.div variants={fadeUp} className="pt-2">
                <Link
                  href="/future-human"
                  className="inline-flex items-center gap-3 text-[11px] tracking-superwide uppercase font-semibold text-graphite hover:text-graphite-mid transition-colors group"
                >
                  Discover Future Human
                  <span className="w-8 h-px bg-graphite group-hover:w-12 transition-all duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          5. AUDIENCE INTERACTION
      ───────────────────────────────────────── */}
      <section className="bg-pearl py-20 lg:py-26 border-b border-silver-light lg:border-b-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-4 h-px bg-silver-dark/25 flex-shrink-0" />
            <span className="text-[8px] tracking-[0.38em] uppercase text-silver-dark/38 font-medium">Audience Pathway Locked</span>
          </div>
          {/* Section rule */}
          <div className="flex items-center justify-between border-t border-silver-light pt-6 mb-10">
            <SectionLabel text="Audience Interaction" animate={false} />
            <span className="text-[10px] text-silver-mid font-light tracking-superwide">04</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-4 flex flex-col gap-6"
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                The audience is part of the system.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
                Through opt-in interaction and live response systems, audience input
                becomes part of the visual and narrative architecture of the experience.
              </motion.p>
            </motion.div>

            {/* Image grid */}
            <div className="lg:col-span-8 grid grid-cols-2 gap-4">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={scaleIn}
                className="relative aspect-[3/4]"
              >
                <Image
                  src="/images/elysium-ai/dark/05-audience-system-silhouette.webp"
                  alt="Audience System — Elizium AI"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={scaleIn}
                className="relative aspect-[3/4] mt-10"
              >
                <Image
                  src="/images/elysium-ai/dark/12-media-behind-scenes.webp"
                  alt="Creative Production — Elizium AI"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          6. DARK CONTRAST — VISION QUOTE
      ───────────────────────────────────────── */}
      <section className="relative py-28 lg:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/06-creative-production-stage.webp"
            alt="Elizium AI Stage"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-porcelain/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-porcelain/50 via-transparent to-porcelain/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col items-center gap-10"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-4 text-[9px] tracking-ultrawide uppercase font-medium text-silver-dark"
            >
              <span className="w-10 h-px bg-silver-dark/60" />
              Vision
              <span className="w-10 h-px bg-silver-dark/60" />
            </motion.span>

            <motion.blockquote
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-light tracking-tight text-white leading-[1.12] max-w-3xl"
            >
              AI is not the show.
              <br />
              The human response is.
            </motion.blockquote>

            <motion.div variants={fadeUp} className="pt-2">
              <Link
                href="/vision"
                className="inline-flex items-center gap-3 text-[10px] tracking-superwide uppercase font-semibold text-silver-mid hover:text-white transition-colors duration-300 group"
              >
                Explore the Vision
                <span className="w-8 h-px bg-silver-mid/60 group-hover:bg-white group-hover:w-12 transition-all duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          7. DESIGNED IN LONDON / BUILT TO TRAVEL
      ───────────────────────────────────────── */}
      <section className="bg-porcelain py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section rule */}
          <div className="flex items-center justify-between border-t border-silver-light pt-6 mb-10">
            <SectionLabel text="Global Format" animate={false} />
            <span className="text-[10px] text-silver-mid font-light tracking-superwide">05</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-graphite"
              >
                Designed in London.
                <br />
                Built to travel.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed max-w-md">
                The ELIZIUM AI platform is engineered from the ground up for
                portability — built to scale from intimate venues to landmark
                cultural institutions across the world.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/platform"
                  className="inline-flex items-center gap-3 text-[11px] tracking-superwide uppercase font-semibold text-graphite hover:text-graphite-mid transition-colors group"
                >
                  View the Platform
                  <span className="w-8 h-px bg-graphite group-hover:w-12 transition-all duration-300" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="relative aspect-[16/10]"
            >
              <Image
                src="/images/elysium-ai/dark/13-global-journey-map.webp"
                alt="Global Journey — Elizium AI"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          8. COMPANY INFRASTRUCTURE
      ───────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden bg-pearl"
      >
        {/* Whisper of blue-black depth — barely perceptible */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 65% 50%, rgba(10,22,46,0.07) 0%, transparent 65%)",
          }}
        />
        {/* Soft edge blend — dissolves into adjacent sections */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(5,6,7,0.45) 0%, transparent 18%, transparent 82%, rgba(5,6,7,0.45) 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section rule */}
          <div className="flex items-center justify-between border-t border-silver-light/40 pt-6 mb-12 lg:mb-16">
            <SectionLabel text="Company" animate={false} />
            <span className="text-[10px] text-silver-mid font-light tracking-superwide">06</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left — company identity */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-5 flex flex-col gap-7"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                <span className="text-[9px] tracking-ultrawide uppercase font-semibold text-graphite-light">
                  Original Tema Ltd
                </span>
                <span className="text-[8px] tracking-superwide uppercase text-silver-dark/60 font-medium">
                  UK Creative-Tech Platform Company
                </span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed">
                ELIZIUM AI is developed by Original Tema Ltd as an immersive
                creative-technology platform for AI-human live experiences,
                audience interaction systems and international expansion.
              </motion.p>

              <motion.div variants={fadeUp} className="pt-1">
                <Link
                  href="/platform"
                  className="inline-flex items-center gap-3 text-[10px] tracking-superwide uppercase font-medium text-silver-dark hover:text-graphite transition-colors duration-200 group"
                >
                  Platform Overview
                  <span className="w-6 h-px bg-silver-dark group-hover:w-10 group-hover:bg-graphite transition-all duration-300" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — infrastructure pillars */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-10"
            >
              {[
                { n: "01", label: "Immersive Infrastructure" },
                { n: "02", label: "Future Audience Systems" },
                { n: "03", label: "International Platform Development" },
                { n: "04", label: "AI-Human Cultural Experiences" },
                { n: "05", label: "Scalable Live Experience Format" },
              ].map((item) => (
                <motion.div
                  key={item.n}
                  variants={fadeUp}
                  className="flex items-baseline gap-4 py-4 border-t border-silver-light/50"
                >
                  <span className="text-[8px] tracking-ultrawide uppercase text-silver-dark/40 font-medium flex-shrink-0">
                    {item.n}
                  </span>
                  <span className="text-[11px] tracking-superwide uppercase text-graphite-light font-medium leading-snug">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          9. FOUNDING DIRECTION
      ───────────────────────────────────────── */}
      <section className="bg-porcelain py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section rule */}
          <div className="flex items-center justify-between border-t border-silver-light pt-6 mb-12 lg:mb-16">
            <SectionLabel text="Founding Direction" animate={false} />
            <span className="text-[10px] text-silver-mid font-light tracking-superwide">07</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left — heading + statement */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              <motion.h2
                variants={fadeUp}
                className="text-2xl md:text-3xl font-light tracking-tight leading-snug text-graphite"
              >
                A focused directing core built around specialist collaboration.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
                ELIZIUM AI is developed through a focused founding direction,
                combining platform leadership, creative direction, production
                logic and future technology collaboration. The structure is
                designed to remain lean while bringing in specialist partners
                across performance, robotics, immersive visuals, sound,
                audience systems and international production.
              </motion.p>
            </motion.div>

            {/* Right — role structure */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-7 flex flex-col"
            >
              {[
                { n: "01", label: "Founder & Platform Director" },
                { n: "02", label: "Creative Direction" },
                { n: "03", label: "Technology & Systems" },
                { n: "04", label: "Production & Partnership Network" },
              ].map((item) => (
                <motion.div
                  key={item.n}
                  variants={fadeUp}
                  className="flex items-center gap-6 py-5 border-t border-silver-light"
                >
                  <span className="text-[8px] tracking-ultrawide uppercase text-silver-dark/38 font-medium flex-shrink-0">
                    {item.n}
                  </span>
                  <span className="text-sm tracking-wide text-graphite-light font-light">
                    {item.label}
                  </span>
                </motion.div>
              ))}
              <div className="border-t border-silver-light" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          10. GLOBAL EXPANSION
      ───────────────────────────────────────── */}
      <section className="bg-pearl py-20 lg:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section rule */}
          <div className="flex items-center justify-between border-t border-silver-light pt-6 mb-12 lg:mb-16">
            <SectionLabel text="Global Expansion" animate={false} />
            <span className="text-[10px] text-silver-mid font-light tracking-superwide">08</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left — text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-4 flex flex-col gap-6"
            >
              <motion.h2
                variants={fadeUp}
                className="text-2xl md:text-3xl font-light tracking-tight leading-snug text-graphite"
              >
                A platform network for international rollout.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
                ELIZIUM AI is structured for launch, licensing and
                international rollout, beginning with London as the founding
                market and expanding through selected cultural, commercial
                and venue partnerships.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="text-[9px] tracking-superwide uppercase text-silver-dark/50 font-medium leading-relaxed border-t border-silver-light pt-4"
              >
                Expansion is planned as a platform network, not a traditional tour.
              </motion.p>
            </motion.div>

            {/* Right — expansion video */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-8 flex flex-col gap-5"
            >
              {/* Video container */}
              <div className="relative aspect-video overflow-hidden">
                <video
                  src="/videos/elizium-global-expansion.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Bottom gradient — readability for city labels */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(8,13,18,0.82) 0%, transparent 100%)",
                  }}
                />
                {/* City labels — overlaid at bottom of video */}
                <div className="absolute inset-x-0 bottom-0 px-5 pb-4 flex items-end gap-0">
                  {[
                    { city: "London", note: "Founding" },
                    { city: "Dubai" },
                    { city: "Singapore" },
                    { city: "Berlin" },
                    { city: "Los Angeles" },
                  ].map(({ city, note }, i) => (
                    <div key={city} className="flex items-center">
                      {i > 0 && (
                        <span className="mx-3 w-4 h-px bg-silver-dark/30 flex-shrink-0" />
                      )}
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[7px] tracking-[0.22em] uppercase text-graphite-mid/70 font-medium leading-none">
                          {city}
                        </span>
                        {note && (
                          <span className="text-[5.5px] tracking-[0.18em] uppercase text-silver-dark/45 leading-none">
                            {note}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          11. FAQ
      ───────────────────────────────────────── */}
      <section className="bg-porcelain py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Section rule */}
          <div className="flex items-center justify-between border-t border-silver-light pt-6 mb-12 lg:mb-16">
            <SectionLabel text="Questions" animate={false} />
            <span className="text-[10px] text-silver-mid font-light tracking-superwide">09</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left — label */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-4 flex flex-col gap-3"
            >
              <motion.h2
                variants={fadeUp}
                className="text-2xl md:text-3xl font-light tracking-tight leading-snug text-graphite"
              >
                Questions Before Entry
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed hyphens-none break-normal">
                {"Strategic and philosophical questions about the platform, its direction and what it is being built to become."}
              </motion.p>
            </motion.div>

            {/* Right — accordion rows */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-8 flex flex-col"
            >
              {FAQS.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="border-t border-silver-light">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-6 py-5 text-left group"
                    aria-expanded={openFaq === i}
                  >
                    <div className="flex items-start gap-5 flex-1">
                      <span className="text-[8px] tracking-ultrawide uppercase text-silver-dark/38 font-medium flex-shrink-0 pt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-light text-graphite group-hover:text-graphite-mid transition-colors duration-200 leading-snug">
                        {item.q}
                      </span>
                    </div>
                    <span className="text-[14px] text-silver-dark/40 font-extralight flex-shrink-0 mt-0.5 transition-colors duration-200 group-hover:text-silver-dark/70">
                      {openFaq === i ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-graphite-light leading-relaxed pl-9 pb-6 max-w-xl">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              <div className="border-t border-silver-light" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          12. PRIVATE ACCESS CTA
      ───────────────────────────────────────── */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/07-partnerships-private-room.webp"
            alt=""
            fill
            className="object-cover object-center opacity-10"
            sizes="100vw"
            quality={20}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-porcelain/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="w-4 h-px bg-silver-dark/25 flex-shrink-0" />
            <span className="text-[8px] tracking-[0.38em] uppercase text-silver-dark/38 font-medium">Private System Node Ready</span>
          </div>
          <CTASection
            label="Private Access"
            headline="For partners, investors, venues, sponsors, press and strategic collaborators."
            body="Selected enquiries are reviewed for strategic fit, launch potential and long-term collaboration."
            primaryHref="/contact"
            primaryLabel="Request Private Access"
            secondaryHref="/platform"
            secondaryLabel="Explore the Platform"
          />
        </div>
      </section>
    </>
  );
}
