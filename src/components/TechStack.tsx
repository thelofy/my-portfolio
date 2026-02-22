"use client";

import { motion } from "framer-motion";
import {
  SiLaravel,
  SiDjango,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiDocker,
  SiPostgresql,
  SiRedis,
  SiGit,
  SiPython,
  SiPhp,
  SiNodedotjs,
  SiMysql,
  SiOpenai,
} from "react-icons/si";
import { useLang } from "@/context/LanguageContext";

const TECH = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
  { icon: SiLaravel, name: "Laravel", color: "#FF2D20" },
  { icon: SiDjango, name: "Django", color: "#092E20" },
  { icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiPython, name: "Python", color: "#3776AB" },
  { icon: SiPhp, name: "PHP", color: "#777BB4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#5FA04E" },
  { icon: SiDocker, name: "Docker", color: "#2496ED" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
  { icon: SiMysql, name: "MySQL", color: "#4479A1" },
  { icon: SiRedis, name: "Redis", color: "#FF4438" },
  { icon: SiOpenai, name: "OpenAI", color: "#412991" },
  { icon: SiGit, name: "Git", color: "#F05032" },
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...TECH, ...TECH];
  return (
    <div className="flex overflow-hidden py-3">
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex gap-4 min-w-max"
      >
        {items.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <motion.div
              key={`${tech.name}-${i}`}
              whileHover={{ scale: 1.1, y: -3 }}
              className="group relative flex items-center gap-3 px-5 py-3 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/10 transition-all duration-200 cursor-default select-none"
            >
              <Icon
                size={22}
                style={{ color: tech.color }}
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors whitespace-nowrap">
                {tech.name}
              </span>
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-xl"
                style={{ background: `${tech.color}10` }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  const { dict } = useLang();

  return (
    <section id="stack" className="py-28 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 px-6"
      >
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-violet-400 mb-3">
          {dict.stack.subheading}
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white">
          {dict.stack.heading}
        </h2>
      </motion.div>

      {/* Marquee Rows with fade masks */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
