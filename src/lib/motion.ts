import type { Variants } from "framer-motion";

export const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

// Reduced y-offset (14px vs 36px) so the hidden state is barely displaced
// — eliminates the mid-scroll "pop" when IntersectionObserver fires
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// scale: 0.98 instead of 0.96 — barely perceptible start, no image burst
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
};

// Removed delayChildren — no pre-scroll hold before first child fires
// Reduced staggerChildren so the sequence completes before the user has
// scrolled past, preventing attention-grabbing mid-scroll cascades
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0 },
  },
};

// margin: "0px" — trigger exactly at the viewport edge, not 80px inside it.
// Firing 80px in was causing animations to start while content was already
// in the reading area, making the transition visible during active scrolling.
export const viewport = { once: true, margin: "0px" } as const;
