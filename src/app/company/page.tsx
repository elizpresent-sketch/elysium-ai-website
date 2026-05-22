"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const BG = "#050505";
const W = "max-w-[1440px] mx-auto px-6 lg:px-12";

const DETAILS = [
  { k: "Company",      v: "Original Tema Ltd" },
  { k: "Registration", v: "16376227" },
  { k: "Jurisdiction", v: "United Kingdom" },
  { k: "Platform",     v: "ELIZIUM" },
  { k: "Category",     v: "Creative Technology" },
  { k: "Contact",      v: "admin@elizium.co.uk" },
];

export default function CompanyPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: BG }} className="pt-24 pb-16 lg:pt-36 lg:pb-24">
        <div className={W}>
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              Company
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
              A creative-technology platform for AI-human emotional interaction.
            </motion.h1>
            <div className="h-px w-8 bg-[#1C2530]/60" />
            <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[480px]">
              ELIZIUM is built and operated by Original Tema Ltd, a United
              Kingdom-registered creative-technology company.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-[480px]">
              We build platforms, systems and experiences at the intersection of
              artificial intelligence, live performance and human emotional response.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── DETAILS + MISSION ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-20">

            {/* Left — registration */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-2">
                <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
                  Registration
                </span>
              </div>
              <div className="flex flex-col gap-0">
                {DETAILS.map(({ k, v }) => (
                  <div
                    key={k}
                    className="grid grid-cols-[2fr_3fr] gap-4 py-3 border-t border-[#1C2530]/45"
                  >
                    <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#8A9098] font-medium">
                      {k}
                    </span>
                    <span className="text-[8.5px] tracking-[0.1em] text-[#A0A6AC] font-medium">
                      {v}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </div>
              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
                >
                  Contact <span className="w-4 h-px bg-current" />
                </Link>
              </div>
            </motion.div>

            {/* Right — mission */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-2">
                <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
                  Mission
                </span>
              </div>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                ELIZIUM exists to establish a new category of experience — one in which
                artificial intelligence and human emotional response are in active, real-time
                dialogue.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                Our platform is designed to be deployed globally, licensed by partners and
                operators, and continuously refined by the data it generates from live
                experience.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                We are a private company operating on an invitation basis, building toward a
                commercial launch with a select group of institutional partners, venue
                operators and brand collaborators.
              </motion.p>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
