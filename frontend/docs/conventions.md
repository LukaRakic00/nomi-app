# Konvencije

## Imenovanje fajlova

| Tip              | Obrazac             | Primer               |
| ---------------- | ------------------- | -------------------- |
| Komponenta       | `kebab-case.tsx`    | `theme-toggle.tsx`   |
| Hook             | `use-<ime>.ts`      | `use-media-query.ts` |
| Servis           | `<domen>.ts`        | `services/users.ts`  |
| Zod šema forme   | `<ime>.schema.ts`   | `login.schema.ts`    |
| Pomoćna funkcija | `<ime>.ts` u `lib/` | `lib/format-date.ts` |

Nazivi fajlova i identifikatora su na engleskom; UI tekstovi i komentari na
srpskom (vidi `.cursor/rules/language.mdc`).

## Eksporti

Named export svuda:

```ts
export function ThemeToggle() {}
```

Default export **samo** u Next.js specijalnim fajlovima: `page`, `layout`,
`error`, `global-error`, `loading`, `not-found`, `route`, `sitemap`, `robots`,
`opengraph-image`, `proxy`.

## Kanonski obrasci

Obrasci su dokumentovani ovde, a ne scaffold-ovani u kod — inače bi svaki novi
projekat počinjao sa mrtvim primerima.

### Servis sa Zod validacijom

```ts
// services/users.ts
import { z } from "zod";

import { request } from "@/lib/http";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;

export async function getUser(id: string): Promise<User> {
  return request(`/users/${id}`, { schema: userSchema });
}

export async function getUsers(): Promise<User[]> {
  return request("/users", { schema: z.array(userSchema) });
}
```

`request` sam baca `HttpError` na status van 2xx i `ValidationError` kad odgovor
ne odgovara šemi — ne dupliraj tu logiku u servisu.

### Servis nad mock podacima

Isti potpis kao pravi servis, pa prelaz na API ne dira ni jednu komponentu:

```ts
// services/users.ts
import { fakeUsers } from "@/fake-api/users";

export async function getUsers(): Promise<User[]> {
  return usersSchema.parse(fakeUsers);
}
```

### Poziv servisa iz Server Component-e

```tsx
// app/korisnici/page.tsx
import { UsersIcon } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { getUsers } from "@/services/users";

export default async function UsersPage() {
  const users = await getUsers();

  if (users.length === 0) {
    return <EmptyState icon={UsersIcon} title="Još nema korisnika" />;
  }

  return <UserList users={users} />;
}
```

Greška se ne hvata ovde — propagira do `app/error.tsx`. Hvata se samo kad
stranica ima smislen delimičan prikaz.

### Forma

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getUserMessage } from "@/lib/errors";
import { loginSchema, type LoginValues } from "./login.schema";

export function LoginForm({ onSubmit }: { onSubmit: (values: LoginValues) => Promise<void> }) {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleSubmit(values: LoginValues) {
    try {
      await onSubmit(values);
    } catch (error) {
      // Greška vezana za polje ide na polje, ostalo na `root`.
      form.setError("root", { message: getUserMessage(error) });
      toast.error(getUserMessage(error));
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email adresa</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root ? (
          <p className="text-destructive text-sm">{form.formState.errors.root.message}</p>
        ) : null}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Prijavi se
        </Button>
      </form>
    </Form>
  );
}
```

Šema stoji pored forme:

```ts
// login.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Unesite ispravnu email adresu."),
  password: z.string().min(8, "Lozinka mora imati najmanje 8 karaktera."),
});

export type LoginValues = z.infer<typeof loginSchema>;
```

### Obrada greške u klijentskoj akciji

```tsx
try {
  await saveSettings(values);
  toast.success("Podešavanja su sačuvana.");
} catch (error) {
  toast.error(getUserMessage(error));
}
```

Nikada `toast.error(error.message)` — to može da prikaže internu ili serversku
poruku (vidi `.cursor/rules/errors.mdc`).

### Metadata stranice

```tsx
export const metadata: Metadata = {
  title: "Korisnici",
  alternates: { canonical: "/korisnici" },
};
```

`title` ne sadrži naziv sajta — dodaje ga template iz root layout-a.

## Komentari

Komentar objašnjava **nameru ili ograničenje**, nikada šta kod radi.

```ts
// Next.js zamenjuje vrednost samo kod statičkog pristupa članu.
export const env = clientEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});
```

Ne piši: `// Parsiraj env promenljive`.

## Mrtav kod

Ne ostavljaj zakomentarisan kod, `console.log`, nekorišćene importe ni
`TODO`/`FIXME` bez dogovora. `bun run check` hvata većinu ovoga.
