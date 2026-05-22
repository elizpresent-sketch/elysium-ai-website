"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const BG = "#050505";
const W = "max-w-[1440px] mx-auto px-6 lg:px-12";

const CAPABILITIES = [
  {
    tag: "01",
    title: "Emotional Data",
    body: "Real-time sensing and mapping of collective audience emotional state — delivered as a live dashboard and post-event archive.",
  },
  {
    tag: "02",
    title: "Immersive Brand Spaces",
    body: "Spatial, sensory and AI-responsive environments designed to embody brand identity and generate lasting emotional memory.",
  },
  {
    tag: "03",
    title: "Audience Response Systems",
    body: "Participatory interaction layers that make every attendee an active signal in the brand experience — not a passive observer.",
  },
  {
    tag: "04",
    title: "Narrative Intelligence",
    body: "AI-assisted creative direction that adapts show logic, visual output and content in response to live emotional signals.",
  },
  {
    tag: "05",
    title: "Experience Intelligence",
    body: "Structured post-event reporting on emotional peaks, collective response patterns and signal integrity across the audience.",
  },
  {
    tag: "06",
    title: "Strategic Partnership",
    body: "Long-form collaboration frameworks for brands, agencies and institutions seeking ongoing access to the ELIZIUM platform.",
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
          </motion.div>
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
            {CAPABILITIES.map(({ tag, title, body }) => (
              <motion.div
                key={tag}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="flex flex-col gap-3 p-5 lg:p-6"
                style={{ background: BG }}
              >
                <span className="text-[8px] tracking-[0.3em] uppercase text-[#6B7278] font-medium">
                  {tag}
                </span>
                <span className="text-[12px] tracking-[0.08em] uppercase text-[#C8CDD2] font-medium">
                  {title}
                </span>
                <p className="text-[13px] text-[#7B8188] leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Private Inquiry
            </motion.p>
            <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed">
              Brand and partner access is available by private inquiry only. All submissions
              are reviewed by the ELIZIUM core team.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
              >
                Private Inquiry <span className="w-4 h-px bg-current" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
