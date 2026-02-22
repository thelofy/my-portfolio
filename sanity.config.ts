import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "amir-portfolio",
  title: "Amir Eftekhar — Portfolio CMS",

  projectId,
  dataset,

  /** Studio is served at /studio by the Next.js App Router */
  basePath: "/studio",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio Content")
          .items([
            S.listItem()
              .title("Projects")
              .schemaType("project")
              .child(S.documentTypeList("project").title("All Projects")),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
