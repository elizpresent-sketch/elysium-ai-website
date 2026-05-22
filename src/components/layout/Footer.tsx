"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const LINKS = [
  { label: "Platform",     href: "/platform" },
  { label: "Method",       href: "/method" },
  { label: "Future Human", href: "/future-human" },
  { label: "For Brands",   href: "/for-brands" },
  { label: "Company",      href: "/company" },
  { label: "Contact",      href: "/contact" },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-[#1C2530]/50"
      style={{ background: "#050505" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger}
          className="flex flex-col md:flex-row justify-between gap-12"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4 max-w-xs">
            <Link
              href="/"
              className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#E2E8EE] hover:text-[#C8CDD2] transition-colors duration-200"
            >
              ELIZIUM
            </Link>
            <p className="text-[13px] text-[#7B8188] leading-relaxed">
              An AI-human emotional interaction platform exploring collective
              response, immersive systems and future-facing experience intelligence.
            </p>
            <p className="text-[8.5px] tracking-[0.28em] uppercase text-[#6B7278] font-medium">
              Designed in London
            </p>
          </motion.div>

          {/* Nav */}
          <motion.nav variants={fadeUp} className="flex flex-col gap-3">
            <span className="text-[8.5px] tracking-[0.3em] uppercase font-medium text-[#6B7278] mb-2">
              Navigation
            </span>
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-[13px] text-[#969CA2] hover:text-[#E2E8EE] transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </motion.nav>

          {/* Access */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <span className="text-[8.5px] tracking-[0.3em] uppercase font-medium text-[#6B7278]">
              Private Access
            </span>
            <p className="text-[13px] text-[#7B8188] leading-relaxed max-w-xs">
              For partners, investors, venues, sponsors, press and strategic
              collaborators.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-5 py-2.5 border border-[#E2E8EE]/50 text-[#E2E8EE] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300 w-fit"
            >
              Request Access
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 pt-6 border-t border-[#1C2530]/50 flex flex-col gap-3"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-[11px] text-[#6B7278]">
              © {new Date().getFullYear()} Original Tema Ltd. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="text-[10px] tracking-wide text-[#6B7278]/60 hover:text-[#969CA2] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="border-t border-[#1C2530]/40 pt-3">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B7278]/55 font-medium">
              Original Tema Ltd &nbsp;·&nbsp; Company Number 16376227 &nbsp;·&nbsp; United Kingdom
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
