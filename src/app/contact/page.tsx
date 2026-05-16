"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/ui/ContactForm";

const WHO_FOR = [
  "Investors",
  "Venue Operators",
  "Creative Partners",
  "Sponsors",
  "Press & Media",
  "Strategic Advisors",
];

export default function ContactPage() {
  return (
    <>
      {/* ── HEADER ── */}
      <section className="bg-porcelain pt-36 pb-10 lg:pb-12">
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
              Contact
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-graphite leading-[1.05]"
            >
              Request Private Access
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base text-graphite-light leading-relaxed">
              For partners, investors, venues, sponsors, press and strategic
              collaborators.
            </motion.p>
            <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
              Selected enquiries are reviewed for strategic fit, launch potential
              and long-term collaboration.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── PRIVATE ACCESS IMAGE — compact ── */}
      <section className="bg-porcelain pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={scaleIn}
            className="relative aspect-[21/6] w-full overflow-hidden"
          >
            <Image
              src="/images/elysium-ai/dark/09-private-inquiry-access.webp"
              alt="Elizium AI — Private Access"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-porcelain/70 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10 lg:px-16">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg md:text-xl font-light text-graphite tracking-tight max-w-sm"
              >
                Elizium AI operates by invitation and pre-qualification.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section className="bg-pearl py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20">
            {/* Sidebar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-4 flex flex-col gap-8"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <SectionLabel text="Who This Is For" animate={false} />
                <div className="flex flex-col gap-0 mt-2">
                  {WHO_FOR.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 py-2.5 border-b border-silver-light"
                    >
                      <span className="w-1 h-1 rounded-full bg-silver-mid flex-shrink-0" />
                      <span className="text-sm text-graphite-light">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <span className="text-[9px] tracking-ultrawide uppercase font-medium text-silver-dark">
                  Process
                </span>
                <p className="text-sm text-graphite-light leading-relaxed">
                  All submissions are reviewed by the Elizium AI core team. We
                  respond to selected enquiries directly, typically within five
                  to ten working days.
                </p>
                <p className="text-sm text-graphite-light leading-relaxed">
                  We do not share your information with third parties.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <span className="text-[9px] tracking-ultrawide uppercase font-medium text-silver-dark">
                  Location
                </span>
                <p className="text-sm text-graphite-light">London, United Kingdom</p>
              </motion.div>
            </motion.div>

            {/* Form */}
            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
