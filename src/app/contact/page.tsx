"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, scaleIn, viewport } from "@/lib/motion";
import ContactForm from "@/components/ui/ContactForm";

const BG = "#050505";
const W = "max-w-[1440px] mx-auto px-6 lg:px-12";

interface FadeImageProps {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  fadeLeft?: number;
  fadeRight?: number;
  fadeTop?: number;
  fadeBottom?: number;
  sizes?: string;
  priority?: boolean;
}
function FadeImage({
  src, alt, className = "", position = "center center",
  fadeLeft = 0, fadeRight = 0, fadeTop = 10, fadeBottom = 10,
  sizes = "100vw", priority = false,
}: FadeImageProps) {
  const layers: string[] = [];
  if (fadeTop > 0)    layers.push(`linear-gradient(to bottom, ${BG} 0%, transparent ${fadeTop}%)`);
  if (fadeBottom > 0) layers.push(`linear-gradient(to top,    ${BG} 0%, transparent ${fadeBottom}%)`);
  if (fadeLeft > 0)   layers.push(`linear-gradient(to right,  ${BG} 0%, transparent ${fadeLeft}%)`);
  if (fadeRight > 0)  layers.push(`linear-gradient(to left,   ${BG} 0%, transparent ${fadeRight}%)`);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} className="object-cover"
        style={{ objectPosition: position }} sizes={sizes} />
      {layers.length > 0 && (
        <div aria-hidden className="absolute inset-0 pointer-events-none z-10"
          style={{ background: layers.join(", ") }} />
      )}
    </div>
  );
}

function Rule() {
  return <div className="h-px w-8 bg-[#1C2530]/60" />;
}

const CONTACTS = [
  { k: "Email",        v: "admin@elizium.co.uk" },
  { k: "Partnerships", v: "partnerships@elizium.co.uk" },
  { k: "Press",        v: "press@elizium.co.uk" },
  { k: "Phone",        v: "+44 7746 271397" },
  { k: "Location",     v: "London, United Kingdom" },
];

export default function ContactPage() {
  return (
    <>
      {/* ── CONTACT HEADER: heading + contact rows left, map right ── */}
      <section style={{ background: BG }} className="pt-24 pb-10 lg:pt-36 lg:pb-16 overflow-hidden">
        <div className={W}>

          {/* Section label */}
          <div className="flex items-center justify-between border-t border-[#1C2530]/60 pt-3.5 mb-8">
            <span className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
              Contact
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

            {/* Left — heading + contact rows + buttons */}
            <motion.div
              initial="hidden" animate="visible" variants={stagger}
              className="lg:col-span-7 flex flex-col gap-4 lg:gap-5"
            >
              <motion.h1
                variants={fadeUp}
                className="font-display font-normal uppercase text-[#E2E8EE] leading-[0.97] tracking-[0.08em] sm:tracking-[0.11em]"
                style={{ fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
              >
                Let&apos;s Build
                <br />the Future
                <br />Together
              </motion.h1>
              <Rule />
              <motion.p variants={fadeUp} className="text-[14px] text-[#AAB0B6] leading-relaxed max-w-md">
                Get in touch for partnerships, collaborations, media inquiries or
                private opportunities.
              </motion.p>

              {/* Contact rows */}
              <motion.div variants={fadeUp} className="flex flex-col gap-0 mt-1">
                {CONTACTS.map(({ k, v }) => (
                  <div key={k} className="grid grid-cols-[2fr_3fr] gap-4 py-2.5 border-t border-[#1C2530]/45">
                    <span className="text-[8.5px] tracking-[0.25em] uppercase text-[#8A9098] font-medium">{k}</span>
                    <span className="text-[8.5px] tracking-[0.1em] text-[#A0A6AC] font-medium">{v}</span>
                  </div>
                ))}
                <div className="border-t border-[#1C2530]/45" />
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href="mailto:admin@elizium.co.uk"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 bg-[#E2E8EE] text-[#050505] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:bg-[#C8CDD2] transition-colors duration-300"
                >
                  Send Message
                </a>
                <Link
                  href="/private-access"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 border border-[#1C2530]/55 text-[#969CA2] text-[8.5px] tracking-[0.28em] uppercase font-medium hover:border-[#707880] hover:text-[#E2E8EE] transition-all duration-300"
                >
                  Private Access
                </Link>
              </motion.div>
            </motion.div>

            {/* Right — contact map, desktop only */}
            <motion.div
              initial="hidden" animate="visible" variants={scaleIn}
              className="hidden lg:block lg:col-span-5"
            >
              <FadeImage
                src="/images/elysium-ai/dark/contactmap-q95.webp"
                alt="Elizium AI — London, United Kingdom"
                className="aspect-[4/5]"
                position="center center"
                fadeLeft={10} fadeTop={8} fadeBottom={8} fadeRight={6}
                sizes="42vw"
                priority
              />
            </motion.div>
          </div>

          {/* Mobile map */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={scaleIn}
            className="lg:hidden mt-6"
          >
            <FadeImage
              src="/images/elysium-ai/dark/contactmap-q95.webp"
              alt="Elizium AI — London, United Kingdom"
              className="aspect-[16/9]"
              position="center center"
              fadeLeft={8} fadeTop={8} fadeBottom={8} fadeRight={8}
              sizes="100vw"
            />
          </motion.div>
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section style={{ background: "#080808" }} className="py-10 lg:py-20 border-t border-[#1C2530]/50">
        <div className={W}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
              className="lg:col-span-4 flex flex-col gap-4"
            >
              <motion.span variants={fadeUp} className="text-[9px] tracking-[0.36em] uppercase font-medium text-[#969CA2]">
                Private Inquiry
              </motion.span>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                All submissions are reviewed by the Elizium AI core team. We respond to
                selected enquiries directly, typically within five to ten working days.
              </motion.p>
              <motion.p variants={fadeUp} className="text-[13.5px] text-[#AAB0B6] leading-relaxed">
                We do not share your information with third parties.
              </motion.p>
            </motion.div>

            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── WORDMARK STRIP ── */}
      <section style={{ background: BG }} className="py-8 lg:py-12 border-t border-[#1C2530]/40">
        <div className={W}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span
                className="font-display font-normal uppercase text-[#E2E8EE]/12 leading-none tracking-[0.20em]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                Elizium
              </span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#6B7278]/45 font-medium">
                Immersive AI-Human Platform
              </span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {["Future Platform", "AI-Human Technology", "Immersive Experiences", "Audience Systems", "Global Expansion"].map((t) => (
                <span key={t} className="text-[7.5px] tracking-[0.22em] uppercase text-[#6B7278]/38 font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
