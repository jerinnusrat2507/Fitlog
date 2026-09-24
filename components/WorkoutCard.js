import Link from "next/link";
import Image from "next/image";
import { IconClock, IconFlame, IconStar } from "@/components/icons";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-card transition-colors hover:border-acid/60 focus-ring"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 font-display text-[10px] uppercase tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-base uppercase leading-snug text-bone">
          {workout.name}
        </h3>

        <p className="font-body text-xs text-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 font-body text-xs text-muted">
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
    </Link>
  );
}
