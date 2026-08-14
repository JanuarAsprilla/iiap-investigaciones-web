// Dominio del sitio institucional; se sirve bajo la subruta /investigacion (BASE_PATH).
const SITE_URL_FALLBACK = "https://iiap.org.co";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_FALLBACK)
  .replace(/\/$/, "");

// En producción: "/investigacion". Vacío en el preview de Render (se sirve en la raíz).
// Debe coincidir con `basePath` en next.config.ts.
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  ""
);

export const CANONICAL_BASE = `${SITE_URL}${BASE_PATH}`;

export const SITE_NAME = "Subdirección de Investigaciones — IIAP";

// No indexable por defecto, para que el preview de Render no aparezca en buscadores.
// Se activa solo en el dominio definitivo con NEXT_PUBLIC_ALLOW_INDEXING=true.
export const IS_INDEXABLE =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const SITE_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/planeacion", priority: 0.8 },
  { path: "/centros", priority: 0.8 },
  { path: "/componentes", priority: 0.8 },
  { path: "/grupos", priority: 0.8 },
  { path: "/actualidades", priority: 0.7 },
];
