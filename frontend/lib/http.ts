import type { z } from "zod";

import { env } from "@/lib/env";
import { AppError, HttpError, ValidationError } from "@/lib/errors";

/**
 * OPCIONI SLOJ. Projekat bez backenda ne koristi ovaj fajl i može ga obrisati
 * zajedno sa `NEXT_PUBLIC_API_URL` u `lib/env.ts` i `.env.example`.
 *
 * Koristi native `fetch` namerno: Next.js proširuje `fetch` opcijama za keširanje
 * (`next: { revalidate, tags }`), što HTTP biblioteke poput axios-a obilaze.
 */
interface RequestOptions<TSchema extends z.ZodType> extends Omit<RequestInit, "body"> {
  /** Zod šema kojom se validira odgovor pre nego što napusti servis. */
  schema: TSchema;
  /** Telo zahteva. Serijalizuje se u JSON automatski. */
  body?: unknown;
  /** Nadjačava `NEXT_PUBLIC_API_URL` za pojedinačan zahtev. */
  baseUrl?: string;
}

function resolveUrl(path: string, baseUrl?: string): string {
  const base = baseUrl ?? env.NEXT_PUBLIC_API_URL;

  if (!base) {
    throw new AppError(
      `Nije moguće izgraditi URL za "${path}": nije postavljen NEXT_PUBLIC_API_URL, ` +
        "a ni baseUrl nije prosleđen. Postavi promenljivu ili prosledi baseUrl.",
    );
  }

  return new URL(path, base).toString();
}

/**
 * Izvršava HTTP zahtev i vraća validirane podatke.
 *
 * Baca `HttpError` za status van 2xx, `ValidationError` kad odgovor ne odgovara
 * šemi, i `AppError` kad zahtev ne može ni da se pošalje.
 */
export async function request<TSchema extends z.ZodType>(
  path: string,
  { schema, body, baseUrl, headers, ...init }: RequestOptions<TSchema>,
): Promise<z.output<TSchema>> {
  const url = resolveUrl(path, baseUrl);

  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  } catch (error) {
    throw new AppError(`Zahtev ka ${url} nije uspeo.`, { cause: error });
  }

  if (!response.ok) {
    throw new HttpError(response.status, url);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    throw new ValidationError(`Odgovor sa ${url} nije validan JSON.`, [], { cause: error });
  }

  const result = schema.safeParse(payload);
  if (!result.success) {
    throw new ValidationError(
      `Odgovor sa ${url} ne odgovara očekivanoj šemi.`,
      result.error.issues,
      {
        cause: result.error,
      },
    );
  }

  return result.data;
}
