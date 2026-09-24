import Link from "next/link";
import { IconDumbbell } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-3 px-4 text-center">
      <IconDumbbell className="h-8 w-8 text-acid" />
      <p className="font-display text-5xl text-bone">404</p>
      <h1 className="font-display text-xl uppercase text-bone">
        Page not racked
      </h1>
      <p className="font-body text-sm text-muted">
        That route doesn&apos;t exist in the library. Head back and pick a lift.
      </p>
      <Link
        href="/"
        className="mt-3 rounded-card bg-acid px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-ink"
      >
        Go to workouts
      </Link>
    </div>
  );
}
