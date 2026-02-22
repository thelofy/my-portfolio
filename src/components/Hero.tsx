"use client";

import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { useLang } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const { dict } = useLang();

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Ambient background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[100px] animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[140px]" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium tracking-wide mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          {dict.hero.badge}
        </motion.div>

        {/* Greeting */}
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-white/40 text-lg mb-2 tracking-wide"
        >
          {dict.hero.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-7xl font-black tracking-tight mb-4 leading-none"
        >
          <span className="bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
            {dict.hero.name}
          </span>
        </motion.h1>

        {/* Title */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center flex-wrap gap-3 mb-6"
        >
          <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            {dict.hero.title}
          </span>
          <span className="text-white/20 text-2xl">{dict.hero.titleSep}</span>
          <span className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            {dict.hero.titleAI}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {dict.hero.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-8 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:from-violet-500 group-hover:to-indigo-500 transition-all duration-300" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-violet-400/20 to-indigo-400/20 blur-xl transition-opacity duration-300" />
            <span className="relative">{dict.hero.cta}</span>
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white/70 border border-white/10 hover:border-white/20 hover:text-white bg-white/5 hover:bg-white/8 transition-all duration-200"
          >
            {dict.hero.ctaSecondary}
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <FiArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
