import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div
      className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6 lg:py-20"
      aria-busy="true"
      aria-label="Sadržaj se učitava"
    >
      <div className="space-y-3">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  );
}
