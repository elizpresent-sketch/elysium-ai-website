"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

const BG = "#050505";

const SPACES = [
  { num: "01", label: "Human",     question: "What makes a response distinctly human?",        img: "/images/elysium-ai/dark/generated/emotional-space-human.webp" },
  { num: "02", label: "Memory",    question: "Can a system carry emotional memory?",             img: "/images/elysium-ai/dark/generated/emotional-space-memory.webp" },
  { num: "03", label: "Control",   question: "When does assistance become dependency?",          img: "/images/elysium-ai/dark/generated/emotional-space-control.webp" },
  { num: "04", label: "Loneliness",question: "Is connection possible without presence?",         img: "/images/elysium-ai/dark/generated/emotional-space-solitude.webp" },
  { num: "05", label: "Trust",     question: "What would make you trust an artificial mind?",    img: "/images/elysium-ai/dark/generated/emotional-space-trust.webp" },
  { num: "06", label: "AI",        question: "What does intelligence look like from outside?",   img: "/images/elysium-ai/dark/generated/emotional-space-ai.webp" },
];

export default function EmotionalSpacesGrid() {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px"
      style={{ background: "rgba(28,37,48,0.6)" }}
    >
      {SPACES.map(({ num, label, question, img }) => (
        <motion.div
          key={label}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          className="relative flex flex-col overflow-hidden group"
          style={{ background: BG }}
        >
          {/* image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={img}
              alt={label}
              fill
              className="object-cover opacity-55 transition-opacity duration-500 group-hover:opacity-75"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${BG} 0%, rgba(5,5,5,0.45) 45%, transparent 100%)`,
              }}
            />
            {/* signal space number marker */}
            <div className="absolute top-2.5 left-2.5 z-20">
              <span className="text-[6px] tracking-[0.3em] uppercase font-medium text-[#E2E8EE]/28 group-hover:text-[#E2E8EE]/55 transition-colors duration-300">
                {num}
              </span>
            </div>
          </div>

          {/* label + question */}
          <div className="flex flex-col gap-1.5 px-3 py-3 border-t border-[#1C2530]/50 transition-colors duration-300 group-hover:border-[#E2E8EE]/10">
            <span className="text-[9px] tracking-[0.28em] uppercase text-[#969CA2] font-medium">
              {label}
            </span>
            <p className="text-[11px] text-[#6B7278] leading-snug transition-colors duration-300 group-hover:text-[#7B8188]">
              {question}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
