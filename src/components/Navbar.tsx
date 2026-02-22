"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
import { useLang } from "@/context/LanguageContext";

const NAV_LINKS = [
  { key: "home", href: "#home" },
  { key: "stack", href: "#stack" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
] as const;

export default function Navbar() {
  const { dict, toggleLang, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = NAV_LINKS.map((l) => ({
    label: dict.nav[l.key],
    href: l.href,
  }));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          className="text-lg font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            AE
          </span>
          <span className="text-white/40 mx-1">/</span>
          <span className="text-white/70 text-sm font-medium">Portfolio</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -1 }}
              className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-medium"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Social Icons */}
          <motion.a
            href="https://github.com/amireftekhar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            <FiGithub size={16} />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/amireftekhar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            <FiLinkedin size={16} />
          </motion.a>

          {/* Lang Switcher */}
          <motion.button
            onClick={toggleLang}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="ms-1 px-4 py-1.5 rounded-full text-xs font-semibold border border-violet-500/30 text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-400/50 transition-all duration-200 tracking-wide"
          >
            {dict.nav.langSwitch}
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-white/60 hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <a
                  href="https://github.com/amireftekhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <FiGithub size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/amireftekhar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <FiLinkedin size={18} />
                </a>
                <button
                  onClick={toggleLang}
                  className="ms-auto px-3 py-1 rounded-full text-xs font-semibold border border-violet-500/30 text-violet-300 bg-violet-500/10"
                >
                  {dict.nav.langSwitch}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
