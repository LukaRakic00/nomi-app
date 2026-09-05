// `server-only` pretvara slučajan import iz klijentske komponente u build grešku.
// To je mehanička garancija da tajne ne mogu da završe u browser bundle-u.
import "server-only";

import { z } from "zod";

/**
 * Serverske environment promenljive. Tajne (API ključevi, tokeni, konekcioni
 * stringovi) idu isključivo ovde — nikada u `lib/env.ts`.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export const serverEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
});
