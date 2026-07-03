import type { MetadataRoute } from "next";
import { SITE_URL, SITE_ROUTES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return SITE_ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === "/actualidades" ? "weekly" : "monthly",
    priority,
  }));
}
