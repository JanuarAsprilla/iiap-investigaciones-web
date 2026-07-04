/**
 * Configuración central del sitio.
 *
 * ORIGEN (dominio) del sitio, sin ruta ni barra final. Se toma de la variable
 * de entorno NEXT_PUBLIC_SITE_URL; si no está, se usa el dominio institucional
 * del IIAP. El sitio se integra bajo la subruta /investigacion (ver BASE_PATH).
 */
const SITE_URL_FALLBACK = "https://iiap.org.co";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_FALLBACK)
  .replace(/\/$/, "");

/**
 * Subruta donde se monta el portal dentro del sitio institucional.
 * En producción real: "/investigacion" (definir NEXT_PUBLIC_BASE_PATH).
 * En el preview de Render se sirve en la raíz, así que por defecto es "".
 * Debe coincidir con `basePath` en next.config.ts.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/$/,
  ""
);

/** URL canónica completa del portal (origen + subruta). */
export const CANONICAL_BASE = `${SITE_URL}${BASE_PATH}`;

export const SITE_NAME = "Subdirección de Investigaciones — IIAP";

/**
 * Guard de indexación.
 *
 * Por defecto el sitio NO es indexable — así el preview de Render (y cualquier
 * entorno que no sea la producción real) queda fuera de los buscadores.
 * El área de sistemas activa la indexación SOLO en el dominio definitivo
 * definiendo la variable de entorno:  NEXT_PUBLIC_ALLOW_INDEXING=true
 */
export const IS_INDEXABLE =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

/** Rutas estáticas indexables del portal, con prioridad para el sitemap. */
export const SITE_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/planeacion", priority: 0.8 },
  { path: "/centros", priority: 0.8 },
  { path: "/componentes", priority: 0.8 },
  { path: "/grupos", priority: 0.8 },
  { path: "/actualidades", priority: 0.7 },
];
