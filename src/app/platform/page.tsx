"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import PageIntro from "@/components/ui/PageIntro";
import PlatformCard from "@/components/ui/PlatformCard";
import FeatureGrid from "@/components/ui/FeatureGrid";
import CTASection from "@/components/ui/CTASection";

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

export default function PlatformPage() {
  return (
    <>
      {/* ── PAGE INTRO ── */}
      <section className="bg-porcelain pt-40 pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <PageIntro
            label="The Platform"
            headline="A modular creative-tech platform for AI-powered immersive entertainment."
            subheadline="ELIZIUM AI brings together AI-assisted creative systems, immersive visual architecture, audience interaction, robotics and scalable show logic into a single deployable format."
          />
        </div>
      </section>

      {/* ── FULL-BLEED IMAGE ── */}
      <section className="bg-porcelain pb-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={scaleIn}
          className="relative aspect-[21/9] w-full overflow-hidden"
        >
          <Image
            src="/images/elysium-ai/dark/02-platform-overview-stage.webp"
            alt="Elizium AI Platform — Stage Overview"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-porcelain/20 to-transparent" />
        </motion.div>
      </section>

      {/* ── PLATFORM COMPONENTS ── */}
      <section className="bg-porcelain py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-4 mb-16"
          >
            <SectionLabel text="Architecture" animate={false} />
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-light tracking-tight text-graphite max-w-xl"
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

      {/* ── PLATFORM SYSTEM IMAGE ── */}
      <section className="bg-pearl py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="relative aspect-square"
            >
              <Image
                src="/images/elysium-ai/dark/04-technology-layer-interface.webp"
                alt="Elizium AI Technology Layer"
                fill
                className="object-contain lg:object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <SectionLabel text="System Design" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                Designed for production. Built for scale.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed">
                Every component of the ELIZIUM AI platform is designed with
                deployment in mind. From single-venue pilots to multi-territory
                licensing arrangements — the system is modular, documented and
                ready to operate at scale.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
                Technical specifications, venue requirements and licensing
                frameworks are available to qualified partners and venue operators
                on request.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 text-[11px] tracking-superwide uppercase font-medium text-graphite hover:text-graphite-mid transition-colors group"
                >
                  Request Technical Briefing
                  <span className="w-8 h-px bg-graphite group-hover:w-12 transition-all duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ROBOTICS SECTION ── */}
      <section className="bg-porcelain py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-6 order-2 lg:order-1"
            >
              <SectionLabel text="Robotics & AI Embodiment" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                Artificial intelligence. Physical presence.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed">
                The ELIZIUM AI platform integrates robotic systems that give
                artificial intelligence a physical form on stage — enabling
                moments of genuine, unrepeatable encounter between human and
                machine at the centre of each experience.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="relative aspect-square lg:aspect-[3/4] order-1 lg:order-2"
            >
              <Image
                src="/images/elysium-ai/dark/08-company-infrastructure.webp"
                alt="AI Infrastructure — Elizium AI"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURE GRID ── */}
      <section className="bg-pearl py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
            className="flex flex-col gap-4 mb-12"
          >
            <SectionLabel text="Platform Properties" animate={false} />
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-light tracking-tight text-graphite"
            >
              Built for the real world.
            </motion.h2>
          </motion.div>
          <FeatureGrid items={FEATURE_ITEMS} columns={4} light />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-porcelain py-28 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
