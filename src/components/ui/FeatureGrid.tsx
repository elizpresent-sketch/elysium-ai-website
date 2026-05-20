"use client";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export interface FeatureItem {
  label: string;
  title: string;
  description: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  light?: boolean;
}

const colClass: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export default function FeatureGrid({ items, columns = 3, light = true }: FeatureGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      className={`grid ${colClass[columns]} gap-px bg-silver-light`}
    >
      {items.map((item) => (
        <motion.div
          key={item.title}
          variants={fadeUp}
          className={`flex flex-col gap-4 p-8 ${light ? "bg-porcelain" : "bg-graphite"}`}
        >
          <span
            className={`text-[9px] tracking-ultrawide uppercase font-medium ${
              light ? "text-violet-muted" : "text-violet-soft"
            }`}
          >
            {item.label}
          </span>
          <h3
            className={`font-display font-normal uppercase tracking-[0.11em] leading-[0.97] text-base ${
              light ? "text-graphite" : "text-porcelain"
            }`}
          >
            {item.title}
          </h3>
          <p className={`text-sm leading-relaxed ${light ? "text-graphite-light" : "text-silver-mid"}`}>
            {item.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
