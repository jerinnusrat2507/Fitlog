"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useFitlog } from "@/lib/fitlog-context";
import { usePlan } from "@/lib/plan-context";
import { useToast } from "@/lib/toast-context";
import { IconArrowRight, IconBookmark, IconClock, IconFlame, IconStar } from "@/components/icons";

const SPEC_ROWS = [
  ["Equipment", "equipment"],
  ["Difficulty", "difficulty"],
  ["Sets", "sets"],
  ["Reps", "reps"],
  ["Duration", (w) => `${w.duration} min`],
  ["Calories", (w) => `${w.caloriesBurned} kcal`],
  ["Rating", "rating"],
];

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { workouts, loading, error } = useFitlog();
  const { addToPlan, addToSaved, isInPlan, isSaved, planFull } = usePlan();
  const { showToast } = useToast();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-acid" />
        <p className="font-body text-sm text-muted">Loading workout…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="font-body text-sm text-muted">
          Couldn&apos;t reach the library right now. Try refreshing.
        </p>
      </div>
    );
  }

  const workout = workouts.find((w) => String(w.id) === String(id));

  if (!workout) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl uppercase text-bone">
          Workout not found
        </h1>
        <p className="mt-2 font-body text-sm text-muted">
          That lift isn&apos;t in the library.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-card bg-acid px-5 py-2.5 font-display text-sm font-semibold uppercase text-ink"
        >
          Back to workouts
        </Link>
      </div>
    );
  }

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const addDisabled = inPlan || (planFull && !inPlan);

  function handleAddToPlan() {
    if (inPlan) return;
    if (planFull) {
      showToast("Today's plan is full — five lifts max.");
      return;
    }
    addToPlan(workout.id);
    showToast("Added to today's plan");
  }

  function handleSave() {
    if (saved) return;
    addToSaved(workout.id);
    showToast("Saved for later");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
      <button
        onClick={() => router.back()}
        className="mb-6 font-display text-xs uppercase tracking-wide text-muted transition-colors hover:text-acid focus-ring rounded-card"
      >
        ← Back
      </button>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border bg-surface lg:aspect-auto lg:h-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 font-display text-[10px] uppercase tracking-wide text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-3 font-display text-3xl uppercase leading-tight text-bone sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-3 font-body text-sm text-muted sm:text-base">
            {workout.description}
          </p>

          <div className="mt-6 flex items-center gap-5 font-body text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <IconClock className="h-4 w-4" /> {workout.duration} min
            </span>
            <span className="flex items-center gap-1.5">
              <IconFlame className="h-4 w-4" /> {workout.caloriesBurned} kcal
            </span>
            <span className="flex items-center gap-1.5 text-acid">
              <IconStar className="h-4 w-4" /> {workout.rating}
            </span>
          </div>

          <dl className="mt-6 divide-y divide-border rounded-card border border-border bg-card">
            {SPEC_ROWS.map(([label, key]) => (
              <div
                key={label}
                className="flex items-center justify-between px-4 py-2.5"
              >
                <dt className="font-display text-xs uppercase tracking-wide text-muted">
                  {label}
                </dt>
                <dd className="font-body text-sm text-bone">
                  {typeof key === "function" ? key(workout) : workout[key]}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <h2 className="font-display text-lg uppercase text-bone">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 font-body text-sm text-muted">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-acid/50 font-display text-xs text-acid">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToPlan}
              disabled={addDisabled}
              className="flex items-center justify-center gap-2 rounded-card bg-acid px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:scale-[1.02] focus-ring disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              {inPlan ? "In today's plan" : "Add to today's plan"}
              {!inPlan && <IconArrowRight className="h-4 w-4" />}
            </button>
            <button
              onClick={handleSave}
              disabled={saved}
              className="flex items-center justify-center gap-2 rounded-card border border-border px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-bone transition-colors hover:border-acid hover:text-acid focus-ring disabled:cursor-not-allowed disabled:opacity-40"
            >
              <IconBookmark className="h-4 w-4" />
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
