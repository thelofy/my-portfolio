import { createClient, type SanityClient } from "next-sanity";
import type { SanityProject } from "./sanity.types";

// ── Configuration ─────────────────────────────────────────────────────────────

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2024-01-01";

/**
 * Returns whether Sanity is configured.
 * The portfolio falls back to local JSON when this is false.
 */
export function isSanityConfigured(): boolean {
  return Boolean(projectId);
}

/**
 * Lazily-created Sanity client singleton.
 * Only instantiated after we confirm a projectId exists to avoid
 * build-time errors when env vars are not yet set.
 */
let _client: SanityClient | null = null;

function getClient(): SanityClient {
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
    });
  }
  return _client;
}

// ── GROQ Query ────────────────────────────────────────────────────────────────

export const projectsQuery = /* groq */ `
  *[_type == "project"] | order(order asc) {
    _id,
    title_en,
    title_fa,
    desc_en,
    desc_fa,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    github_url,
    live_url,
    technologies,
    featured,
    color
  }
`;

// ── Data Fetcher ──────────────────────────────────────────────────────────────

/**
 * Fetches all projects from Sanity, sorted by the `order` field.
 *
 * Returns an empty array (without throwing) when:
 *  - NEXT_PUBLIC_SANITY_PROJECT_ID is not set → local JSON fallback kicks in
 *  - Sanity is unreachable → graceful degradation
 */
export async function getSanityProjects(): Promise<SanityProject[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  try {
    return await getClient().fetch<SanityProject[]>(
      projectsQuery,
      {},
      {
        // Next.js ISR: revalidate every 60 seconds
        next: { revalidate: 60, tags: ["projects"] },
      }
    );
  } catch (err) {
    console.error("[Sanity] Failed to fetch projects:", err);
    return [];
  }
}
