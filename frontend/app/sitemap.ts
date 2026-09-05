import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// Statične rute se dodaju u listu ispod. Dinamičke rute se dobijaju pozivom
// servisa i mapiranjem rezultata — funkcija tada postaje `async`.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
