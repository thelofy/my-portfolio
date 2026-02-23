"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/lib/sanity-studio-config";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/**
 * Embeds the full Sanity Studio at /studio.
 * Shows a setup page when NEXT_PUBLIC_SANITY_PROJECT_ID is not configured.
 */
export default function StudioPage() {
  if (!projectId) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#1a1a1a",
          color: "#e5e5e5",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "480px", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Sanity Studio — Setup Required
          </h1>
          <p style={{ color: "#a3a3a3", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Add <code style={{ background: "#333", padding: "0.2em 0.5em", borderRadius: "4px" }}>NEXT_PUBLIC_SANITY_PROJECT_ID</code> to your{" "}
            <code style={{ background: "#333", padding: "0.2em 0.5em", borderRadius: "4px" }}>.env.local</code> file.
          </p>
          <ol style={{ textAlign: "left", color: "#a3a3a3", lineHeight: 2 }}>
            <li>Copy <code>.env.local.example</code> → <code>.env.local</code></li>
            <li>Create a project at{" "}
              <a href="https://sanity.io/manage" target="_blank" rel="noopener noreferrer" style={{ color: "#8b5cf6" }}>
                sanity.io/manage
              </a>
            </li>
            <li>Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id</code></li>
            <li>Restart the dev server</li>
          </ol>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
