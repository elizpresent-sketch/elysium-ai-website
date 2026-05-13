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
        porcelain: "#FAF9F7",
        pearl: "#F2F1EF",
        "silver-light": "#E5E3DF",
        "silver-mid": "#B8B6B2",
        "silver-dark": "#8A8884",
        graphite: "#1C1B19",
        "graphite-mid": "#3A3936",
        "graphite-light": "#6B6A67",
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
