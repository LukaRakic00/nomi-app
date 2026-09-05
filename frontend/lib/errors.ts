import type { z } from "zod";

/** Osnovna greška aplikacije. Sve greške koje sami bacamo nasleđuju je. */
export class AppError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "AppError";
  }
}

/** Server je odgovorio statusom van 2xx opsega. */
export class HttpError extends AppError {
  readonly status: number;
  readonly url: string;

  constructor(status: number, url: string, options?: { cause?: unknown }) {
    super(`HTTP ${status} na ${url}`, options);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
  }
}

/** Odgovor servera ne odgovara očekivanoj Zod šemi. */
export class ValidationError extends AppError {
  readonly issues: z.core.$ZodIssue[];

  constructor(message: string, issues: z.core.$ZodIssue[], options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ValidationError";
    this.issues = issues;
  }
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

/**
 * Prevodi bilo koju grešku u kratku poruku za korisnika.
 *
 * Nikada ne vraća tekst koji je poslao server, `error.message` ni stack trace —
 * takav sadržaj može da odaje interne detalje.
 */
export function getUserMessage(error: unknown): string {
  if (isHttpError(error)) {
    if (error.status === 401) {
      return "Niste prijavljeni. Prijavite se i pokušajte ponovo.";
    }
    if (error.status === 403) {
      return "Nemate pristup ovom sadržaju.";
    }
    if (error.status === 404) {
      return "Traženi sadržaj nije pronađen.";
    }
    if (error.status === 429) {
      return "Previše zahteva u kratkom periodu. Pokušajte za trenutak.";
    }
    if (error.status >= 500) {
      return "Server trenutno nije dostupan. Pokušajte ponovo za trenutak.";
    }
    return "Zahtev nije mogao da se izvrši. Proverite podatke i pokušajte ponovo.";
  }

  if (isValidationError(error)) {
    return "Podaci sa servera nisu u očekivanom formatu. Pokušajte ponovo kasnije.";
  }

  return "Došlo je do neočekivane greške. Pokušajte ponovo.";
}
