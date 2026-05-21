"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import PlatformCard from "@/components/ui/PlatformCard";
import FeatureGrid from "@/components/ui/FeatureGrid";
import CTASection from "@/components/ui/CTASection";

// ─── shared constants ────────────────────────────────────────────────────────
const W   = "max-w-[1440px] mx-auto px-6 lg:px-12";
const BG  = "#050505";

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
  objectFit?: "cover" | "contain";
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

// ─── data ────────────────────────────────────────────────────────────────────
const PLATFORM_COMPONENTS = [
  {
    tag: "Layer 01",
    title: "AI-Assisted Creative Systems",
    description:
      "Generative and responsive AI tools that shape narrative, visual output and real-time show direction — adapting to audience behaviour, environmental variables and creative intent.",
  },
  {
    tag: "Layer 02",
    title: "Immersive Visual Architecture",
    description:
      "High-resolution projection mapping, volumetric display and spatial light design engineered to transform any venue into an inhabited world.",
  },
  {
    tag: "Layer 03",
    title: "Live Audience Interaction",
    description:
      "Real-time audience data capture and response systems that make every attendee an active participant in the experience — not a passive observer.",
  },
  {
    tag: "Layer 04",
    title: "Robotic AI Presence",
    description:
      "Physical robotic systems that embody artificial intelligence on stage — creating moments of genuine encounter between human and machine.",
  },
  {
    tag: "Layer 05",
    title: "Scalable Show Logic",
    description:
      "A modular technical and creative framework that allows the platform to be adapted, licensed and deployed across venues, territories and formats.",
  },
  {
    tag: "Layer 06",
    title: "Global Licensing Format",
    description:
      "A production-ready framework designed for international rollout — built with venue operators, promoters and creative institutions in mind.",
  },
];

const FEATURE_ITEMS = [
  {
    label: "Deployment",
    title: "Venue-Agnostic",
    description: "Configurable for black box theatres, arenas, museums, and purpose-built installations.",
  },
  {
    label: "Technology",
    title: "Real-Time AI",
    description: "Live inference, generative response and adaptive show logic running in production environments.",
  },
  {
    label: "Format",
    title: "Licensable",
    description: "A turnkey creative and technical package designed for partners, promoters and venue operators.",
  },
  {
    label: "Scalability",
    title: "Global Ready",
    description: "Engineered from day one for international deployment, cultural adaptation and multi-territory operation.",
  },
];

