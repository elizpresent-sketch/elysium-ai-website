"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS — same system as homepage
// ─────────────────────────────────────────────────────────────────────────────
const W = "max-w-[1440px] mx-auto px-6 lg:px-12";
const BG = "#050505";

// ─────────────────────────────────────────────────────────────────────────────
// FADE IMAGE — identical to homepage component
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
  src, alt, className = "", position = "center center",
  fadeLeft = 0, fadeRight = 0, fadeTop = 10, fadeBottom = 10,
  sizes = "100vw", priority = false,
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

// Section heading rule
function SectionHead({ label, num }: { label: string; num: string }) {
  return (
    <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
      <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">{label}</span>
      <span className="text-[9px] tracking-[0.36em] font-normal text-[#6B7278]/40">{num}</span>
    </div>
  );
}

function Rule() {
  return <div className="h-px w-8 bg-[#1C2530]/60" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function FutureHumanPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          HERO — s2.png portal / AI face composition
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: BG }}>

        {/* Full-bleed image — s2.png: portal, AI face, figure */}
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/future-human-hero-portal.png"
            alt=""
            fill priority
            className="object-cover"
            style={{ objectPosition: "68% center" }}
            sizes="100vw"
            aria-hidden
          />
          {/* Left text-protection gradient — fades to transparent so portal/figure shows right */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(105deg, ${BG} 0%, ${BG} 16%, rgba(5,5,5,0.80) 32%, rgba(5,5,5,0.20) 52%, transparent 68%)`
          }} />
          {/* Top + bottom fade */}
          <div className="absolute inset-x-0 top-0 h-48"
            style={{ background: `linear-gradient(to bottom, ${BG} 0%, ${BG} 8%, rgba(5,5,5,0.65) 55%, transparent 100%)` }} />
          <div className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: `linear-gradient(to top, ${BG} 0%, rgba(5,5,5,0.75) 55%, transparent 100%)` }} />
        </div>

        {/* Hero content */}
        <div className={`relative z-10 flex-1 flex items-center w-full ${W} pt-24 pb-8 lg:pt-32 lg:pb-14`}>
          <div className="w-full lg:max-w-[560px]">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col gap-6">

              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <span className="text-[8.5px] tracking-[0.38em] uppercase font-medium text-[#7B8188] flex items-center gap-3">
                  <span className="w-5 h-px bg-[#7B8188]/55" />
                  Flagship Experience · London
                </span>
                <div className="w-8 h-px bg-[#1C2530]/60" />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(2.4rem, 6vw, 5.75rem)" }}
              >
                Future
                <br />Human
              </motion.h1>

              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[400px]">
                The first ELIZIUM AI experience — staging the emotional encounter
                between humanity and artificial intelligence.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#E2E8EE]/70 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300">
                  Request Private Access <span className="w-4 h-px bg-current" />
                </Link>
                <Link href="/platform"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#1C2530]/55 text-[#969CA2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300">
                  Explore the Platform
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Status strip */}
        <div className="relative z-10 border-t border-[#1C2530]/50"
          style={{ background: "rgba(5,5,5,0.92)", backdropFilter: "blur(14px)" }}>
          <div className={`${W} py-3`}>
            <div className="flex items-center gap-6">
              <span className="text-[8px] tracking-[0.38em] uppercase font-semibold text-[#7B8188] whitespace-nowrap">
                Flagship Experience
              </span>
              <span className="hidden sm:block w-px h-3 bg-[#1C2530]" />
              <div className="flex flex-wrap gap-x-6 gap-y-1">
                {["AI-Human Interaction", "Immersive Environments", "Live Audience Systems", "London Launch"].map((t) => (
                  <span key={t} className="text-[7.5px] tracking-[0.22em] uppercase text-[#7B8188]">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          01 — THE CONCEPT
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="The Concept" num="01" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start">
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-5 flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                First Flagship London Experience
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                A New
                <br />Format
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed">
                FUTURE HUMAN is the first flagship London experience built to
                demonstrate the ELIZIUM AI platform.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed">
                It stages the emotional encounter between humanity and artificial
                intelligence through immersive visuals, live audience interaction and
                a robotic AI presence.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed">
                Future Human is not a concert. It is not a theatre show. It is not a
                museum installation. It is a new format — designed from first
                principles for the age of intelligent experience.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-7 flex flex-col"
            >
              {[
                { n: "01", label: "AI-Human Interaction",    desc: "Real encounters between human audiences and artificial intelligence." },
                { n: "02", label: "Emotional Storytelling",  desc: "Narrative architecture designed to surface authentic emotional response." },
                { n: "03", label: "Live Performance",        desc: "Not recorded. Not simulated. Live and unrepeatable every time." },
                { n: "04", label: "Immersive Environment",   desc: "Spatial design that makes the AI relationship visible and physical." },
                { n: "05", label: "Proof-of-Concept Platform", desc: "The first deployment of the scalable ELIZIUM AI platform." },
              ].map((item) => (
                <motion.div key={item.n} variants={fadeUp}
                  className="flex items-start gap-5 py-4 border-t border-[#1C2530]/40">
                  <span className="text-[7.5px] tracking-[0.38em] uppercase text-[#6B7278]/28 font-medium flex-shrink-0 pt-0.5">{item.n}</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9.5px] tracking-[0.25em] uppercase text-[#969CA2] font-medium">{item.label}</span>
                    <span className="text-[13px] text-[#707880] leading-snug">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-[#1C2530]/40" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          02 — HUMAN EMOTION
          NOTE: Replace 11-team-visionaries.webp with a new portrait
          image once regenerated (suggested: a close human face/emotion
          portrait matching the dark cinematic palette).
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="Human Emotion" num="02" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                The Human Response Is the Performance
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                AI is not
                <br />the show.
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Future Human is built around a central provocation: AI is not the
                show — the human response is. Every design decision, from spatial
                layout to AI behaviour to lighting logic, is engineered to
                surface authentic emotional response.
              </motion.p>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden">
                <FadeImage
                  src="/images/elysium-ai/dark/01-hero-ai-human-portrait.png"
                  alt="Human Emotion — Future Human"
                  className="aspect-[4/3]"
                  position="center 30%"
                  fadeLeft={6} fadeTop={6} fadeBottom={6} fadeRight={4}
                  sizes="100vw"
                  loading="eager"
                />
              </motion.div>

              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                The result is a live experience that is different every time it
                runs — because the audience is different every time.
              </motion.p>
            </motion.div>

            {/* Desktop-only image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block"
            >
              <FadeImage
                src="/images/elysium-ai/dark/01-hero-ai-human-portrait.png"
                alt="Human Emotion — Future Human"
                className="aspect-[4/3]"
                position="center 30%"
                fadeLeft={6} fadeTop={6} fadeBottom={6} fadeRight={4}
                sizes="50vw"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          03 — AI PRESENCE
          Uses creatingworlds.png (corrected/cropped stage scene).
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="AI Presence" num="03" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 items-center">
            {/* Desktop-only image — left for alternating rhythm */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block lg:order-1"
            >
              <FadeImage
                src="/images/elysium-ai/dark/private-access-standing-new.png"
                alt="AI Presence — Future Human"
                className="aspect-[4/3]"
                position="center center"
                fadeLeft={3} fadeTop={3} fadeBottom={3} fadeRight={3}
                sizes="50vw"
                objectFit="contain"
                loading="eager"
              />
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4 lg:gap-5 lg:order-2"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                Intelligence with a Physical Form
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Artificial
                <br />Intelligence.
                <br />Physical Presence.
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                At the centre of FUTURE HUMAN is a robotic AI presence — an embodied
                figure through which the audience encounters artificial intelligence as
                something spatial, physical and emotionally immediate.
              </motion.p>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden">
                <FadeImage
                  src="/images/elysium-ai/dark/private-access-standing-new.png"
                  alt="AI Presence — Future Human"
                  className="aspect-[4/3]"
                  position="center center"
                  fadeLeft={3} fadeTop={3} fadeBottom={3} fadeRight={3}
                  sizes="100vw"
                  objectFit="contain"
                  loading="eager"
                />
              </motion.div>

              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Rather than presenting AI as software on a screen, the experience gives
                intelligence a body, a stage and a relationship with the audience.
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-0 mt-1">
                {[
                  { k: "Form",       v: "Physical robotic presence" },
                  { k: "Stage",      v: "Live performance context" },
                  { k: "Response",   v: "Real-time AI reasoning" },
                  { k: "Encounter",  v: "Human-machine relationship" },
                ].map(({ k, v }) => (
                  <div key={k} className="flex flex-col gap-0.5 py-2.5 lg:py-3 border-t border-[#1C2530]/45 pr-4">
                    <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#969CA2] font-medium">{k}</span>
                    <span className="text-[12px] text-[#707880]">{v}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          04 — AUDIENCE INTERACTION
          Uses s4.png (audience silhouette system)
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-8 lg:py-14 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Audience Interaction" num="04" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-4 lg:gap-8 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                Every Audience Changes the Experience
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Beyond
                <br />the Event
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Through opt-in interaction and live response systems, audience input
                becomes part of the visual and narrative architecture of the performance.
              </motion.p>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden">
                <FadeImage
                  src="/images/elysium-ai/dark/audience-system-network-new.png"
                  alt="Audience Interaction — Future Human"
                  className="aspect-[4/3]"
                  position="center center"
                  fadeLeft={0} fadeTop={0} fadeBottom={0} fadeRight={0}
                  sizes="100vw"
                  objectFit="contain"
                />
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-0 mt-1">
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
            </motion.div>

            {/* Desktop-only image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block"
            >
              <FadeImage
                src="/images/elysium-ai/dark/audience-system-network-new.png"
                alt="Audience Interaction — Future Human"
                className="aspect-[4/5]"
                position="center center"
                fadeLeft={0} fadeTop={0} fadeBottom={0} fadeRight={0}
                sizes="50vw"
                objectFit="contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          05 — LONDON LAUNCH
          Uses global-map-pure-black.png
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50 overflow-hidden">
        <div className={W}>
          <SectionHead label="London" num="05" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-4 flex flex-col gap-4 lg:gap-5"
            >
              <motion.span variants={fadeUp} className="text-[8.5px] tracking-[0.38em] uppercase text-[#7B8188] font-medium">
                Designed in London. Built to Travel.
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Premiering
                <br />in London
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                FUTURE HUMAN is developed to launch in London — a global centre for
                creative technology, live experience and cultural innovation. From
                London, the ELIZIUM AI platform is designed to license, adapt and
                travel to venues worldwide.
              </motion.p>

              {/* Mobile-only image */}
              <motion.div variants={scaleIn} className="lg:hidden">
                <FadeImage
                  src="/images/elysium-ai/dark/global-map-pure-black.png"
                  alt="Global Journey — Future Human"
                  className="aspect-[4/3]"
                  position="center center"
                  fadeLeft={0} fadeTop={0} fadeBottom={0} fadeRight={0}
                  sizes="100vw"
                  objectFit="contain"
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-5 py-3 border border-[#1C2530]/55 text-[#C8CDD2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300">
                  Venue Enquiries <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Desktop-only image */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
              className="hidden lg:block lg:col-span-8"
            >
              <FadeImage
                src="/images/elysium-ai/dark/global-map-pure-black.png"
                alt="Global Journey — Future Human"
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

      {/* ══════════════════════════════════════════════════════════════
          06 — PRIVATE ACCESS CTA
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: BG }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <SectionHead label="Private Access" num="06" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-7 flex flex-col gap-4 lg:gap-5"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                For Venues,
                <br />Investors and
                <br />Strategic Partners
              </motion.h2>
              <Rule />
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-lg">
                Pre-production briefings and venue conversations available on request.
                Interested in Future Human as a licensing or venue partner? We are
                selectively engaging partners ahead of the London launch.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#E2E8EE]/70 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300">
                  Request Private Access <span className="w-4 h-px bg-current" />
                </Link>
                <Link href="/platform"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#1C2530]/55 text-[#969CA2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300">
                  Explore the Platform
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
