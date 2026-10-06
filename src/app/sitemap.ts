import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { site } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/catalog",
    "/collections",
    "/about",
    "/delivery",
    "/contacts",
    "/legal/privacy",
    "/legal/terms",
    "/legal/returns",
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...categories.map((c) => ({
      url: `${site.url}/catalog/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${site.url}/product/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
