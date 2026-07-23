import { createClient } from "next-sanity";

/**
 * Cliente de Sanity para el NAVEGADOR (Actualidades en vivo).
 *
 * El dataset es de LECTURA PÚBLICA, así que no se necesita ni se expone ningún
 * token. Esto permite que la sección de Actualidades cargue el contenido en
 * tiempo real desde el CMS incluso cuando el sitio se sirve como bundle
 * estático (export): cada publicación en Sanity aparece sin recompilar.
 *
 * `useCdn: true` sirve el contenido desde la CDN de Sanity (rápido y cacheado
 * unos segundos), suficiente para una sección de novedades.
 */
export const browserClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "2kodfh48",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  perspective: "published",
});
