"use client";

import { createContext, useContext, useEffect, useState } from "react";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const FitlogContext = createContext(null);

export function FitlogProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Request failed with " + res.status);
        const data = await res.json();
        if (!cancelled) {
          setWorkouts(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Could not load workouts");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <FitlogContext.Provider value={{ workouts, loading, error }}>
      {children}
    </FitlogContext.Provider>
  );
}

export function useFitlog() {
  const ctx = useContext(FitlogContext);
  if (!ctx) throw new Error("useFitlog must be used within FitlogProvider");
  return ctx;
}
