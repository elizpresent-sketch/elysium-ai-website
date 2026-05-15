"use client";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

interface PlatformCardProps {
  tag: string;
  title: string;
  description: string;
  light?: boolean;
}

export default function PlatformCard({ tag, title, description, light = false }: PlatformCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      className={`group transition-all duration-300 ${
        light
          ? "p-8 bg-pearl hover:bg-ice"
          : "border-t border-ice hover:border-ice-mid pt-8 pb-6"
      }`}
    >
      <span
        className={`text-[9px] tracking-ultrawide uppercase font-medium mb-4 block ${
          light ? "text-violet-muted" : "text-violet-soft"
        }`}
      >
        {tag}
      </span>
      <h3
        className={`text-lg font-medium tracking-tight mb-3 ${
          light ? "text-graphite" : "text-porcelain"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed ${
          light ? "text-graphite-light" : "text-silver-mid"
        }`}
      >
        {description}
      </p>
    </motion.div>
  );
}
