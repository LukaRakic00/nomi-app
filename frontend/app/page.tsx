import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

// Placeholder početna stranica. U novom projektu je ovo prvi fajl koji se menja.
export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6 lg:py-20">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{siteConfig.name}</h1>
          <p className="text-muted-foreground max-w-prose text-sm sm:text-base">
            {siteConfig.description}
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Sledeći koraci</CardTitle>
          <CardDescription>Kratak put od startera do konkretnog projekta.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="text-muted-foreground list-decimal space-y-2 pl-5 text-sm">
            <li>
              Prilagodi <code className="font-mono text-xs">config/site.ts</code> i naziv u{" "}
              <code className="font-mono text-xs">package.json</code>.
            </li>
            <li>
              Kopiraj <code className="font-mono text-xs">.env.example</code> u{" "}
              <code className="font-mono text-xs">.env.local</code>.
            </li>
            <li>
              Pročitaj <code className="font-mono text-xs">docs/architecture.md</code> i{" "}
              <code className="font-mono text-xs">docs/conventions.md</code>.
            </li>
            <li>Zameni sadržaj ove stranice.</li>
          </ol>
        </CardContent>
      </Card>
    </main>
  );
}
