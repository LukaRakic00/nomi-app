import { z } from "zod";

/**
 * Klijentske environment promenljive.
 *
 * `NEXT_PUBLIC_API_URL` je namerno opcion — starter podržava i projekte koji
 * nemaju backend. Ako projekat nikada ne komunicira sa API-jem, ovo polje i
 * `lib/http.ts` se mogu obrisati.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
});

// Next.js zamenjuje vrednost samo kod statičkog pristupa članu
// (`process.env.NEXT_PUBLIC_X`), zato se svaka promenljiva navodi pojedinačno.
// Prosleđivanje celog `process.env` objekta bi u klijentskom bundle-u dalo undefined.
export const env = clientEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
