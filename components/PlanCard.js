import Image from "next/image";
import Link from "next/link";
import { IconCheck, IconClock, IconFlame, IconStar, IconX } from "@/components/icons";

export default function PlanCard({
  workout,
  done,
  onMarkDone,
  onAddToPlan,
  onRemove,
  addDisabled,
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-card border border-border bg-card p-4 sm:flex-row sm:items-center ${
        done ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-24 w-full shrink-0 overflow-hidden rounded-card bg-surface sm:h-16 sm:w-16">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-base uppercase text-bone ${
            done ? "line-through decoration-acid/70" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="mt-0.5 font-body text-xs text-muted">{workout.equipment}</p>
        <div className="mt-2 flex items-center gap-4 font-body text-xs text-muted">
          <span className="flex items-center gap-1">
            <IconClock className="h-3.5 w-3.5" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <IconFlame className="h-3.5 w-3.5" /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1 text-acid">
            <IconStar className="h-3.5 w-3.5" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-card border border-border px-3.5 py-2 font-display text-xs uppercase tracking-wide text-bone transition-colors hover:border-acid hover:text-acid focus-ring"
        >
          View Details
        </Link>

        {onAddToPlan && (
          <button
            onClick={onAddToPlan}
            disabled={addDisabled}
            className="rounded-card border border-border px-3.5 py-2 font-display text-xs uppercase tracking-wide text-bone transition-colors hover:border-acid hover:text-acid focus-ring disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to Plan
          </button>
        )}

        {onMarkDone && (
          <button
            onClick={onMarkDone}
            aria-label="Mark as done"
            className={`flex items-center gap-1.5 rounded-card px-3.5 py-2 font-display text-xs uppercase tracking-wide focus-ring ${
              done ? "bg-acid text-ink" : "border border-border text-bone hover:border-acid hover:text-acid"
            }`}
          >
            <IconCheck className="h-3.5 w-3.5" /> {done ? "Done" : "Mark as Done"}
          </button>
        )}

        {onRemove && (
          <button
            onClick={onRemove}
            aria-label="Remove"
            className="flex h-8 w-8 items-center justify-center rounded-card border border-border text-muted transition-colors hover:border-acid hover:text-acid focus-ring"
          >
            <IconX className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
