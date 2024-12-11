"use client";
import { useEffect } from "react";

export function ScrollRestoration() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}

// remove when filter component will be ready
// remove when filter component will be ready
// remove when filter component will be ready
// remove when filter component will be ready
// remove when filter component will be ready
// remove when filter component will be ready
// remove when filter component will be ready
// remove when filter component will be ready
// remove when filter component will be ready
