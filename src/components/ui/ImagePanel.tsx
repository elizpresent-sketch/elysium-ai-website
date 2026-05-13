"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { scaleIn, viewport } from "@/lib/motion";

interface ImagePanelProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  overlay?: "none" | "light" | "dark" | "gradient-up" | "gradient-down";
  priority?: boolean;
  className?: string;
  animate?: boolean;
  children?: React.ReactNode;
}

const overlayClasses: Record<string, string> = {
  none: "",
  light: "bg-porcelain/30",
  dark: "bg-graphite/50",
  "gradient-up": "bg-gradient-to-t from-graphite/60 via-graphite/10 to-transparent",
  "gradient-down": "bg-gradient-to-b from-porcelain/40 via-transparent to-transparent",
};

export default function ImagePanel({
  src,
  alt,
  aspectRatio = "aspect-[4/3]",
  overlay = "none",
  priority = false,
  className = "",
  animate = true,
  children,
}: ImagePanelProps) {
  const inner = (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
      />
      {overlay !== "none" && (
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      )}
      {children && (
        <div className="absolute inset-0 z-10 flex items-end p-8">
          {children}
        </div>
      )}
    </div>
  );

  if (!animate) return inner;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={scaleIn}
    >
      {inner}
    </motion.div>
  );
}
