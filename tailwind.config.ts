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
      },
      colors: {
        // ── DARK CINEMATIC PALETTE ──────────────────────────────
        // porcelain/pearl = dark backgrounds (inverted from light theme)
        porcelain: "#0C0C0B",        // primary background — deep warm black
        pearl: "#141413",             // alternate section background
        "silver-light": "#232220",   // thin dividers / structural borders
        "silver-mid": "#B8B6B2",     // secondary text / visible silver
        "silver-dark": "#8A8884",    // muted labels, captions
        // graphite = primary text (now near-white — fully inverted)
        graphite: "#ECEAE6",          // primary text — warm near-white
        "graphite-mid": "#C4C2BE",   // secondary headings
        "graphite-light": "#9A9896", // body text on dark
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
