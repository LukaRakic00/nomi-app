import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <p className="text-muted-foreground font-mono text-sm">404</p>
        <h1 className="text-2xl font-semibold tracking-tight">Stranica nije pronađena</h1>
        <p className="text-muted-foreground text-sm">
          Adresa je možda promenjena ili stranica više ne postoji.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Nazad na početnu</Link>
      </Button>
    </main>
  );
}
