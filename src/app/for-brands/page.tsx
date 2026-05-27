"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import EmotionalSpacesGrid from "@/components/ui/EmotionalSpacesGrid";
import PrivateAccessStrip from "@/components/ui/PrivateAccessStrip";

const BG = "#050505";
const W = "max-w-[1440px] mx-auto px-6 lg:px-12";

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

const CAPABILITIES = [
  {
    tag: "01",
    title: "Emotional Data",
    body: "Real-time sensing and mapping of collective audience emotional state — delivered as a live dashboard and post-event archive.",
    live: true,
    status: "Live",
  },
  {
    tag: "02",
    title: "Immersive Brand Spaces",
    body: "Spatial, sensory and AI-responsive environments designed to embody brand identity and generate lasting emotional memory.",
    live: false,
    status: "By Commission",
  },
  {
    tag: "03",
    title: "Audience Response Systems",
    body: "Participatory interaction layers that make every attendee an active signal in the brand experience — not a passive observer.",
    live: false,
    status: "By Commission",
  },
  {
    tag: "04",
    title: "Narrative Intelligence",
    body: "AI-assisted creative direction that adapts show logic, visual output and content in response to live emotional signals.",
    live: false,
    status: "By Commission",
  },
  {
    tag: "05",
    title: "Experience Intelligence",
    body: "Structured post-event reporting on emotional peaks, collective response patterns and signal integrity across the audience.",
    live: false,
    status: "By Commission",
  },
  {
    tag: "06",
    title: "Strategic Partnership",
    body: "Long-form collaboration frameworks for brands, agencies and institutions seeking ongoing access to the ELIZIUM platform.",
    live: false,
    status: "By Inquiry",
  },
];

