"use client";

import { useRef, useState } from "react";
import { IconChevronDown } from "@/components/icons";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = OPTIONS.find((o) => o.value === value) || OPTIONS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-card border border-border bg-card px-3.5 py-2 font-display text-xs uppercase tracking-wide text-bone transition-colors hover:border-acid focus-ring"
      >
        Sort by: <span className="text-acid">{current.label}</span>
        <IconChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <ul
            role="listbox"
            className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-card border border-border bg-card shadow-[0_12px_28px_rgba(0,0,0,0.5)]"
          >
            {OPTIONS.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o.value === value}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`block w-full px-3.5 py-2.5 text-left font-body text-sm transition-colors hover:bg-ink ${
                    o.value === value ? "text-acid" : "text-bone"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
