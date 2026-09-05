"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getUserMessage } from "@/lib/errors";

// Prikazuje se samo poruka iz `getUserMessage`. Stack trace, `error.message` i
// `error.digest` se korisniku nikada ne prikazuju.
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Nešto nije u redu</h1>
        <p className="text-muted-foreground text-sm">{getUserMessage(error)}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button onClick={reset}>Pokušaj ponovo</Button>
        <Button variant="outline" asChild>
          <Link href="/">Nazad na početnu</Link>
        </Button>
      </div>
    </main>
  );
}
