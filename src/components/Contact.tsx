"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiCopy, FiCheck, FiPhone } from "react-icons/fi";
import { FaWhatsapp, FaTelegram, FaInstagram } from "react-icons/fa";
import { useLang } from "@/context/LanguageContext";

export default function Contact() {
  const { dict } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(dict.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback for browsers without clipboard API
      const el = document.createElement("textarea");
      el.value = dict.contact.email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer id="contact" className="relative py-28 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-600/8 blur-[120px] rounded-full" />
      </div>

      {/* Top divider */}
      <div className="max-w-3xl mx-auto mb-1">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pt-20"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-violet-400 mb-4">
            Contact
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            {dict.contact.heading}
          </h2>
          <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
            {dict.contact.subheading}
          </p>
        </motion.div>

        {/* Email Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative inline-flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/8 bg-white/[0.03] mb-10 group"
        >
          <FiMail className="text-violet-400 shrink-0" size={20} />
          <a
            href={`mailto:${dict.contact.email}`}
            className="text-white/70 font-mono text-sm sm:text-base hover:text-white transition-colors"
          >
            {dict.contact.email}
          </a>
          <motion.button
            onClick={handleCopyEmail}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
              copied
                ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                : "bg-violet-500/15 border border-violet-500/25 text-violet-300 hover:bg-violet-500/25 hover:border-violet-400/40"
            }`}
          >
            <motion.span
              key={copied ? "check" : "copy"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
            </motion.span>
            {copied ? dict.contact.emailCopied : dict.contact.emailCopy}
          </motion.button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-20"
        >
          <motion.a
            href="tel:+989937056703"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2.5 w-[140px] py-2.5 rounded-xl border border-white/8 bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 text-sm font-medium"
          >
            <FiPhone size={16} />
            {dict.contact.phone}
          </motion.a>
          <motion.a
            href="https://wa.me/989931510348"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2.5 w-[140px] py-2.5 rounded-xl border border-white/8 bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 text-sm font-medium"
          >
            <FaWhatsapp size={16} />
            {dict.contact.whatsapp}
          </motion.a>
          <motion.a
            href="https://t.me/thelofy"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2.5 w-[140px] py-2.5 rounded-xl border border-white/8 bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 text-sm font-medium"
          >
            <FaTelegram size={16} />
            {dict.contact.telegram}
          </motion.a>
          <motion.a
            href="https://instagram.com/thelofy"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2.5 w-[140px] py-2.5 rounded-xl border border-white/8 bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 text-sm font-medium"
          >
            <FaInstagram size={16} />
            {dict.contact.instagram}
          </motion.a>
          <motion.a
            href="https://github.com/amireftekharv"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2.5 w-[140px] py-2.5 rounded-xl border border-white/8 bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 text-sm font-medium"
          >
            <FiGithub size={16} />
            {dict.contact.github}
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/amireftekhar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2.5 w-[140px] py-2.5 rounded-xl border border-white/8 bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/[0.07] hover:border-white/15 transition-all duration-200 text-sm font-medium"
          >
            <FiLinkedin size={16} />
            {dict.contact.linkedin}
          </motion.a>
        </motion.div>

        {/* Bottom Bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <span>
            © {new Date().getFullYear()} Amir Eftekhar. {dict.contact.rights}
          </span>
          <span className="flex items-center gap-1.5">
            {dict.contact.madeWith}
            <span className="text-red-400">♥</span>
            {dict.contact.and}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
              {dict.contact.poweredBy}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
