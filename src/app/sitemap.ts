import type { MetadataRoute } from "next";
import { CANONICAL_BASE, SITE_ROUTES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITE_ROUTES.map(({ path, priority }) => ({
    // Incluye la subruta institucional (p. ej. /investigacion) vía CANONICAL_BASE.
    url: `${CANONICAL_BASE}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/actualidades" ? "weekly" : "monthly",
    priority,
  }));
}
