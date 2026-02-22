import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: () => "🚀",
  fields: [
    // ── Ordering ─────────────────────────────────────────────────────────────
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (e.g. 1, 2, 3 …)",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 10,
    }),

    // ── Bilingual titles ──────────────────────────────────────────────────────
    defineField({
      name: "title_en",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "title_fa",
      title: "Title (Farsi / فارسی)",
      type: "string",
      validation: (Rule) => Rule.required().max(80),
    }),

    // ── Bilingual descriptions ────────────────────────────────────────────────
    defineField({
      name: "desc_en",
      title: "Description (English)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "desc_fa",
      title: "Description (Farsi / فارسی)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(400),
    }),

    // ── Media ─────────────────────────────────────────────────────────────────
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Short description for screen readers & SEO",
        }),
      ],
    }),

    // ── Links ─────────────────────────────────────────────────────────────────
    defineField({
      name: "github_url",
      title: "GitHub URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).warning(
          "Provide a valid GitHub URL"
        ),
    }),
    defineField({
      name: "live_url",
      title: "Live Demo URL",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"] }).warning(
          "Provide a valid live URL"
        ),
    }),

    // ── Technologies ─────────────────────────────────────────────────────────
    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "e.g. React, Laravel, Next.js, OpenAI",
    }),

    // ── Flags ─────────────────────────────────────────────────────────────────
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      description: "Show the 'Featured' badge on this project card",
      initialValue: false,
    }),

    // ── Visual ────────────────────────────────────────────────────────────────
    defineField({
      name: "color",
      title: "Gradient Color Class",
      type: "string",
      description:
        "Tailwind gradient classes for the card accent, e.g. from-violet-600 to-indigo-600",
      initialValue: "from-violet-600 to-indigo-600",
      options: {
        list: [
          { value: "from-violet-600 to-indigo-600", title: "Violet → Indigo" },
          { value: "from-red-600 to-orange-600", title: "Red → Orange" },
          { value: "from-emerald-600 to-teal-600", title: "Emerald → Teal" },
          { value: "from-blue-600 to-cyan-600", title: "Blue → Cyan" },
          { value: "from-pink-600 to-rose-600", title: "Pink → Rose" },
          { value: "from-amber-600 to-yellow-600", title: "Amber → Yellow" },
          { value: "from-sky-600 to-blue-600", title: "Sky → Blue" },
          { value: "from-fuchsia-600 to-purple-600", title: "Fuchsia → Purple" },
        ],
      },
    }),
  ],

  preview: {
    select: {
      title: "title_en",
      subtitle: "technologies",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? "Untitled Project",
        subtitle: Array.isArray(subtitle) ? subtitle.join(", ") : "",
        media,
      };
    },
  },
});
