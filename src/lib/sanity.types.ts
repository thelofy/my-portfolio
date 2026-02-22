/**
 * Typed shape returned by the projectsQuery GROQ projection.
 * Keep this in sync with sanity/schemas/project.ts.
 */
export interface SanityProject {
  _id: string;
  title_en: string;
  title_fa: string;
  desc_en: string;
  desc_fa: string;
  /** Fully-resolved CDN URL (projected from image.asset->url) */
  imageUrl: string | null;
  imageAlt: string | null;
  github_url: string | null;
  live_url: string | null;
  technologies: string[];
  featured: boolean;
  color: string;
}

/**
 * Normalised shape used by the ProjectCard UI component.
 * Both Sanity documents and the local JSON fallback are mapped to this type.
 */
export interface NormalisedProject {
  id: string;
  title_en: string;
  title_fa: string;
  desc_en: string;
  desc_fa: string;
  imageUrl: string | null;
  imageAlt: string | null;
  github_url: string | null;
  live_url: string | null;
  technologies: string[];
  featured: boolean;
  color: string;
}
