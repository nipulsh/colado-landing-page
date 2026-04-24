"use client";

/**
 * SceneTransition — a diagonal hairline sweep that animates across the stage
 * at scene boundaries. Sits inside the Stage (so it scales with the 1920x1080
 * canvas) and reads `time` from the TimelineContext.
 *
 * Effect:
 *   - A 1px diagonal line sweeps across the frame
 *   - A thin band of paper-elev color follows right behind it
 *   - Total duration: ~0.45s per boundary
 *
 * Boundaries are provided as a list of times (seconds). The transition plays
 * on each boundary crossing, tolerating both forward-seek and loop-wrap.
 */

import { useTime } from "@/lib/animation/context";
import { clamp } from "@/lib/animation/easing";

type Props = {
  boundaries: number[];
  duration?: number;
};

export function SceneTransition({ boundaries, duration = 0.45 }: Props) {
  const time = useTime();

  // Find the active boundary (if any) whose window contains `time`.
  // Not memoized — the check is a tiny linear scan and the parent re-renders
  // at RAF-or-scroll cadence already.
  const active = findActiveBoundary(boundaries, time, duration);

  if (!active) return null;

  // t is 0..1 across the transition window
  const t = clamp(active.t, 0, 1);
  // Easing (ease-in-out cubic)
  const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  /*
   * The sweep is a long diagonal rectangle rotated -12deg, translated across.
   * It starts off-screen left and ends off-screen right. The line itself is
   * 2px; behind it, a 120px band of paper-elev masks the outgoing scene.
   */
  const distance = 2400; // px within 1920x1080 canvas coords
  const x = -400 + eased * distance;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 50,
        overflow: "hidden",
      }}
    >
      {/* Paper band trailing the hairline */}
      <div
        style={{
          position: "absolute",
          left: x - 160,
          top: -240,
          width: 160,
          height: 1560,
          background:
            "linear-gradient(90deg, rgba(244,240,230,0) 0%, rgba(244,240,230,0.95) 60%, rgba(244,240,230,0.95) 100%)",
          transform: "rotate(-12deg)",
          transformOrigin: "top left",
          willChange: "transform, left",
        }}
      />
      {/* The hairline itself */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: -240,
          width: 2,
          height: 1560,
          background: "#0e0f0c",
          transform: "rotate(-12deg)",
          transformOrigin: "top left",
          boxShadow: "0 0 0 0.5px rgba(20,20,15,0.25)",
          willChange: "left",
        }}
      />
    </div>
  );
}

function findActiveBoundary(
  boundaries: number[],
  time: number,
  duration: number,
): { b: number; t: number } | null {
  const half = duration / 2;
  for (const b of boundaries) {
    const delta = time - b;
    if (delta >= -half && delta <= half) {
      return { b, t: (delta + half) / duration };
    }
  }
  return null;
}
