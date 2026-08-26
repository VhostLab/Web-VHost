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
    // Juego al que pertenece la guía. Alimenta el filtro del índice y los
    // hubs por juego, que aparecen solos en cuanto haya un segundo juego.
    game: z.string().default("Minecraft"),
    // Tema de la guía: es lo que filtran los chips del índice.
    category: z.string().default("General"),
    level: z.enum(["Principiante", "Intermedio", "Avanzado"]).default("Principiante"),
    // Puntos del bloque "Resumen rápido" que abre la entrada. Es un resumen
    // del propio artículo, no información nueva; si se deja vacío, el bloque
    // no se pinta.
    summary: z.array(z.string()).default([]),
    faqs: z
      .array(z.object({ question: z.string(), answer: z.string() }))
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
