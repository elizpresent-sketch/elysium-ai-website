"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/ui/CTASection";

// ─── shared constants ────────────────────────────────────────────────────────
const W  = "max-w-[1440px] mx-auto px-6 lg:px-12";
const BG = "#050505";

// ─── FadeImage ───────────────────────────────────────────────────────────────
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
}
function FadeImage({
  src, alt, className = "", position = "center center",
  fadeLeft = 0, fadeRight = 0, fadeTop = 10, fadeBottom = 10,
  sizes = "(max-width: 1024px) 100vw, 55vw", priority = false,
}: FadeImageProps) {
  const layers: string[] = [];
  if (fadeTop > 0)    layers.push(`linear-gradient(to bottom, ${BG} 0%, transparent ${fadeTop}%)`);
  if (fadeBottom > 0) layers.push(`linear-gradient(to top,    ${BG} 0%, transparent ${fadeBottom}%)`);
  if (fadeLeft > 0)   layers.push(`linear-gradient(to right,  ${BG} 0%, transparent ${fadeLeft}%)`);
  if (fadeRight > 0)  layers.push(`linear-gradient(to left,   ${BG} 0%, transparent ${fadeRight}%)`);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill priority={priority}
        className="object-cover" style={{ objectPosition: position }} sizes={sizes} />
      {layers.length > 0 && (
        <div aria-hidden className="absolute inset-0 pointer-events-none z-10"
          style={{ background: layers.join(", ") }} />
      )}
    </div>
  );
}

// ─── data ────────────────────────────────────────────────────────────────────
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

// ─── page ────────────────────────────────────────────────────────────────────
export default function VisionPage() {
  return (
    <>
      {/* ── HERO QUOTE — cinematic full-bleed background, dark overlay, left text ── */}
      <section
        className="relative min-h-[88vh] lg:min-h-screen flex flex-col overflow-hidden"
        style={{ background: BG }}
      >
        {/* Full-bleed background image — fades to black at edges via overlays */}
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/s2.webp"
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "70% center" }}
            sizes="100vw"
            aria-hidden
          />
          {/* Left-protection gradient — keeps quote readable while letting portal show right */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(105deg,
                ${BG} 0%, ${BG} 18%,
                rgba(5,5,5,0.85) 38%,
                rgba(5,5,5,0.40) 60%,
                rgba(5,5,5,0.10) 80%,
                transparent 100%)`,
            }}
          />
          {/* Top fade */}
          <div
            className="absolute inset-x-0 top-0 h-44"
            style={{ background: `linear-gradient(to bottom, ${BG} 0%, ${BG} 8%, rgba(5,5,5,0.65) 55%, transparent 100%)` }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: `linear-gradient(to top, ${BG} 0%, rgba(5,5,5,0.75) 55%, transparent 100%)` }}
          />
        </div>

        {/* Content — strict left column overlay */}
        <div className={`relative z-10 flex-1 flex items-center w-full ${W} pt-24 pb-12 lg:pt-32 lg:pb-20`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="w-full lg:max-w-[640px] flex flex-col gap-6 lg:gap-8"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.28em] uppercase font-medium text-[#8E949A]"
            >
              <span className="w-6 h-px bg-[#8E949A]" />
              Vision
            </motion.span>

            <motion.blockquote
              variants={fadeUp}
              className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE]"
              style={{ fontSize: "clamp(1.7rem, 4vw, 3.4rem)" }}
            >
              AI is not the show.
              <br />
              <span className="text-[#6B7278]">The human response is.</span>
            </motion.blockquote>

            <motion.div
              variants={fadeUp}
              className="pt-4 border-t border-[#1C2530] max-w-xl"
            >
              <p className="text-[13px] text-[#AAB0B6] leading-relaxed">
                This is the founding principle of ELIZIUM AI — and the lens through
                which every creative, technical and commercial decision is made.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THE ARGUMENT ── */}
      <section className="bg-porcelain py-10 lg:py-20">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
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
                className="font-display font-normal uppercase tracking-[0.07em] leading-[1.05] text-xl md:text-2xl text-[#E2E8EE]"
              >
                ELIZIUM AI positions artificial intelligence not only as a production
                tool, but as the subject of a live cultural encounter.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13px] text-[#AAB0B6] leading-relaxed">
                The company uses immersive entertainment to make the human relationship
                with AI visible, spatial and emotionally immediate — creating a new
                category of live experience at the intersection of creative technology,
                performance and cultural relevance.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13px] text-[#AAB0B6] leading-relaxed">
                Most of the industry is reaching for AI as a production tool — a way
                to cut costs, generate assets, automate processes. ELIZIUM AI takes
                a different position: AI is the most significant subject matter of
                our time, and live entertainment is the right format to explore it.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13px] text-[#AAB0B6] leading-relaxed">
                The result is a platform designed for launch, licensing and global
                expansion — with a flagship experience already in development.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="bg-porcelain py-10 lg:py-20">
        <div className={W}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-4 mb-8 lg:mb-12"
          >
            <SectionLabel text="Design Principles" animate={false} />
            <motion.h2
              variants={fadeUp}
              className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE]"
              style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.6rem)" }}
            >
              What we believe.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1C2530]">
            {PRINCIPLES.map((p) => (
              <motion.div
                key={p.number}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="bg-[#080808] p-10 flex flex-col gap-4"
              >
                <span className="text-[10px] tracking-[0.28em] text-[#6B7278] uppercase font-medium">
                  {p.number}
                </span>
                <h3 className="font-display font-normal uppercase tracking-[0.11em] leading-[0.97] text-lg text-[#E2E8EE]">
                  {p.title}
                </h3>
                <p className="text-[13px] text-[#AAB0B6] leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKET CONTEXT ── */}
      <section className="bg-porcelain py-10 lg:py-20">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-5 lg:gap-6"
            >
              <SectionLabel text="Market Opportunity" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE]"
                style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.6rem)" }}
              >
                A new category of live experience.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                The global live experience market is undergoing fundamental change.
                Audiences are seeking meaningful, singular, non-repeatable encounters
                that no screen can replicate.
              </motion.p>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden">
                <FadeImage
                  src="/images/elysium-ai/dark/11about.webp"
                  alt="Elizium AI — Market Landscape"
                  className="aspect-[4/3]"
                  position="center 40%"
                  fadeLeft={6} fadeTop={6} fadeBottom={6} fadeRight={4}
                  sizes="100vw"
                />
              </motion.div>

              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                ELIZIUM AI sits at the intersection of three converging forces:
                the maturation of AI technology, the post-pandemic premium on
                live presence, and the cultural appetite for new formats.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                We are not competing with existing formats. We are creating a
                new one.
              </motion.p>
            </motion.div>

            {/* Desktop-only image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="hidden lg:block"
            >
              <FadeImage
                src="/images/elysium-ai/dark/11about.webp"
                alt="Elizium AI — Market Landscape"
                className="aspect-[4/3]"
                position="center 40%"
                fadeLeft={6} fadeTop={6} fadeBottom={6} fadeRight={4}
                sizes="58vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LONDON LINE ── */}
      <section className="bg-[#080808] py-10 lg:py-20 border-t border-b border-[#1C2530]">
        <div className={W}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="flex items-center gap-8"
          >
            <span className="font-display font-normal uppercase tracking-[0.11em] leading-[0.97] text-2xl md:text-3xl text-[#E2E8EE]">
              Designed in London. Built to travel.
            </span>
            <span className="hidden md:block flex-1 h-px bg-[#1C2530]" />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-porcelain py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
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
