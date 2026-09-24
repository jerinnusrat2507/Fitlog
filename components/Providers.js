"use client";

import { FitlogProvider } from "@/lib/fitlog-context";
import { PlanProvider } from "@/lib/plan-context";
import { ToastProvider } from "@/lib/toast-context";

export default function Providers({ children }) {
  return (
    <FitlogProvider>
      <PlanProvider>
        <ToastProvider>{children}</ToastProvider>
      </PlanProvider>
    </FitlogProvider>
  );
}
