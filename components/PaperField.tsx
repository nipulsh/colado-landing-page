"use client";

/**
 * PaperField — three-layer paper grain with subtle parallax.
 *
 * The page's "paper" is static by default. This component gives it memory:
 * three transparent grain layers drift at different speeds, reacting to
 * cursor position and a slow sine-wave idle. Movement is capped at ±6px,
 * transformed on the GPU, and passive (pointer-events: none).
 *
 * Zero perf cost on modern browsers. Invisible until you notice it; then
 * you can't unnotice it.
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useMouseRef } from "@/lib/hooks/useMouse";

type Layer = {
  speed: number;
  amp: number;
  sineRate: number;
  opacity: number;
  size: number;
  dotRGBA: string;
};

const LAYERS: Layer[] = [
  { speed: 0.18, amp: 6, sineRate: 0.00018, opacity: 0.35, size: 6, dotRGBA: "rgba(20,20,15,0.08)" },
  { speed: 0.36, amp: 4, sineRate: 0.00032, opacity: 0.22, size: 9, dotRGBA: "rgba(20,20,15,0.06)" },
  { speed: 0.56, amp: 3, sineRate: 0.00049, opacity: 0.16, size: 14, dotRGBA: "rgba(20,20,15,0.04)" },
];

export function PaperField() {
  const reduce = useReducedMotion() ?? false;
  const mouse = useMouseRef();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = now - start;
      const mx = mouse.current.nx;
      const my = mouse.current.ny;
      for (let i = 0; i < LAYERS.length; i++) {
        const el = refs.current[i];
        if (!el) continue;
        const L = LAYERS[i];
        const drift = Math.sin(t * L.sineRate);
        const tx = mx * L.amp * L.speed + drift * L.amp * 0.45;
        const ty = my * L.amp * L.speed + Math.cos(t * L.sineRate * 1.1) * L.amp * 0.4;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, mouse]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ mixBlendMode: "multiply" }}
    >
      {LAYERS.map((L, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={{
            position: "absolute",
            inset: `-${L.amp + 4}px`,
            opacity: L.opacity,
            backgroundImage: `radial-gradient(circle at 1px 1px, ${L.dotRGBA} 0.6px, transparent 1.4px)`,
            backgroundSize: `${L.size}px ${L.size}px`,
            willChange: "transform",
            transform: "translate3d(0,0,0)",
          }}
        />
      ))}
    </div>
  );
}
