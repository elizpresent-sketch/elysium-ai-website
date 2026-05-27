"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const W = "max-w-[1440px] mx-auto px-6 lg:px-12";

export default function PrivateAccessStrip() {
  return (
    <section className="border-t border-[#1C2530]/50" style={{ background: "#080808" }}>
      <div className={W}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 lg:py-10"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#E2E8EE]/55 flex-shrink-0 animate-pulse"
                style={{ boxShadow: "0 0 4px 1px rgba(226,232,238,0.12)" }}
              />
              <span className="text-[8px] tracking-[0.38em] uppercase font-semibold text-[#969CA2]">
                Private Access / Partner Inquiry
              </span>
            </div>
            <p className="text-[13px] text-[#6B7278] leading-snug max-w-md">
              For brands, venues, investors, technology partners and press.
              Access is reviewed manually by the ELIZIUM team.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {["Brand Partner", "Technology Partner", "Venue / Investor", "Press", "Selected Collaborators"].map((t) => (
                <span
                  key={t}
                  className="text-[7.5px] tracking-[0.22em] uppercase text-[#4B5560] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex-shrink-0">
            <Link
              href="/contact#inquiry-form"
              className="inline-flex items-center gap-3 px-7 py-3 border border-[#E2E8EE]/65 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
            >
              Request Private Access <span className="w-4 h-px bg-current" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
