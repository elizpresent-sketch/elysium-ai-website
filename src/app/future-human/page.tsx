"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import CTASection from "@/components/ui/CTASection";

export default function FutureHumanPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/elysium-ai/dark/03-first-experience-portal-wide.webp"
            alt="Future Human — Elizium AI"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-porcelain/88 via-porcelain/40 to-porcelain/05 md:from-porcelain/80 md:via-porcelain/25 md:to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-40 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col gap-6 max-w-2xl"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-3 text-[10px] tracking-ultrawide uppercase font-medium text-graphite md:text-graphite-light"
            >
              <span className="w-6 h-px bg-graphite md:bg-graphite-light" />
              Flagship Experience · London
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-graphite leading-[1.02]"
            >
              Future Human
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base md:text-lg text-graphite-light leading-relaxed">
              The first ELIZIUM AI experience — staging the emotional encounter
              between humanity and artificial intelligence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CONCEPT ── */}
      <section className="bg-porcelain py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionLabel text="The Concept" />
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-8 flex flex-col gap-6"
            >
              <motion.p
                variants={fadeUp}
                className="text-xl md:text-2xl font-light tracking-tight text-graphite leading-relaxed"
              >
                FUTURE HUMAN is the first flagship London experience built to
                demonstrate the ELIZIUM AI platform.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base text-graphite-light leading-relaxed">
                It stages the emotional encounter between humanity and artificial
                intelligence through immersive visuals, live audience interaction and
                a robotic AI presence — asking a question that no other entertainment
                format has dared to make visceral:{" "}
                <em>what does it feel like to meet something that knows you?</em>
              </motion.p>
              <motion.p variants={fadeUp} className="text-base text-graphite-light leading-relaxed">
                Future Human is not a concert. It is not a theatre show. It is not a
                museum installation. It is a new format — designed from first
                principles for the age of intelligent experience.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HUMAN EMOTION ── */}
      <section className="bg-pearl py-20 lg:py-26 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="relative aspect-square lg:aspect-[3/4]"
            >
              <Image
                src="/images/elysium-ai/dark/11-team-visionaries.webp"
                alt="Visionaries — Future Human"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <SectionLabel text="Human Emotion" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                The human response is the performance.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed">
                Future Human is built around a central provocation: AI is not the
                show — the human response is. Every design decision, from spatial
                layout to AI behaviour to lighting logic, is engineered to
                surface authentic emotional response.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
                The result is a live experience that is different every time it
                runs — because the audience is different every time.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ROBOTIC PRESENCE ── */}
      <section className="bg-porcelain py-20 lg:py-26 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-6 order-2 lg:order-1"
            >
              <SectionLabel text="AI Presence" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                Intelligence with a physical form.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed">
                At the centre of FUTURE HUMAN is a robotic AI presence — an embodied
                figure through which the audience encounters artificial intelligence as
                something spatial, physical and emotionally immediate.
              </motion.p>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
                Rather than presenting AI as software on a screen, the experience gives
                intelligence a body, a stage and a relationship with the audience.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="relative aspect-square lg:aspect-[3/4] order-1 lg:order-2"
            >
              <Image
                src="/images/elysium-ai/dark/06-creative-production-stage.webp"
                alt="AI Creative Production — Future Human"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── AUDIENCE INTERACTION ── */}
      <section className="bg-pearl py-20 lg:py-26">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="relative aspect-[4/3]"
            >
              <Image
                src="/images/elysium-ai/dark/05-audience-system-silhouette.webp"
                alt="Audience System — Future Human"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="flex flex-col gap-6"
            >
              <SectionLabel text="Audience Interaction" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                Every audience changes the experience.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm md:text-base text-graphite-light leading-relaxed">
                Through opt-in interaction and live response systems, audience input
                becomes part of the visual and narrative architecture of the performance.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LONDON LAUNCH ── */}
      <section className="bg-porcelain py-20 lg:py-26 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              className="lg:col-span-5 flex flex-col gap-6"
            >
              <SectionLabel text="London" animate={false} />
              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-light tracking-tight leading-tight text-graphite"
              >
                Premiering in London.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-sm text-graphite-light leading-relaxed">
                FUTURE HUMAN is developed to launch in London — a global centre for
                creative technology, live experience and cultural innovation. From
                London, the ELIZIUM AI platform is designed to license, adapt and
                travel to venues worldwide.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={scaleIn}
              className="lg:col-span-7 relative aspect-[16/10]"
            >
              <Image
                src="/images/elysium-ai/dark/13-global-journey-map.webp"
                alt="Global Journey — Future Human"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-pearl py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <CTASection
            label="Private Access"
            headline="For venues, investors and strategic partners interested in Future Human."
            body="Pre-production briefings and venue conversations available on request."
            primaryHref="/contact"
            primaryLabel="Request Private Access"
            secondaryHref="/platform"
            secondaryLabel="Explore the Platform"
          />
        </div>
      </section>
    </>
  );
}
