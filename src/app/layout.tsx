import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Elysium AI — The Future of Live Entertainment",
    template: "%s | Elysium AI",
  },
  description:
    "Elysium AI is a UK-based creative-tech company developing AI-powered immersive entertainment experiences where human emotion, real-time visual systems, robotics and artificial intelligence meet.",
  openGraph: {
    title: "Elysium AI",
    description: "The Future of Live Entertainment Is Becoming Intelligent.",
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-porcelain text-graphite">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
