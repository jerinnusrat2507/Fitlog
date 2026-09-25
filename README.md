# FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of
twelve lifts, drill into a detailed workout page, lock lifts into **Today's
Plan** (capped at five), save others for later, and track live totals for
exercises, minutes, and calories — all persisted across reloads.

Live Link: https://stellar-melomakarona-eb98c8.netlify.app
GitHub Repository Link: https://github.com/jerinnusrat2507/Fitlog

## Technologies used

- **Next.js 16 (App Router)** — routing, layouts, and page navigation
- **React 18** — component state and context for the plan/saved data
- **Tailwind CSS** — styling, responsive layout, and the dark/acid-green theme
- **Fontsource (Oswald + Inter)** — self-hosted display and body typefaces
- **Browser `localStorage`** — persists Today's Plan and Saved across reloads
- **Public FitLog API** — `https://api.abcz.workers.dev/api/fitlog` for workout data

## Features

1. **Workout library grid** — all twelve lifts from the API rendered as cards
   (image, category tags, equipment, duration/calories/rating), responsive
   from a single column on mobile up to a 3-column grid on desktop.
2. **Sort and search** — re-sort the library by Duration, Calories, or
   Rating, or search by name/tag, with results updating instantly.
3. **Workout detail pages** — a two-column layout with a large image, key
   specs table, numbered instructions, and actions to add the lift to
   Today's Plan or save it for later, each confirmed with a toast.
4. **Today's Plan / Saved workspace** (`/my-plan`) — tabbed lists with live
   summary cards (Exercises, Minutes, Calories), a five-lift cap, and
   per-card actions: View Details, Mark as Done, and Remove.
5. **Persistent state** — the plan and saved lists, plus the navbar's Plan
   and Saved counters, are stored in `localStorage` so they survive a page
   reload.
6. **Resilient routing** — a custom 404 page for unknown routes, and a
   loading state while workout data is being fetched, so a reload never
   errors out.

## Getting started

Requires **Node.js 20.9 or newer** (`node -v` to check).

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Build

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.js            root layout: fonts, providers, navbar, footer
  page.js               home page: hero + library
  workout/[id]/page.js  workout detail page
  my-plan/page.js        Today's Plan / Saved page
  not-found.js           custom 404
components/              Navbar, Footer, Hero, Library, WorkoutCard, PlanCard, SortDropdown, icons
lib/                     FitlogProvider (API data), PlanProvider (localStorage), ToastProvider
```