export default function ForBrandsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: BG }} className="pt-24 pb-16 lg:pt-36 lg:pb-24">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              For Brands &amp; Partners
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-7 flex flex-col gap-6"
            >
              <motion.h1
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.8rem, 4vw, 4rem)" }}
              >
                Emotional intelligence for future-facing brand experiences.
              </motion.h1>
              <div className="h-px w-8 bg-[#1C2530]/60" />
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[480px]">
                ELIZIUM integrates AI-driven emotional sensing and immersive architecture into
                brand experiences — creating measurable emotional engagement at the intersection
                of technology, space and audience.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[480px]">
                For brands and partners seeking to move beyond conventional activation, ELIZIUM
                offers a platform that reads, shapes and archives the emotional response of
                every participant.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
                >
                  Private Inquiry <span className="w-4 h-px bg-current" />
                </Link>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-px" style={{ background: "rgba(28,37,48,0.6)" }}>
                {[
                  { k: "Emotional Dimensions", v: "5" },
                  { k: "Live Capture",          v: "Real-Time" },
                  { k: "Signal Cycle",          v: "24-Hour" },
                ].map(({ k, v }) => (
                  <div key={k} className="flex flex-col gap-0.5 px-3 py-2.5" style={{ background: BG }}>
                    <span className="text-[7px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">{k}</span>
                    <span className="font-display font-normal uppercase text-[#E2E8EE] leading-none tracking-[0.06em]" style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)" }}>{v}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="hidden lg:block lg:col-span-5"
            >
              <FadeImage
                src="/images/elysium-ai/dark/generated/partner-platform-wave-room.webp"
                alt="ELIZIUM — Brand Partnership"
                className="aspect-[4/5]"
                position="center center"
                fadeLeft={10} fadeTop={8} fadeBottom={8} fadeRight={6}
                sizes="42vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY EMOTIONAL INTELLIGENCE ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              Why Emotional Intelligence
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-4 lg:gap-5"
            >
              <motion.h2
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2.8rem)" }}
              >
                The emotional signal is the rarest form of audience intelligence.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Conventional analytics measure what audiences do. ELIZIUM records what they feel.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Every ELIZIUM deployment captures collective emotional response in real time —
                anxiety, interest, trust, discomfort, presence — mapped against the AI-human
                encounter at the centre of the experience. For brand partners, this produces a
                new category of audience intelligence: not survey-based, not inferred, but live
                and direct.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                The result is not an activation. It is a proof of emotional relationship between
                a brand and its audience — structured, archived and repeatable.
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
                {
                  label: "Live Capture",
                  value: "Real Time",
                  desc: "Emotional responses recorded in the moment of encounter — not recalled or surveyed afterwards",
                },
                {
                  label: "Signal Depth",
                  value: "5 Dimensions",
                  desc: "Anxiety, interest, trust, discomfort and presence — mapped individually and collectively",
                },
                {
                  label: "Output",
                  value: "Structured",
                  desc: "Every deployment produces a data archive, pattern report and strategic insight document",
                },
              ].map(({ label, value, desc }) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  className="flex flex-col gap-1.5 py-5 border-t border-[#1C2530]/45"
                >
                  <span className="text-[8.5px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">{label}</span>
                  <span className="font-display font-normal uppercase text-[#E2E8EE] leading-none tracking-[0.06em]"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                    {value}
                  </span>
                  <span className="text-[12px] text-[#7B8188] leading-snug">{desc}</span>
                </motion.div>
              ))}
              <div className="border-t border-[#1C2530]/45" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── EMOTIONAL SPACES ── */}
      <section style={{ background: BG }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              Emotional Spaces
            </span>
          </div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="text-[13.5px] text-[#7B8188] leading-relaxed max-w-[600px] mb-8"
          >
            The six emotional territories that define AI-human encounter. ELIZIUM measures,
            maps and archives audience response across all six — creating a structured record
            of collective emotional state.
          </motion.p>
          <EmotionalSpacesGrid />
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              Capabilities
            </span>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: "rgba(28,37,48,0.6)" }}
          >
            {CAPABILITIES.map(({ tag, title, body, live, status }) => (
              <motion.div
                key={tag}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="flex flex-col gap-3 p-5 lg:p-6"
                style={{ background: BG }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] tracking-[0.3em] uppercase text-[#6B7278] font-medium">{tag}</span>
                  <span className={`flex items-center gap-1.5 text-[7.5px] tracking-[0.2em] uppercase font-medium ${live ? "text-[#4ADE80]" : "text-[#3B4550]"}`}>
                    <span className={`w-1 h-1 rounded-full flex-shrink-0 ${live ? "bg-[#4ADE80]" : "bg-[#3B4550]"}`} />
                    {status}
                  </span>
                </div>
                <span className="text-[12px] tracking-[0.08em] uppercase text-[#C8CDD2] font-medium">
                  {title}
                </span>
                <p className="text-[13px] text-[#7B8188] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGET PARTNERS ── */}
      <section style={{ background: BG }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              Target Partners
            </span>
          </div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="text-[13.5px] text-[#7B8188] leading-relaxed max-w-[600px] mb-8"
          >
            ELIZIUM works with forward-facing organisations for whom emotional intelligence
            and AI-human experience represent genuine strategic territory.
          </motion.p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "rgba(28,37,48,0.6)" }}
          >
            {[
              { tag: "01", label: "AI Companies",          desc: "Demonstrate AI capabilities through live human emotional encounter" },
              { tag: "02", label: "Luxury Brands",         desc: "Premium immersive experiences with real emotional depth and audience intelligence" },
              { tag: "03", label: "Automotive",            desc: "Spatial experiences connecting technology to human feeling and embodied response" },
              { tag: "04", label: "Fashion-Tech",          desc: "Installations at the intersection of culture, technology and AI-human systems" },
              { tag: "05", label: "Exhibitions & Museums", desc: "Live audience signal experiences for cultural institutions and public exhibitions" },
              { tag: "06", label: "Technology Companies",  desc: "AI-human interaction as brand activation — live proof of intelligent systems" },
              { tag: "07", label: "Premium Real Estate",   desc: "Signature experiences for launches, developments and bespoke environments" },
              { tag: "08", label: "Finance & Future-Tech", desc: "Forward-positioning experiences for institutional brands and innovation platforms" },
            ].map(({ tag, label, desc }) => (
              <motion.div
                key={tag}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="flex flex-col gap-2.5 p-5 lg:p-6"
                style={{ background: BG }}
              >
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#6B7278] font-medium">{tag}</span>
                <span className="text-[11px] tracking-[0.1em] uppercase text-[#C8CDD2] font-medium leading-snug">{label}</span>
                <p className="text-[12px] text-[#7B8188] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER INTELLIGENCE OUTPUT ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              Partner Intelligence Output
            </span>
          </div>
          <motion.p
            initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
            className="text-[13.5px] text-[#7B8188] leading-relaxed max-w-[600px] mb-8"
          >
            Every ELIZIUM deployment delivers a structured intelligence package to brand partners post-event.
          </motion.p>
          <div className="flex flex-col">
            {[
              { id: "01", label: "Emotional Archive",          format: "Structured Data",  desc: "Full timestamped record of collective audience emotional response — reaction distributions per signal, temporal patterns, aggregate state" },
              { id: "02", label: "Collective Response Report",  format: "PDF / Data Export", desc: "Pattern analysis identifying dominant emotions, inflection points and peak response moments across the full audience session" },
              { id: "03", label: "Insight Document",            format: "Strategic Brief",   desc: "AI-assisted interpretation of the emotional signal — what it means, what it predicts and what it implies for the brand relationship" },
              { id: "04", label: "Experience Data",             format: "Live + Archive",    desc: "Session-level data on audience interaction depth, response volume and signal integrity across each deployment" },
            ].map(({ id, label, format, desc }) => (
              <motion.div key={id}
                initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
                className="grid grid-cols-[2.5rem_1fr] lg:grid-cols-[4rem_16rem_1fr_9rem] gap-x-5 lg:gap-x-8 items-start py-4 border-t border-[#1C2530]/50"
              >
                <span className="text-[9px] tracking-[0.3em] font-normal text-[#6B7278]/50 pt-0.5">{id}</span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#C8CDD2] font-medium pt-0.5">{label}</span>
                <p className="col-start-2 lg:col-start-3 text-[12.5px] text-[#7B8188] leading-relaxed mt-1 lg:mt-0">{desc}</p>
                <span className="hidden lg:block text-[7.5px] tracking-[0.2em] uppercase text-[#4B5560] font-medium text-right pt-0.5">{format}</span>
              </motion.div>
            ))}
            <div className="border-t border-[#1C2530]/50" />
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP FORMATS ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-16 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              Partnership Formats
            </span>
          </div>
          <div className="flex flex-col">
            {[
              {
                n: "01",
                title: "Sponsorship / Cultural Partnership",
                body: "Brand association with ELIZIUM experiences and platform — cultural positioning, audience visibility and co-branding within immersive environments.",
                output: "Co-Branding + Visibility",
              },
              {
                n: "02",
                title: "Co-Commissioned Experience",
                body: "A bespoke ELIZIUM experience developed in collaboration with a brand partner — full creative integration, dedicated audience data and emotional intelligence output.",
                output: "Full Data Archive",
              },
              {
                n: "03",
                title: "Emotional Insight Access",
                body: "Access to structured post-event emotional data, collective response patterns and audience signal reports from ELIZIUM deployments.",
                output: "Reports + Signal Data",
              },
            ].map(({ n, title, body, output }) => (
              <motion.div
                key={n}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="grid grid-cols-[2.5rem_1fr] lg:grid-cols-[4rem_16rem_1fr_10rem] gap-x-5 lg:gap-x-10 items-start py-6 border-t border-[#1C2530]/50"
              >
                <span className="text-[9px] tracking-[0.3em] font-normal text-[#6B7278]/50 pt-0.5">{n}</span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#C8CDD2] font-medium pt-0.5">{title}</span>
                <p className="col-start-2 lg:col-start-3 text-[13px] text-[#7B8188] leading-relaxed mt-2 lg:mt-0">{body}</p>
                <span className="hidden lg:block text-[7.5px] tracking-[0.2em] uppercase text-[#4B5560] font-medium text-right pt-0.5">{output}</span>
              </motion.div>
            ))}
            <div className="border-t border-[#1C2530]/50" />
          </div>
        </div>
      </section>

      {/* ── PRIVATE ACCESS ── */}
      <PrivateAccessStrip />
    </>
  );
}
