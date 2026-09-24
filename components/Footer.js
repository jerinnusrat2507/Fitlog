import { IconDumbbell } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <IconDumbbell className="h-5 w-5 text-acid" />
          <span className="font-display text-lg uppercase tracking-wide text-bone">
            FitLog
          </span>
        </div>
        <p className="font-body text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
