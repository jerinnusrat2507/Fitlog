"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/lib/plan-context";
import { IconDumbbell } from "@/components/icons";

const links = [
  { href: "/#library", label: "Workout", match: "/" },
  { href: "/my-plan", label: "My Plan", match: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 focus-ring rounded-card">
          <IconDumbbell className="h-6 w-6 text-acid" />
          <span className="font-display text-xl uppercase tracking-wide text-bone">
            FitLog
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.match;
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`font-display text-sm uppercase tracking-wider transition-colors focus-ring rounded-card ${
                  active ? "text-acid" : "text-muted hover:text-bone"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-acid px-3 py-1.5 text-xs font-display font-semibold uppercase tracking-wide text-ink transition-transform hover:scale-105 focus-ring"
          >
            Plan <span className="tabular-nums">{plan.length}</span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-display font-semibold uppercase tracking-wide text-bone transition-colors hover:border-acid hover:text-acid focus-ring"
          >
            Saved <span className="tabular-nums">{saved.length}</span>
          </Link>
        </div>
      </div>

      <nav className="flex items-center justify-center gap-6 border-t border-border/60 py-2 md:hidden">
        {links.map((l) => {
          const active = pathname === l.match;
          return (
            <Link
              key={l.label}
              href={l.href}
              className={`font-display text-xs uppercase tracking-wider focus-ring rounded-card ${
                active ? "text-acid" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
