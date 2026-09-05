<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Frontend Starter

Univerzalni frontend starter. Sav tekst u UI-ju, komentarima i dokumentaciji je na
srpskom; identifikatori su na engleskom.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 5.9 · Tailwind v4 · shadcn/ui ·
Zod · React Hook Form · next-themes. Paket menadžer je **bun**.

## Komande

```bash
bun run dev          # razvojni server
bun run build        # produkcijski build
bun run check        # typecheck + lint + format (obavezno pre završetka)
bun run format       # Prettier write
```

## Pravila i dokumentacija

Obavezujuća pravila su u `.cursor/rules/`. Počni od `core.mdc` (radni tok i
definicija gotovog posla) i `architecture.mdc` (struktura foldera i slojevi).

- `docs/architecture.md` — slojevi, gde ide šta, kada uvesti nove foldere
- `docs/conventions.md` — imenovanje i kanonski obrasci (servis, forma, greška)
- `docs/optional-modules.md` — proširenja koja starter namerno ne sadrži
