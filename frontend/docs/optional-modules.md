# Opcioni moduli

Starter ih namerno **ne sadrži**. Svaki od njih je opravdan u nekim projektima, a
u većini je nepotreban teret. Ovde je recept kad ti zaista zatreba.

## TanStack Query

**Kada:** aplikacija ima puno klijentskih interakcija sa serverom — paginacija,
optimistic updates, polling, infinite scroll. Ako podaci dolaze kroz Server
Components, **ne treba ti**.

```bash
bun add @tanstack/react-query
```

Provider ide u `components/query-provider.tsx` (`"use client"`) i obavija
`{children}` u `app/layout.tsx`, unutar `ThemeProvider`. Kad broj providera
dostigne tri, premesti ih u `providers/`.

Servisi ostaju nepromenjeni — Query ih samo poziva u `queryFn`.

## Zustand

**Kada:** postoji globalno klijentsko stanje koje dele udaljeni delovi drveta i
ne pripada URL-u. Prvo proveri da li `useState` + `searchParams` rešavaju problem.

```bash
bun add zustand
```

Store-ovi idu u `store/<ime>.ts`, jedan store po domenu.

## Vitest + Testing Library

**Kada:** postoji poslovna logika u `lib/` ili `services/` koju vredi zaključati
testom. Starter nema šta da testira, zato nije uključen.

```bash
bun add -d vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Dodaj `vitest.config.ts` sa `environment: "jsdom"` i alias `@` na koren projekta,
pa skriptu `"test": "vitest"`. Ubaci `test` u `bun run check`.

Testiraj čiste funkcije i servise (sa mock-ovanim `fetch`-om). Ne testiraj
shadcn primitive.

## Playwright

**Kada:** postoje kritični tokovi kroz više strana (prijava, checkout).

```bash
bun add -d @playwright/test && bunx playwright install
```

Testovi idu u `e2e/`. Ne pokreći ih u istoj skripti kao unit testove.

## next-intl

**Kada:** aplikacija je zaista višejezična. Za jednojezičan projekat je
`language.mdc` dovoljan i i18n samo dodaje složenost.

```bash
bun add next-intl
```

Uvodi `app/[locale]/` segment — planiraj to pre nego što nastane puno ruta.

## Autentifikacija

Starter ne nameće provajdera. Bez obzira na izbor, granica ostaje ista:
sesiju validira server, token je u httpOnly cookie-ju, zaštita ruta ide kroz
`proxy.ts` ili proveru u Server Component-i.

```bash
# Supabase
bun add @supabase/supabase-js @supabase/ssr

# Clerk
bun add @clerk/nextjs
```

Tajne idu u shemu u `lib/env.server.ts`, nikada u `lib/env.ts`.

## Zaštita ruta (`proxy.ts`)

U Next.js 16 fajl je `proxy.ts` u korenu, a funkcija se zove `proxy`:

```ts
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = { matcher: ["/nalog/:path*"] };
```

Runtime je Node.js i ne može se menjati. Proxy ne vraća response body — samo
rewrite, redirect ili header-e.

## Cache Components (`use cache`)

**Kada:** stranica meša statičan i dinamičan sadržaj i želiš PPR.

```ts
// next.config.ts
const nextConfig: NextConfig = { cacheComponents: true };
```

Menja semantiku keširanja u celoj aplikaciji: `dynamic`, `revalidate` i
`fetchCache` segment konfiguracije prestaju da rade i zamenjuju se `"use cache"`
direktivom. Uvedi svesno, ne „za svaki slučaj".

## JSON-LD (structured data)

**Kada:** sadržaj ima smisla u pretrazi kao Article, Product ili Organization.
Oblik šeme je uvek domenski, zato nije u starteru.

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
```

`data` sastavljaj sam iz `siteConfig` i domenskih podataka — nikada iz
korisničkog unosa bez sanitizacije.

## Husky + lint-staged + commitlint

**Kada:** na projektu radi više ljudi i `bun run check` se zaobilazi.

```bash
bun add -d husky lint-staged @commitlint/cli @commitlint/config-conventional
bunx husky init
```

Za solo rad je `bun run check` dovoljan, a hooks dodaju trenje pri svakom
kloniranju startera.
