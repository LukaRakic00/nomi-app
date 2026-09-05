import { env } from "@/lib/env";

/**
 * Jedini izvor istine za identitet sajta. Metadata, `robots.ts`, `sitemap.ts` i
 * OG slika čitaju odavde — promena ovde propagira svuda.
 *
 * Ovo je prvi fajl koji treba prilagoditi u novom projektu.
 */
export const siteConfig = {
  name: "Frontend Starter",
  description:
    "Univerzalna osnova za frontend projekte: Next.js, React, TypeScript, Tailwind i shadcn/ui.",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "sr-RS",
  ogLocale: "sr_RS",
} as const;
