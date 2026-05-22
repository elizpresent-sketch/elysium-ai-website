"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// 5 items — each maps to a unique href so only one can be active at a time
const NAV_LINKS = [
  { label: "Platform",     href: "/platform" },
  { label: "Method",       href: "/method" },
  { label: "Future Human", href: "/future-human" },
  { label: "For Brands",   href: "/for-brands" },
  { label: "Company",      href: "/company" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#1C2530]/70"
            : "border-b border-[#1C2530]/35"
        }`}
        style={{
          background: scrolled
            ? "rgba(5,5,5,0.97)"
            : "rgba(5,5,5,0.88)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between h-14">
            {/* Wordmark */}
            <Link
              href="/"
              className="text-[10px] tracking-[0.35em] uppercase font-semibold text-[#E2E8EE] hover:text-[#C8CDD2] transition-colors duration-200 flex-shrink-0"
            >
              ELIZIUM
            </Link>

            {/* Desktop nav — compact multi-item */}
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map(({ label, href }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={label + href}
                    href={href}
                    className={`text-[8.5px] tracking-[0.25em] uppercase font-medium transition-colors duration-200 whitespace-nowrap ${
                      active
                        ? "text-[#E2E8EE]"
                        : "text-[#6B7278] hover:text-[#C8CDD2]"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Private Access button */}
            <div className="hidden lg:flex items-center flex-shrink-0">
              <Link
                href="/contact"
                className="text-[8px] tracking-[0.25em] uppercase font-medium px-4 py-2 border border-[#E2E8EE]/50 text-[#E2E8EE] hover:bg-[#E2E8EE] hover:text-[#050505] transition-all duration-300"
              >
                Private Access
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="lg:hidden flex flex-col gap-1.5 p-1"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-[#E2E8EE] origin-center"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-px bg-[#E2E8EE]"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-[#E2E8EE] origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-start justify-center px-8 gap-6 lg:hidden"
            style={{ background: "#050505" }}
          >
            <Link
              href="/"
              className="text-[9px] tracking-[0.35em] uppercase font-semibold text-[#E2E8EE] mb-6"
            >
              ELIZIUM
            </Link>
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={href}
                  className="text-2xl font-display font-light tracking-tight text-[#E2E8EE] hover:text-[#8E949A] transition-colors uppercase"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-6"
            >
              <Link
                href="/contact"
                className="text-[9px] tracking-[0.25em] uppercase font-medium px-6 py-3 border border-[#E2E8EE]/50 text-[#E2E8EE]"
              >
                Private Access
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
