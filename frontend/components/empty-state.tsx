import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  /** Ikona iz `lucide-react`. Prikazuje se kao dekoracija, skrivena od čitača ekrana. */
  icon?: LucideIcon;
  title: string;
  description?: string;
  /** Akcija koja korisniku daje izlaz iz praznog stanja, npr. dugme ili link. */
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-12 text-center",
        className,
      )}
    >
      {Icon ? <Icon className="text-muted-foreground size-8" aria-hidden="true" /> : null}
      <div className="space-y-1">
        <p className="font-medium">{title}</p>
        {description ? (
          <p className="text-muted-foreground max-w-prose text-sm">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
