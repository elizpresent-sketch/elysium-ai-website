"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/ui/CTASection";

const PRINCIPLES = [
  {
    number: "01",
    title: "The human is primary.",
    body: "Technology is the instrument. Human experience is the outcome. Every design decision is made in service of the emotional encounter.",
  },
  {
    number: "02",
    title: "Live means unrepeatable.",
    body: "The value of live entertainment is its irreducibility. AI amplifies this — introducing genuine uncertainty, genuine response, genuine presence.",
  },
  {
    number: "03",
    title: "Scale without dilution.",
    body: "The ELIZIUM AI platform is built to travel without losing its essential quality. A modular system that maintains its integrity across venues and territories.",
  },
  {
    number: "04",
    title: "Intelligence as encounter.",
    body: "We are not building a show about AI. We are creating the conditions for a real meeting — between human emotion and artificial intelligence — in a live space.",
  },
];

export default function VisionPage() {
  return (
    <>
      {/* ── HERO QUOTE ── */}
      <section className="bg-porcelain pt-36 pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-8"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-3 text-[10px] tracking-ultrawide uppercase font-medium text-graphite-light"
            >
              <span className="w-6 h-px bg-graphite-light" />
              Vision
            </motion.span>

            <motion.blockquote
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-graphite leading-[1.05] max-w-4xl"
            >
              AI is not the show.
              <br />
              <span className="text-graphite-mid">The human response is.</span>
            </motion.blockquote>

            <motion.div
              variants={fadeUp}
              className="pt-4 border-t border-silver-light max-w-2xl"
            >
              <p className="text-base text-graphite-light leading-relaxed">
                This is the founding principle of ELIZIUM AI — and the lens through
                which every creative, technical and commercial decision is made.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HUMAN EMOTION IMAGE ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={scaleIn}
        className="relative aspect-[21/9] w-full overflow-hidden"
      >
        <Image
          src="/images/elysium-ai/dark/10-visual-gallery-worlds.webp"
          alt="Visual Worlds — Elizium AI Vision"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-porcelain/20 via-transparent to-porcelain/20" />
      </motion.div>

      {/* ── THE ARGUMENT ── */}
      <section className="bg-porcelain py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionLabel text="The Argument" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-8 flex flex-col gap-8"
            >
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl font-light tracking-tight text-graphite leading-relaxed"
              >
                ELIZIUM AI positions artificial intelligence not only as a production
                tool, but as the subject of a live cultural encounter.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base text-graphite-light leading-relaxed">
                The company uses immersive entertainment to make the human relationship
                with AI visible, spatial and emotionally immediate — creating a new
                category of live experience at the intersection of creative technology,
                performance and cultural relevance.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base text-graphite-light leading-relaxed">
                Most of the industry is reaching for AI as a production tool — a way
                to cut costs, generate assets, automate processes. ELIZIUM AI takes
                a different position: AI is the most significant subject matter of
                our time, and live entertainment is the right format to explore it.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base text-graphite-light leading-relaxed">
                The result is a platform designed for launch, licensing and global
                expansion — with a flagship experience already in development.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="bg-porcelain py-20 lg:py-26">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-4 mb-12"
          >
            <SectionLabel text="Design Principles" animate={false} />
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-light tracking-tight text-graphite"
            >
              What we believe.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-silver-light">
            {PRINCIPLES.map((p) => (
              <motion.div
                key={p.number}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="bg-pearl p-10 flex flex-col gap-4"
              >
                <span className="text-[10px] tracking-ultrawide text-violet-muted uppercase font-medium">
                  {p.number}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-graphite">
                  {p.title}
                </h3>
                <p className="text-sm text-graphite-light leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET CONTEXT ── */}
      <section className="bg-porcelain py-20 lg:py-26">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <SectionLabel text="Market Opportunity" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                A new category of live experience.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed">
                The global live experience market is undergoing fundamental change.
                Audiences are seeking meaningful, singular, non-repeatable encounters
                that no screen can replicate.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
                ELIZIUM AI sits at the intersection of three converging forces:
                the maturation of AI technology, the post-pandemic premium on
                live presence, and the cultural appetite for new formats.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
                We are not competing with existing formats. We are creating a
                new one.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="relative aspect-[4/3]"
            >
              <Image
                src="/images/elysium-ai/dark/08-company-infrastructure.webp"
                alt="Elizium AI Infrastructure"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LONDON LINE ── */}
      <section className="bg-pearl py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="flex items-center gap-8"
          >
            <span className="text-2xl md:text-3xl font-light tracking-tight text-graphite">
              Designed in London. Built to travel.
            </span>
            <span className="hidden md:block flex-1 h-px bg-silver-light" />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-porcelain py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <CTASection
            label="Private Access"
            headline="Interested in the vision behind Elizium AI?"
            body="For investors, strategic advisors and cultural partners who want to understand where we're going — and why now."
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