// ─── page ────────────────────────────────────────────────────────────────────
export default function PlatformPage() {
  return (
    <>
      {/* ── HERO — full-bleed cinematic background, left text overlay ── */}
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: BG }}
      >
        {/* Cinematic background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/creatingworlds.png"
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "65% center" }}
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

        {/* Content */}
        <div className={`relative z-10 flex-1 flex items-center w-full ${W} pt-24 pb-8 lg:pt-32 lg:pb-14`}>
          <div className="w-full lg:max-w-[560px]">
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
                Modular.
                <br />AI-powered.
                <br />Immersive.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[400px]">
                ELIZIUM AI brings together AI-assisted creative systems, immersive visual
                architecture, audience interaction and scalable show logic into a single
                deployable platform.
              </motion.p>
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
                  See Future Human
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* ── PLATFORM LABEL STRIP ── */}
      <div
        className="border-t border-[#1C2530]/50"
        style={{ background: BG }}
      >
        <div className={`${W} py-3`}>
          <div className="flex items-center gap-6">
            <span className="text-[8px] tracking-[0.38em] uppercase font-semibold text-[#7B8188] whitespace-nowrap">
              The Platform
            </span>
            <span className="hidden sm:block w-px h-3 bg-[#1C2530]" />
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {["Modular Architecture", "AI-Powered Systems", "Global Deployment", "Live Interaction"].map((t) => (
                <span key={t} className="text-[7.5px] tracking-[0.22em] uppercase text-[#7B8188]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PLATFORM COMPONENTS ── */}
      <section className="bg-porcelain py-10 lg:py-20">
        <div className={W}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-4 mb-8 lg:mb-14"
          >
            <SectionLabel text="Architecture" animate={false} />
            <motion.h2
              variants={fadeUp}
              className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE] max-w-xl"
              style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.6rem)" }}
            >
              Six integrated layers. One coherent system.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-silver-light">
            {PLATFORM_COMPONENTS.map((card) => (
              <PlatformCard key={card.tag} {...card} light />
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM DESIGN ── */}
      <section className="bg-pearl py-10 lg:py-20">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-5 lg:gap-6"
            >
              <SectionLabel text="System Design" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE]"
                style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.6rem)" }}
              >
                Designed for production. Built for scale.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Every component of the ELIZIUM AI platform is designed with
                deployment in mind. From single-venue pilots to multi-territory
                licensing arrangements — the system is modular, documented and
                ready to operate at scale.
              </motion.p>

              {/* Mobile-only vertical tech element — portrait, full visibility, blends to black */}
              <motion.div variants={scaleIn} className="lg:hidden flex justify-center">
                <div className="relative aspect-[3/4] w-full max-w-[360px]">
                  <Image
                    src="/images/elysium-ai/dark/tech-final.png"
                    alt="Elizium AI — Technology System"
                    fill
                    className="object-contain"
                    sizes="360px"
                  />
                </div>
              </motion.div>

              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Technical specifications, venue requirements and licensing
                frameworks are available to qualified partners and venue operators
                on request.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-[11px] tracking-[0.2em] uppercase font-medium text-[#E2E8EE] hover:text-[#8E949A] transition-colors group"
                >
                  Request Technical Briefing
                  <span className="w-8 h-px bg-[#E2E8EE] group-hover:w-12 transition-all duration-300" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Desktop-only vertical tech element — portrait container, object-contain, sits on pure black */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="hidden lg:flex justify-center"
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
        </div>
      </section>

      {/* ── ROBOTICS ── */}
      <section className="bg-porcelain py-10 lg:py-20 overflow-hidden">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_8fr] gap-6 lg:gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-5 lg:gap-6"
            >
              <SectionLabel text="Robotics & AI Embodiment" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE]"
                style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.6rem)" }}
              >
                Artificial intelligence. Physical presence.
              </motion.h2>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden">
                <FadeImage
                  src="/images/elysium-ai/dark/creatingworlds.png"
                  alt="AI Presence on Stage — Elizium AI"
                  className="aspect-[4/3]"
                  position="center center"
                  fadeRight={0} fadeTop={0} fadeBottom={0} fadeLeft={0}
                  sizes="100vw"
                  objectFit="contain"
                />
              </motion.div>

              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                The ELIZIUM AI platform integrates robotic systems that give
                artificial intelligence a physical form on stage — enabling
                moments of genuine, unrepeatable encounter between human and
                machine at the centre of each experience.
              </motion.p>
            </motion.div>

            {/* Desktop-only image — wider column, full image visible */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="hidden lg:block"
            >
              <FadeImage
                src="/images/elysium-ai/dark/creatingworlds.png"
                alt="AI Presence on Stage — Elizium AI"
                className="aspect-[4/3]"
                position="center center"
                fadeRight={0} fadeTop={0} fadeBottom={0} fadeLeft={0}
                sizes="66vw"
                objectFit="contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURE GRID ── */}
      <section className="bg-pearl py-10 lg:py-20">
        <div className={W}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-4 mb-8 lg:mb-12"
          >
            <SectionLabel text="Platform Properties" animate={false} />
            <motion.h2
              variants={fadeUp}
              className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-[#E2E8EE]"
              style={{ fontSize: "clamp(1.6rem, 3.6vw, 3.6rem)" }}
            >
              Built for the real world.
            </motion.h2>
          </motion.div>
          <FeatureGrid items={FEATURE_ITEMS} columns={4} light />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-porcelain py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <CTASection
            label="Private Access"
            headline="Request a platform briefing or licensing conversation."
            body="For venues, promoters, investors and strategic partners. All enquiries reviewed by the Elizium AI core team."
            primaryHref="/contact"
            primaryLabel="Request Private Access"
            secondaryHref="/future-human"
            secondaryLabel="See Future Human"
          />
        </div>
      </section>
    </>
  );
}
