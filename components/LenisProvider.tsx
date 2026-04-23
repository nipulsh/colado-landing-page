"use client";

/**
 * LenisProvider — boots Lenis for smooth, weighted scrolling across the page.
 *
 * Settings for this session:
 *   - `wheelMultiplier: 0.75` → each wheel tick moves 3/4 of the browser's
 *     default distance. Effectively a ~25% reduction in scroll speed, so
 *     long reading passages glide rather than sprint.
 *   - `lerp: 0.1` → light smoothing, close to native-feeling but without
 *     the micro-stutter of raw wheel events.
 *   - Respects `prefers-reduced-motion`: disables smoothing and uses 1:1
 *     wheel/touch scaling.
 *
 * Lenis moves the native document scroll, so every other scroll-aware API
 * on the page (IntersectionObserver, rect.top measurements, framer-motion
 * useScroll, scroll event listeners) continues to work unchanged.
 */

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function LenisProvider() {
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      lerp: reduce ? 1 : 0.1,
      wheelMultiplier: reduce ? 1 : 0.75,
      touchMultiplier: reduce ? 1 : 0.95,
      smoothWheel: !reduce,
    });

    window.__lenis = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
