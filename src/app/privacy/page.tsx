"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const SECTIONS: { title: string; body: string; email?: true }[] = [
  {
    title: "Who We Are",
    body: "ELIZIUM is developed and operated by Original Tema Ltd, a company registered in England and Wales (Company No. 16376227). This notice describes how ELIZIUM handles information that may be submitted through or generated on this website during the current platform MVP.",
  },
  {
    title: "What ELIZIUM Is Not",
    body: "ELIZIUM is not a medical service, psychological service, biometric system, facial recognition system, or diagnostic platform. No information collected through this site is used for clinical assessment, medical diagnosis, or psychological profiling. Emotional terminology used on this platform — such as “anxiety”, “trust”, or “discomfort” — represents self-selected descriptive responses to an experience prompt, not clinical classifications.",
  },
  {
    title: "Information We Currently Collect",
    body: "The ELIZIUM website MVP may collect two categories of information. Contact and inquiry data: when you voluntarily submit a form, we collect your name, email address, organisation, inquiry type, and any message you choose to include. Signal reaction data: when you select a response in the Signal of the Day section, the system records your reaction choice, a signal identifier (signal_id), source page reference (source_page), a server-generated timestamp, and your browser’s user agent string. No name, email address, or IP address is included in signal reaction data.",
  },
  {
    title: "What the Signal Reaction System Does Not Collect",
    body: "The Signal Reaction System does not collect diagnosis or clinical data, medical data, biometric data, facial recognition data, cookies, persistent tracking identifiers, session IDs, or individual identity profiles. No account is created when you respond. No persistent identifier is stored in your browser.",
  },
  {
    title: "How Signal Reaction Data Is Used",
    body: "Signal reaction data is used to understand aggregated emotional interaction patterns — how audiences collectively respond to a given experience prompt. This informs ELIZIUM’s platform development, live experiences, and method research. Individual reactions are not attributed to named individuals and are not used for personalised targeting or individual profiling.",
  },
  {
    title: "How Contact & Inquiry Data Is Used",
    body: "Information submitted through contact and private access forms is used solely to review your inquiry and respond where appropriate — for example, to discuss partnership proposals, brand collaborations, presentations, investment conversations, or project communication. We do not use contact data for marketing, and we do not share it with third parties outside of the trusted operational tools described below.",
  },
  {
    title: "Operational Tools",
    body: "To operate this platform and manage submitted data, ELIZIUM uses trusted third-party services including website hosting (Vercel), workflow automation (Make), and document storage (Google Workspace). As the platform develops, additional tools for form handling, analytics, or communication may be introduced. This notice will be updated to reflect any such changes.",
  },
  {
    title: "Data Sharing & Sale",
    body: "ELIZIUM does not sell personal data. We do not rent, broker, or trade personal information for commercial purposes. Data is accessed only by the Original Tema Ltd team or passed to the operational services described above, as required to operate the platform.",
  },
  {
    title: "Your Rights",
    body: "If you are based in the United Kingdom or European Economic Area, you have the right to request access to personal information we hold about you, to request its correction, to request its deletion, and to object to or withdraw from certain uses of your data where applicable. To exercise any of these rights, please contact us at privacy@elizium.co.uk.",
    email: true,
  },
  {
    title: "Contact",
    body: "For data or privacy queries, or to exercise your rights under this notice, please contact us at privacy@elizium.co.uk.",
    email: true,
  },
  {
    title: "This Notice",
    body: "This notice reflects the current early-stage MVP of the ELIZIUM platform. As the platform develops and our practices evolve, this notice will be updated accordingly. The current version is always available at this URL.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* ── HEADER ── */}
      <section className="bg-porcelain pt-28 lg:pt-32 pb-4 lg:pb-6">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
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
              Platform Notice
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display font-normal uppercase tracking-[0.11em] text-graphite leading-[0.97]"
              style={{ fontSize: "clamp(2.4rem, 4vw, 4rem)" }}
            >
              Privacy &amp; Data Notice
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
              Original Tema Ltd &nbsp;&middot;&nbsp; Company No. 16376227 &nbsp;&middot;&nbsp; United Kingdom
            </motion.p>
            <motion.p variants={fadeUp} className="text-xs text-silver-dark">
              Last updated: May 2026
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="bg-pearl pt-4 pb-10 lg:pt-6 lg:pb-14">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
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
                      {s.body.replace(/privacy@elizium\.co\.uk\.?/g, "")}{" "}
                      <a
                        href="mailto:privacy@elizium.co.uk"
                        className="text-graphite hover:text-graphite-mid underline underline-offset-2 transition-colors duration-200"
                      >
                        privacy@elizium.co.uk
                      </a>
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
