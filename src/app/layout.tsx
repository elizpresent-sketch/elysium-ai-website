import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// Cinzel — classic Roman luxury serif, cinematic and architectural
// Designed for uppercase display use; 400/500 for elegant restrained headings
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ELIZIUM — AI-Human Emotional Interaction Platform",
    template: "%s | ELIZIUM",
  },
  description:
    "ELIZIUM is an AI-human emotional interaction platform exploring collective response, immersive environments, emotional signal systems and future-facing experience intelligence.",
  openGraph: {
    title: "ELIZIUM — AI-Human Emotional Interaction Platform",
    description:
      "A platform for AI-human emotional interaction, immersive systems and collective response intelligence.",
    type: "website",
    locale: "en_GB",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="antialiased bg-porcelain text-graphite">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
