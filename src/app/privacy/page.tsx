"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const SECTIONS = [
  {
    title: "Who We Are",
    body: "ELIZIUM AI is developed by Original Tema Ltd, a company registered in England and Wales (Company No. 16376227). This privacy policy explains how we handle personal information submitted through this website.",
  },
  {
    title: "Information We Collect",
    body: "When you submit a private inquiry through our contact form, we collect the following information: your name, email address, organisation name, inquiry type and any message you choose to include. We do not collect any information passively — no tracking cookies, no analytics identifiers, no behavioural data.",
  },
  {
    title: "How We Use Your Information",
    body: "Information submitted through the contact form is used solely to review your inquiry and respond where appropriate. We use it to assess strategic fit, manage potential partnerships and follow up on selected conversations. We do not use your information for marketing purposes.",
  },
  {
    title: "Information Sharing",
    body: "We do not sell, rent or share your personal information with third parties. Your details are reviewed internally by the Original Tema Ltd team only.",
  },
  {
    title: "Data Retention",
    body: "We retain submitted inquiry information for as long as is reasonably necessary to manage the relevant conversation or partnership process. If you would like your information removed, you may request deletion at any time.",
  },
  {
    title: "Your Rights",
    body: "You have the right to request access to the personal information we hold about you, to request its correction, or to request its deletion. To exercise any of these rights, please contact us directly.",
  },
  {
    title: "Contact",
    body: "For any questions about this policy or to request deletion of your information, please contact us at hello@elizium.co.uk.",
    email: true,
  },
  {
    title: "Updates to This Policy",
    body: "This is an early-stage privacy policy. As the ELIZIUM AI platform develops and our data practices evolve, this policy will be updated to reflect any changes. The current version will always be available at this URL.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* ── HEADER ── */}
      <section className="bg-porcelain pt-36 pb-14 lg:pb-18">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-5 max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-3 text-[10px] tracking-ultrawide uppercase font-medium text-graphite-light"
            >
              <span className="w-6 h-px bg-graphite-light" />
              Legal
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl font-light tracking-tight text-graphite leading-[1.05]"
            >
              Privacy Policy
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
              Original Tema Ltd &nbsp;·&nbsp; Company No. 16376227 &nbsp;·&nbsp; London, United Kingdom
            </motion.p>
            <motion.p variants={fadeUp} className="text-xs text-silver-dark">
              Last updated: May 2025
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="bg-pearl py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-2xl flex flex-col">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className={`flex flex-col gap-3 py-10 ${
                  i < SECTIONS.length - 1 ? "border-b border-silver-light" : ""
                }`}
              >
                <span className="text-[9px] tracking-ultrawide uppercase font-medium text-silver-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-base font-medium tracking-tight text-graphite">
                  {s.title}
                </h2>
                <p className="text-sm text-graphite-light leading-relaxed">
                  {s.email ? (
                    <>
                      {s.body.replace("hello@elizium.co.uk", "")}{" "}
                      <a
                        href="mailto:hello@elizium.co.uk"
                        className="text-graphite hover:text-graphite-mid underline underline-offset-2 transition-colors duration-200"
                      >
                        hello@elizium.co.uk
                      </a>
                      .
                    </>
                  ) : (
                    s.body
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
