"use client";

import { useLenis } from "lenis/react";
import { useCallback } from "react";

export function useScrollToSection() {
  const lenis = useLenis();

  return useCallback(
    (elementId: string) => {
      const el = document.getElementById(elementId);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el, {
          programmatic: true,
          duration: 1.35,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        el.scrollIntoView({ behavior: "auto" });
      }
    },
    [lenis]
  );
}
