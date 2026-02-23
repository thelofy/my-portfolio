"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiImage } from "react-icons/fi";
import { useLang } from "@/context/LanguageContext";
import type { NormalisedProject } from "@/lib/sanity.types";

// ── Animation variants ────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

// ── ProjectCard ───────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
}: {
  project: NormalisedProject;
  index: number;
}) {
  const { lang, dict } = useLang();
  const isFa = lang === "fa";
  const title = isFa ? project.title_fa : project.title_en;
  const description = isFa ? project.desc_fa : project.desc_en;

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/10 transition-colors duration-300 flex flex-col"
    >
      {/* Gradient accent bar */}
      <div className={`h-[2px] w-full bg-gradient-to-r ${project.color} shrink-0`} />

      {/* Card glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`}
      />

      {/* Cover image */}
      {project.imageUrl ? (
        <div className="relative w-full h-44 overflow-hidden shrink-0">
          <Image
            src={project.imageUrl}
            alt={project.imageAlt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]/60" />
        </div>
      ) : null}

      <div className="p-6 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {project.featured && (
              <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded-full border border-violet-400/20 mb-2">
                Featured
              </span>
            )}
            <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors leading-snug">
              {title}
            </h3>
          </div>

          {/* Link buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={dict.projects.viewCode}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/8 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <FiGithub size={14} />
              </motion.a>
            )}
            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={dict.projects.viewLive}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/8 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <FiExternalLink size={14} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Description — dir adapts to current language */}
        <p
          className="text-sm text-white/50 leading-relaxed mb-5 line-clamp-3 flex-1"
          dir={isFa ? "rtl" : "ltr"}
        >
          {description}
        </p>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ── Empty state placeholder ───────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/20">
      <FiImage size={40} className="mb-4 opacity-30" />
      <p className="text-sm">No projects found. Add some via the Studio.</p>
    </div>
  );
}

// ── Projects section (client shell) ──────────────────────────────────────────

/**
 * Receives pre-fetched projects from the parent Server Component (page.tsx).
 * Falls back to an empty state with a hint if no data is available.
 */
export default function Projects({
  projects,
}: {
  projects: NormalisedProject[];
}) {
  const { dict } = useLang();

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-violet-400 mb-3">
            {dict.projects.subheading}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            {dict.projects.heading}
          </h2>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.length === 0 ? (
            <EmptyState />
          ) : (
            projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))
          )}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/amireftekharv"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm font-semibold text-white/60 hover:text-white hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200"
          >
            <FiGithub size={16} />
            {dict.projects.viewMore}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
