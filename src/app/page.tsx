import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { getSanityProjects } from "@/lib/sanity.client";
import type { NormalisedProject } from "@/lib/sanity.types";
import localProjectsData from "@/data/projects.json";

/**
 * Map the local JSON (which already uses the normalised key names) to the
 * NormalisedProject type so TypeScript is satisfied without a cast.
 */
function mapLocalProjects(): NormalisedProject[] {
  return (localProjectsData as NormalisedProject[]);
}

/**
 * Root page — Server Component.
 * Fetches projects from Sanity; falls back to the local JSON file
 * if the Sanity Project ID is not configured yet.
 */
export default async function Home() {
  let projects: NormalisedProject[];

  const sanityProjects = await getSanityProjects();

  if (sanityProjects.length > 0) {
    projects = sanityProjects.map((p) => ({ ...p, id: p._id }));
  } else {
    projects = mapLocalProjects();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <TechStack />
      <Projects projects={projects} />
      <Contact />
    </main>
  );
}
