import Image from "next/image";
import { IconArrowRight } from "@/components/icons";

export default function Hero() {
  return (
    <section className="border-b border-border bg-ink">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-acid">
            Workout Library
          </p>
          <h1 className="mt-4 font-display text-4xl uppercase leading-[1.05] text-bone sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md font-body text-sm text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-card bg-acid px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide text-ink transition-transform hover:scale-[1.03] focus-ring"
          >
            Browse Workouts
            <IconArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-border bg-surface lg:aspect-square">
          <Image
            src="/images/hero-workout.png"
            alt="Anatomical illustration of a lifter performing a seated row, illustrating FitLog's workout library"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
