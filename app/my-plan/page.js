"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useFitlog } from "@/lib/fitlog-context";
import { usePlan } from "@/lib/plan-context";
import { useToast } from "@/lib/toast-context";
import PlanCard from "@/components/PlanCard";
import { IconDumbbell } from "@/components/icons";

const TABS = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

export default function MyPlanPage() {
  const [tab, setTab] = useState("plan");
  const { workouts, loading } = useFitlog();
  const {
    plan,
    saved,
    planFull,
    removeFromPlan,
    toggleDone,
    addToPlan,
    removeFromSaved,
    isInPlan,
  } = usePlan();
  const { showToast } = useToast();

  const planWorkouts = useMemo(
    () =>
      plan
        .map((p) => {
          const w = workouts.find((wk) => wk.id === p.id);
          return w ? { ...w, done: p.done } : null;
        })
        .filter(Boolean),
    [plan, workouts]
  );

  const savedWorkouts = useMemo(
    () => saved.map((id) => workouts.find((w) => w.id === id)).filter(Boolean),
    [saved, workouts]
  );

  const metrics = useMemo(() => {
    return planWorkouts.reduce(
      (acc, w) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + w.duration,
        calories: acc.calories + w.caloriesBurned,
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [planWorkouts]);

  const list = tab === "plan" ? planWorkouts : savedWorkouts;
  const showLoading = loading && (plan.length > 0 || saved.length > 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <h1 className="font-display text-3xl uppercase text-bone sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 font-body text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          ["Exercises", metrics.exercises],
          ["Minutes", metrics.minutes],
          ["Calories", metrics.calories],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-card border border-border bg-card px-3 py-4 text-center sm:px-5 sm:py-5"
          >
            <p className="font-display text-2xl text-acid sm:text-3xl">{value}</p>
            <p className="mt-1 font-display text-[10px] uppercase tracking-wide text-muted sm:text-xs">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-2 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-1 pb-3 font-display text-sm uppercase tracking-wide transition-colors focus-ring ${
              tab === t.key
                ? "border-b-2 border-acid text-acid"
                : "text-muted hover:text-bone"
            }`}
          >
            {t.label} ({t.key === "plan" ? plan.length : saved.length})
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {showLoading && (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-acid" />
            <p className="font-body text-sm text-muted">Loading workouts…</p>
          </div>
        )}

        {!showLoading && list.length === 0 && (
          <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border bg-card px-6 py-16 text-center">
            <IconDumbbell className="h-8 w-8 text-muted" />
            <h2 className="font-display text-lg uppercase text-bone">
              Nothing Here Yet
            </h2>
            <p className="max-w-xs font-body text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-2 rounded-card bg-acid px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wide text-ink"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {!showLoading &&
          tab === "plan" &&
          planWorkouts.map((w) => (
            <PlanCard
              key={w.id}
              workout={w}
              done={w.done}
              onMarkDone={() => {
                toggleDone(w.id);
                showToast(w.done ? "Marked as not done" : "Marked as done");
              }}
              onRemove={() => {
                removeFromPlan(w.id);
                showToast("Removed from today's plan");
              }}
            />
          ))}

        {!showLoading &&
          tab === "saved" &&
          savedWorkouts.map((w) => (
            <PlanCard
              key={w.id}
              workout={w}
              onAddToPlan={
                isInPlan(w.id)
                  ? undefined
                  : () => {
                      addToPlan(w.id);
                      showToast("Added to today's plan");
                    }
              }
              addDisabled={planFull}
              onRemove={() => {
                removeFromSaved(w.id);
                showToast("Removed from saved");
              }}
            />
          ))}
      </div>
    </div>
  );
}
