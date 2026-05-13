"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Future Human", href: "/future-human" },
  { label: "Vision", href: "/vision" },
  { label: "Contact", href: "/contact" },
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

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-porcelain/97 backdrop-blur-md border-b border-silver-light shadow-sm"
            : "bg-porcelain/90 backdrop-blur-sm border-b border-silver-light/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Wordmark */}
            <Link
              href="/"
              className="text-[11px] tracking-ultrawide uppercase font-semibold text-graphite hover:text-graphite-mid transition-colors duration-200"
            >
              Elysium AI
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`text-[11px] tracking-superwide uppercase font-medium transition-colors duration-200 ${
                      active
                        ? "text-graphite"
                        : "text-graphite-light hover:text-graphite"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/contact"
                className="text-[10px] tracking-superwide uppercase font-medium px-5 py-2.5 border border-graphite text-graphite hover:bg-graphite hover:text-porcelain transition-all duration-300"
              >
                Private Access
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col gap-1.5 p-1"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-graphite origin-center transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-px bg-graphite"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-5 h-px bg-graphite origin-center transition-all"
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-porcelain flex flex-col items-start justify-center px-8 gap-8 md:hidden"
          >
            <Link
              href="/"
              className="text-[10px] tracking-ultrawide uppercase font-semibold text-graphite mb-8"
            >
              Elysium AI
            </Link>
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={href}
                  className="text-3xl font-light tracking-tight text-graphite hover:text-graphite-light transition-colors"
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                className="text-[10px] tracking-superwide uppercase font-medium px-6 py-3 border border-graphite text-graphite"
              >
                Request Private Access
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
