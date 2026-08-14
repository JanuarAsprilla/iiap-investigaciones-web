import { createClient } from "next-sanity";

// Cliente del navegador: dataset de lectura pública, sin token. Permite que
// Actualidades muestre contenido nuevo de Sanity sin recompilar el export estático.
export const browserClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "2kodfh48",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  perspective: "published",
});
