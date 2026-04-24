"use client";

/**
 * Marginalia — a small display-serif note in the margin when a section
 * scrolls into view. Uses SVG stroke-dashoffset for the draw-in. Typography
 * matches the Colado Design System: Instrument Serif italic (not handwriting).
 *
 * Place as a child of a `position: relative` parent; absolutely positioned.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "left" | "right";

type MarginaliaProps = {
  note: ReactNode;
  /** Which side of the parent to pin. */
  side?: Direction;
  /** Top offset (relative to parent). */
  top?: number | string;
  /** Rotation angle in degrees. */
  rotate?: number;
  /** Accent ink colour (default uses signal-priority red). */
  color?: string;
  /** Optional decoration: `circle` wraps a SVG circle next to the note. */
  decoration?: "circle" | "arrow" | "underline" | "none";
};

export function Marginalia({
  note,
  side = "right",
  top = 0,
  rotate = -2,
  color,
  decoration = "arrow",
}: MarginaliaProps) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pos =
    side === "right"
      ? { right: -210, left: "auto" as const }
      : { left: -210, right: "auto" as const };

  return (
    <motion.div
      ref={ref}
      aria-hidden
      initial={{ opacity: 0, y: 8 }}
      animate={inView && !reduce ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none hidden lg:block"
      style={{
        position: "absolute",
        width: 200,
        top,
        transform: `rotate(${rotate}deg)`,
        transformOrigin: side === "right" ? "left top" : "right top",
        color: color ?? "var(--signal-priority)",
        ...pos,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-instrument-serif), ui-serif, Georgia, serif",
          fontSize: 20,
          lineHeight: 1.2,
          fontStyle: "italic",
          letterSpacing: "-0.01em",
          display: "block",
        }}
      >
        {note}
      </span>
      {decoration !== "none" && (
        <Decoration
          kind={decoration}
          inView={inView && !reduce}
          side={side}
          color={color ?? "var(--signal-priority)"}
        />
      )}
    </motion.div>
  );
}

function Decoration({
  kind,
  inView,
  side,
  color,
}: {
  kind: "circle" | "arrow" | "underline";
  inView: boolean;
  side: Direction;
  color: string;
}) {
  if (kind === "circle") {
    return (
      <svg
        width="84"
        height="34"
        viewBox="0 0 84 34"
        style={{ marginTop: 6, overflow: "visible" }}
      >
        <motion.ellipse
          cx="42"
          cy="17"
          rx="38"
          ry="13"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          pathLength={1}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    );
  }
  if (kind === "underline") {
    return (
      <svg
        width="160"
        height="10"
        viewBox="0 0 160 10"
        style={{ marginTop: 2 }}
      >
        <motion.path
          d="M2 6 C 40 2, 100 2, 158 6"
          fill="none"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          pathLength={1}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    );
  }
  // arrow (default)
  const d =
    side === "right"
      ? "M150 10 C 120 2, 60 2, 4 16 L 14 10 M4 16 L 14 22"
      : "M10 10 C 40 2, 100 2, 156 16 L 146 10 M156 16 L 146 22";
  return (
    <svg
      width="160"
      height="30"
      viewBox="0 0 160 30"
      style={{ marginTop: 4, overflow: "visible" }}
    >
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
