# Frontend Starter

Univerzalna osnova za frontend projekte. Namena je da novi projekat počne odavde
umesto od nule — bez konkretne poslovne logike i bez pretpostavke da backend postoji.

## Stack

| Tehnologija     | Verzija             | Napomena                               |
| --------------- | ------------------- | -------------------------------------- |
| Next.js         | 16.3.3              | App Router, Turbopack                  |
| React           | 19.2.8              |                                        |
| TypeScript      | 5.9                 | strict + dodatne provere               |
| Tailwind CSS    | 4                   | CSS-first, bez `tailwind.config`       |
| shadcn/ui       | preset `radix-nova` | Radix primitivi, Lucide ikone          |
| Zod             | 4                   | validacija env-a, API odgovora i formi |
| React Hook Form | 7                   | uz `@hookform/resolvers`               |
| next-themes     | 0.4                 | dark / light / system                  |

Paket menadžer je **bun**.

## Komande

```bash
bun install
bun run dev           # razvojni server na http://localhost:3000
bun run build         # produkcijski build
bun run check         # typecheck + lint + format — mora proći pre završetka posla
bun run format        # Prettier write
bun run lint:fix      # ESLint --fix
```

## Šta prvo promeniti u novom projektu

1. `config/site.ts` — naziv, opis i locale. Odavde se hrane metadata, `robots.ts`,
   `sitemap.ts` i OG slika.
2. `package.json` — polje `name`.
3. `app/page.tsx` — placeholder početna stranica.
4. `.env.example` → kopiraj u `.env.local` i popuni `NEXT_PUBLIC_SITE_URL`.
5. `.cursor/rules/language.mdc` — ako projekat nije na srpskom.
6. `.cursor/rules/lessons-learned.mdc` — obriši lekciju o TypeScript-u ako ne važi
   više, i dodaj lekcije ovog projekta.
7. Ako projekat **nema backend**: obriši `lib/http.ts`, `data-layer.mdc` i
   `NEXT_PUBLIC_API_URL` iz `lib/env.ts` i `.env.example`.

## Struktura

```text
app/            rute, layout-i, metadata, loading/error/not-found, robots, sitemap
components/     deljene komponente (theme-provider, theme-toggle, empty-state)
components/ui/  shadcn primitivi — dodaju se preko CLI-ja
config/         site.ts — identitet sajta
lib/            env, env.server, errors, http (opciono), utils
docs/           arhitektura, konvencije, opcioni moduli
.cursor/rules/  obavezujuća pravila za AI agenta
```

Folderi `services/`, `hooks/`, `types/`, `features/`, `providers/` i `fake-api/`
namerno **ne postoje** — kreiraju se kad im se pojavi sadržaj. Pragovi su u
[docs/architecture.md](docs/architecture.md).

## Dokumentacija

- [docs/architecture.md](docs/architecture.md) — slojevi, gde ide šta, kada uvesti nove foldere
- [docs/conventions.md](docs/conventions.md) — imenovanje i kanonski obrasci
- [docs/optional-modules.md](docs/optional-modules.md) — proširenja koja starter ne sadrži

## Rad sa AI agentom

Pravila su u `.cursor/rules/`. Uvek aktivna su `core.mdc`, `architecture.mdc`,
`nextjs.mdc`, `nextjs-16.mdc`, `errors.mdc`, `security.mdc` i `language.mdc`.
Ostala se aktiviraju po tipu fajla koji se menja. `AGENTS.md` je ulazna točka za
alate koji ne čitaju `.cursor/rules/`.
