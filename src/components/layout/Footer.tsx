"use client";
import Link from "next/link";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Future Human", href: "/future-human" },
  { label: "Vision", href: "/vision" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-porcelain border-t border-silver-light">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
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
              className="text-[11px] tracking-ultrawide uppercase font-semibold text-graphite"
            >
              Elizium AI
            </Link>
            <p className="text-sm text-graphite-light leading-relaxed">
              A UK-based creative-technology platform developing AI-powered
              immersive experiences.
            </p>
            <p className="text-[10px] tracking-superwide uppercase text-silver-mid font-medium">
              Designed in London
            </p>
          </motion.div>

          {/* Nav */}
          <motion.nav variants={fadeUp} className="flex flex-col gap-3">
            <span className="text-[9px] tracking-ultrawide uppercase font-medium text-silver-dark mb-2">
              Navigation
            </span>
            {LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-graphite-light hover:text-graphite transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </motion.nav>

          {/* Access */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <span className="text-[9px] tracking-ultrawide uppercase font-medium text-silver-dark">
              Private Access
            </span>
            <p className="text-sm text-graphite-light leading-relaxed max-w-xs">
              For partners, investors, venues, sponsors, press and strategic
              collaborators.
            </p>
            <Link
              href="/contact"
              className="inline-block text-[10px] tracking-superwide uppercase font-medium px-5 py-2.5 border border-graphite text-graphite hover:bg-graphite hover:text-porcelain transition-all duration-300 w-fit"
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
          className="mt-16 pt-6 border-t border-silver-light flex flex-col gap-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="text-[11px] text-silver-dark">
              © {new Date().getFullYear()} Original Tema Ltd. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="text-[10px] tracking-wide text-silver-dark/60 hover:text-silver-dark transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 pt-3 border-t border-silver-light/40">
            <p className="text-[10px] tracking-superwide uppercase text-silver-dark/60 font-medium">
              Original Tema Ltd &nbsp;·&nbsp; Company No. 16376227 &nbsp;·&nbsp; London, United Kingdom
            </p>
            <p className="text-[10px] text-silver-dark/50 tracking-wide sm:text-right max-w-xs">
              Elizium AI is developed by Original Tema Ltd as a UK-based immersive creative-technology platform.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
