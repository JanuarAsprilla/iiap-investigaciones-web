/**
 * Configuración central del sitio.
 *
 * La URL de producción se toma de la variable de entorno NEXT_PUBLIC_SITE_URL
 * (defínela en Render). Si no está presente, se usa el dominio institucional
 * del IIAP como valor por defecto. Cambia SITE_URL_FALLBACK aquí si el dominio
 * canónico es distinto — es el único lugar que hay que editar.
 */
const SITE_URL_FALLBACK = "https://www.iiap.org.co";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL_FALLBACK
).replace(/\/$/, "");

export const SITE_NAME = "Subdirección de Investigaciones — IIAP";

/** Rutas estáticas indexables del portal, con prioridad para el sitemap. */
export const SITE_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1.0 },
  { path: "/planeacion", priority: 0.8 },
  { path: "/centros", priority: 0.8 },
  { path: "/componentes", priority: 0.8 },
  { path: "/grupos", priority: 0.8 },
  { path: "/actualidades", priority: 0.7 },
];
