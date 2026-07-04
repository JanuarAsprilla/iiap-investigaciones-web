import type { MetadataRoute } from "next";
import { SITE_URL, CANONICAL_BASE, IS_INDEXABLE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Entorno no productivo (p. ej. el preview de Render): bloquea todo rastreo.
  if (!IS_INDEXABLE) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  // Producción real (NEXT_PUBLIC_ALLOW_INDEXING=true): indexación normal.
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // El Studio de Sanity y las rutas de API no deben indexarse.
        disallow: ["/studio", "/api/"],
      },
    ],
    sitemap: `${CANONICAL_BASE}/sitemap.xml`,
    host: SITE_URL,
  };
}
