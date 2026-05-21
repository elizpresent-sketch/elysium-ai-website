"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

const ACCESS_CODE = "ELIZIUM2026";

const SECTIONS = [
  {
    number: "01",
    title: "Strategic Overview",
    body: "Elizium AI occupies an emerging category at the intersection of live entertainment, artificial intelligence and cultural experience. The platform is designed for launch, licensing and global expansion — with a flagship experience in development and a scalable technical infrastructure already in place. We are not building a product. We are establishing a format.",
  },
  {
    number: "02",
    title: "Partnership Opportunities",
    body: "We are selectively engaging venue operators, investment partners, brand collaborators and technology partners who understand the long-term value of positioning at the intersection of AI and live culture. Conversations are available across co-production, exclusive venue partnerships, brand integration, licensing arrangements and strategic investment.",
  },
  {
    number: "03",
    title: "Platform Infrastructure",
    body: "The Elizium AI platform is a modular, production-ready creative-technology system. It integrates AI-assisted creative direction, immersive visual architecture, real-time audience interaction and robotic AI embodiment into a single deployable format. The system is engineered to operate across venue types, territories and production scales without compromising its essential quality.",
  },
  {
    number: "04",
    title: "Global Expansion Logic",
    body: "Developed in London for global deployment. The platform is structured as a licensable format — designed to travel to flagship cultural institutions, landmark venues and destination entertainment districts worldwide. Expansion is phased: London launch, followed by selective international rollout to markets with demonstrated appetite for premium live cultural experience.",
  },
  {
    number: "05",
    title: "Contact & Next Step",
    body: "Selected conversations are arranged directly by the Elizium AI core team. If you have received access, we are already aware of your interest. The next step is a brief introductory call or written exchange to determine mutual fit.",
    cta: true,
  },
];

export default function PrivateAccessPage() {
  const [code, setCode] = useState("");
  const [granted, setGranted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    if (code.trim().toUpperCase() === ACCESS_CODE) {
      setGranted(true);
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      setError(true);
    }
  };

  return (
    <>
      {/* ── HEADER — text only ── */}
      <section className="bg-porcelain pt-24 pb-8 lg:pt-32 lg:pb-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-5 lg:gap-6 max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-3 text-[10px] tracking-ultrawide uppercase font-medium text-graphite-light"
            >
              <span className="w-6 h-px bg-graphite-light" />
              Restricted
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-graphite"
              style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
            >
              Private Access
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[14px] text-graphite-light leading-relaxed">
              For partners, investors, venues, sponsors and strategic collaborators.
            </motion.p>

            <motion.p variants={fadeUp} className="text-[13px] text-silver-dark leading-relaxed">
              Selected inquiries are reviewed for strategic fit, launch potential
              and long-term collaboration.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── ACCESS GATE ── */}
      <section className="bg-pearl py-6 lg:py-10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-md">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-8"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <span className="text-[9px] tracking-ultrawide uppercase font-medium text-silver-dark">
                  Access Code Required
                </span>
                <p className="text-sm text-graphite-light leading-relaxed">
                  Enter your access code to view partner materials.
                </p>
              </motion.div>

              <motion.form
                variants={fadeUp}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setError(false);
                    }}
                    placeholder="ACCESS CODE"
                    spellCheck={false}
                    autoComplete="off"
                    className={`w-full bg-white/[0.03] border text-graphite placeholder:text-silver-dark/50 text-sm tracking-superwide uppercase px-4 py-3.5 focus:outline-none transition-colors duration-200 ${
                      error
                        ? "border-silver-mid/60"
                        : "border-silver-mid/35 focus:border-silver-mid"
                    }`}
                  />
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-[10px] tracking-wide text-silver-dark/70"
                      >
                        Access code not recognised.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={loading || granted || code.length === 0}
                  className="w-full sm:w-auto px-8 py-3.5 bg-graphite text-porcelain text-[11px] tracking-superwide uppercase font-medium hover:bg-graphite-mid transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying…" : granted ? "Access Granted" : "Enter Private Access"}
                </button>
              </motion.form>

              {!granted && (
                <motion.p variants={fadeUp} className="text-[10px] text-silver-dark/50 leading-relaxed">
                  Do not have an access code?{" "}
                  <Link
                    href="/contact"
                    className="text-silver-dark hover:text-graphite-light transition-colors duration-200 underline underline-offset-2"
                  >
                    Submit a private inquiry
                  </Link>
                  .
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HIDDEN CONTENT ── */}
      <AnimatePresence>
        {granted && (
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Access confirmed banner */}
            <section className="bg-porcelain border-y border-silver-light">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5">
                <div className="flex items-center gap-4">
                  <span className="w-1 h-1 rounded-full bg-graphite-light/40" />
                  <span className="text-[9px] tracking-ultrawide uppercase text-silver-dark/70 font-medium">
                    Access Granted &nbsp;·&nbsp; Partner Materials &nbsp;·&nbsp; Confidential
                  </span>
                </div>
              </div>
            </section>

            {/* Content sections */}
            <section className="bg-porcelain py-10 lg:py-20">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="flex flex-col"
                >
                  {SECTIONS.map((s, i) => (
                    <motion.div
                      key={s.number}
                      variants={fadeUp}
                      transition={{ delay: i * 0.06 }}
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-8 lg:py-16 ${
                        i < SECTIONS.length - 1 ? "border-b border-silver-light" : ""
                      }`}
                    >
                      {/* Label col */}
                      <div className="lg:col-span-4 flex flex-col gap-3">
                        <span className="text-[10px] tracking-ultrawide text-violet-muted uppercase font-medium">
                          {s.number}
                        </span>
                        <h2 className="font-display font-normal uppercase tracking-[0.11em] leading-[0.97] text-xl md:text-2xl text-graphite">
                          {s.title}
                        </h2>
                      </div>

                      {/* Body col */}
                      <div className="lg:col-span-8 flex flex-col gap-6 justify-center">
                        <p className="text-sm md:text-base text-graphite-light leading-relaxed max-w-xl">
                          {s.body}
                        </p>
                        {s.cta && (
                          <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link
                              href="/contact"
                              className="inline-flex items-center gap-3 text-[11px] tracking-superwide uppercase font-medium text-graphite hover:text-graphite-mid transition-colors group"
                            >
                              Request a Conversation
                              <span className="w-8 h-px bg-graphite group-hover:w-12 transition-all duration-300" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Confidentiality note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="mt-16 pt-8 border-t border-silver-light text-[10px] text-silver-dark/50 leading-relaxed max-w-xl"
                >
                  This material is provided in confidence to pre-qualified partners only.
                  Please do not distribute or reproduce without written consent from Original Tema Ltd.
                </motion.p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
