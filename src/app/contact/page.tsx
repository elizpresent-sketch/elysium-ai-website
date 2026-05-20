"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/ui/ContactForm";

const BG = "#050505";

interface FadeImageProps {
  src: string; alt: string; className?: string; position?: string;
  fadeLeft?: number; fadeRight?: number; fadeTop?: number; fadeBottom?: number;
  sizes?: string;
}
function FadeImage({ src, alt, className = "", position = "center center",
  fadeLeft = 0, fadeRight = 0, fadeTop = 10, fadeBottom = 10,
  sizes = "100vw" }: FadeImageProps) {
  const layers: string[] = [];
  if (fadeTop > 0)    layers.push(`linear-gradient(to bottom, ${BG} 0%, transparent ${fadeTop}%)`);
  if (fadeBottom > 0) layers.push(`linear-gradient(to top,    ${BG} 0%, transparent ${fadeBottom}%)`);
  if (fadeLeft > 0)   layers.push(`linear-gradient(to right,  ${BG} 0%, transparent ${fadeLeft}%)`);
  if (fadeRight > 0)  layers.push(`linear-gradient(to left,   ${BG} 0%, transparent ${fadeRight}%)`);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover"
        style={{ objectPosition: position }} sizes={sizes} />
      {layers.length > 0 && (
        <div aria-hidden className="absolute inset-0 pointer-events-none z-10"
          style={{ background: layers.join(", ") }} />
      )}
    </div>
  );
}

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
      <section className="bg-porcelain pt-24 pb-8 lg:pt-36 lg:pb-20">
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
              Contact
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display font-normal uppercase tracking-[0.08em] sm:tracking-[0.11em] leading-[0.97] text-graphite"
              style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
            >
              Request Private Access
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[14px] text-graphite-light leading-relaxed">
              For partners, investors, venues, sponsors, press and strategic
              collaborators.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[13px] text-graphite-light leading-relaxed">
              Selected enquiries are reviewed for strategic fit, launch potential
              and long-term collaboration.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── PRIVATE ACCESS IMAGE ── */}
      <section className="bg-porcelain pb-6 lg:pb-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={scaleIn}
        >
          <FadeImage
            src="/images/elysium-ai/dark/09.png"
            alt="Elizium AI — Private Access"
            className="aspect-[16/9] lg:aspect-[21/7]"
            position="center 30%"
            fadeLeft={8} fadeTop={6} fadeBottom={6} fadeRight={6}
            sizes="100vw"
          />
        </motion.div>
      </section>

      {/* ── FORM + SIDEBAR ── */}
      <section className="bg-pearl py-10 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
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
