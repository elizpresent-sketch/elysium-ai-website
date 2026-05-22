"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const BG = "#050505";
const W = "max-w-[1440px] mx-auto px-6 lg:px-12";

const STAGES = [
  {
    num: "01",
    name: "Read",
    description:
      "Biometric, spatial and behavioural sensors capture emotional signal data from the audience in real time — without interruption to the experience.",
  },
  {
    num: "02",
    name: "Process",
    description:
      "AI inference layers interpret the incoming signal stream, identifying emotional state, intensity, collective patterns and individual variation.",
  },
  {
    num: "03",
    name: "Respond",
    description:
      "The experience adapts — visual output, spatial environment, narrative direction and pace all shift in response to the live emotional state of the room.",
  },
  {
    num: "04",
    name: "Record",
    description:
      "Every session produces a structured emotional archive: timestamped signal data, response maps and collective pattern documentation.",
  },
  {
    num: "05",
    name: "Scale",
    description:
      "The method is designed for multi-venue, multi-territory deployment — with consistent signal architecture and licensed creative and technical frameworks.",
  },
];

export default function MethodPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: BG }} className="pt-24 pb-16 lg:pt-36 lg:pb-24">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              The Method
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
              A system for reading, shaping and archiving emotional response.
            </motion.h1>
            <div className="h-px w-8 bg-[#1C2530]/60" />
            <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[480px]">
              The ELIZIUM Method is a five-stage operational framework that turns live
              emotional signal into structured data — and that data into adaptive,
              intelligent experience.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
              >
                Discuss the Method <span className="w-4 h-px bg-current" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FIVE STAGES ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-10">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              Five Stages
            </span>
          </div>
          <div className="flex flex-col">
            {STAGES.map(({ num, name, description }) => (
              <motion.div
                key={num}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="grid grid-cols-[2.5rem_1fr] lg:grid-cols-[4rem_14rem_1fr] gap-x-5 lg:gap-x-10 items-start py-6 border-t border-[#1C2530]/50"
              >
                <span className="text-[9px] tracking-[0.3em] font-normal text-[#6B7278]/50 pt-0.5">
                  {num}
                </span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#C8CDD2] font-medium pt-0.5">
                  {name}
                </span>
                <p className="col-start-2 lg:col-start-3 text-[13px] text-[#7B8188] leading-relaxed mt-2 lg:mt-0">
                  {description}
                </p>
              </motion.div>
            ))}
            <div className="border-t border-[#1C2530]/50" />
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
              Methodology Access
            </motion.p>
            <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed">
              Full methodology documentation, technical specifications and deployment
              frameworks are available to qualified partners on request.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
              >
                Discuss the Method <span className="w-4 h-px bg-current" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
