"use client";

import { useMemo, useState } from "react";
import { useFitlog } from "@/lib/fitlog-context";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";

export default function Library() {
  const { workouts, loading, error } = useFitlog();
  const [sortBy, setSortBy] = useState("duration");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.muscleGroups.some((t) => t.toLowerCase().includes(q))
        )
      : workouts;
    return [...filtered].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [workouts, sortBy, query]);

  return (
    <section id="library" className="scroll-mt-16 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl uppercase text-bone sm:text-4xl">
              The Library
            </h2>
            <p className="mt-1 font-body text-sm text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or tag"
              className="rounded-card border border-border bg-card px-3.5 py-2 font-body text-sm text-bone placeholder:text-muted focus-ring"
            />
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {loading && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 py-16">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-acid" />
            <p className="font-body text-sm text-muted">Loading workouts…</p>
          </div>
        )}

        {error && !loading && (
          <p className="mt-10 rounded-card border border-border bg-card p-6 text-center font-body text-sm text-muted">
            Couldn&apos;t reach the library right now. Try refreshing.
          </p>
        )}

        {!loading && !error && list.length === 0 && (
          <p className="mt-10 rounded-card border border-border bg-card p-6 text-center font-body text-sm text-muted">
            No lifts match &ldquo;{query}&rdquo;.
          </p>
        )}

        {!loading && !error && list.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
