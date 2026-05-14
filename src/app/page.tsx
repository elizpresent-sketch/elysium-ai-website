"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/ui/CTASection";

export default function Home() {
  return (
    <>
      {/* ─────────────────────────────────────────
          1. HERO
      ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/hero-future-live.png"
            alt="Elysium AI — Future of Live Entertainment"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-porcelain/75 via-porcelain/30 to-porcelain/88" />
          <div
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: "url('/images/elysium-ai/white-silver-texture-01.png')",
              backgroundSize: "cover",
            }}
          />
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
              className="inline-flex items-center gap-3 text-[10px] tracking-ultrawide uppercase font-medium text-graphite-light"
            >
              <span className="w-6 h-px bg-graphite-light" />
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
              className="text-base md:text-lg text-graphite-light leading-relaxed max-w-xl"
            >
              ELYSIUM AI is a UK-based creative-tech company developing AI-powered
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-graphite-light to-transparent"
          />
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
              <br className="hidden sm:block" />
              A scalable entertainment system.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-graphite-light leading-relaxed max-w-2xl"
            >
              ELYSIUM AI is a modular creative-tech platform for AI-powered immersive
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
                src="/images/elysium-ai/hero-light-portal.png"
                alt="Elysium AI Platform"
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
                src="/images/elysium-ai/future-human-stage.png"
                alt="Future Human — Elysium AI Flagship Experience"
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
                demonstrate the ELYSIUM AI platform. It stages the emotional
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
                  src="/images/elysium-ai/london-launch.png"
                  alt="London Launch — Elysium AI"
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
                  src="/images/elysium-ai/audience-data.png"
                  alt="Audience Interaction Data"
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
            src="/images/elysium-ai/dark-ring-stage.png"
            alt="Elysium AI Stage"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Layered overlays: deep base + radial centre brighten for text clarity */}
          <div className="absolute inset-0 bg-graphite/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-transparent to-graphite/60" />
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
                The ELYSIUM AI platform is engineered from the ground up for
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
                src="/images/elysium-ai/immersive-architecture.png"
                alt="Immersive Architecture — Elysium AI"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          8. PRIVATE ACCESS CTA
      ───────────────────────────────────────── */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/white-silver-texture-02.png"
            alt=""
            fill
            className="object-cover opacity-20"
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-pearl/82" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
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
