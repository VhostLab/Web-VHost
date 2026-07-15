import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    // Fecha de última revisión real: alimenta el "Actualizado:" visible
    // y el dateModified del schema Article (señal de frescura GEO)
    updatedDate: z.coerce.date(),
    author: z.string(),
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
