"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_CAP = 5;

const PlanContext = createContext(null);

function readStorage(key) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(readStorage(PLAN_KEY));
    setSaved(readStorage(SAVED_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const isInPlan = (id) => plan.some((p) => p.id === id);
  const isSaved = (id) => saved.includes(id);
  const planFull = plan.length >= PLAN_CAP;

  const addToPlan = (id) => {
    if (isInPlan(id) || planFull) return false;
    setPlan((prev) => [...prev, { id, done: false }]);
    return true;
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleDone = (id) => {
    setPlan((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  };

  const addToSaved = (id) => {
    if (isSaved(id)) return false;
    setSaved((prev) => [...prev, id]);
    return true;
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((s) => s !== id));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        planCap: PLAN_CAP,
        planFull,
        isInPlan,
        isSaved,
        addToPlan,
        removeFromPlan,
        toggleDone,
        addToSaved,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within PlanProvider");
  return ctx;
}
