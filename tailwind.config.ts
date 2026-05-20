import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        // Playfair Display — luxury editorial high-contrast serif
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        // ── PURE BLACK CINEMATIC PALETTE ────────────────────────
        // True near-blacks — no blue tint
        porcelain: "#050505",          // primary background — true near-black
        pearl: "#080808",              // alternate background — same near-black
        "silver-light": "#1C2530",     // thin dividers / structural borders — cold blue-grey
        "silver-mid": "#707880",       // muted placeholder / secondary labels
        "silver-dark": "#6B7278",      // captions, tertiary text
        // graphite = primary text (near-white, cold-tinted)
        graphite: "#E2E8EE",           // primary text — cold near-white
        "graphite-mid": "#C8CDD2",     // secondary headings — cold silver
        "graphite-light": "#8E949A",   // body text — muted cold silver
        // ── COLD GLASS BORDERS ──────────────────────────────────
        ice: "rgba(180,200,220,0.10)",     // subtle cold glass border
        "ice-mid": "rgba(180,200,220,0.22)", // hover / active cold border
        // ── ACCENT ──────────────────────────────────────────────
        violet: {
          soft: "#8B9CF4",
          muted: "#6B7DE8",
          pale: "#C5CCFA",
          glow: "rgba(139,156,244,0.12)",
        },
      },
      letterSpacing: {
        superwide: "0.25em",
        ultrawide: "0.35em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
