"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Custom cursor — small dot that grows on interactive targets. Uses white +
 * mix-blend-mode: difference so underlying text inverts and stays readable.
 * Over the hero section, the cursor becomes an "instrument": a 1px crosshair
 * with a live x,y coord label in JetBrains Mono, like a drafting tool.
 */
function subscribePointerFine(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshotPointerFine(): boolean {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshotPointerFine(): boolean {
  return false;
}

function usePointerFine(): boolean {
  return useSyncExternalStore(
    subscribePointerFine,
    getSnapshotPointerFine,
    getServerSnapshotPointerFine
  );
}

export function Cursor() {
  const shouldReduce = useReducedMotion() ?? false;
  const pointerFine = usePointerFine();
  const enabled = pointerFine && !shouldReduce;
  const [hovering, setHovering] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const crosshairRef = useRef<HTMLDivElement | null>(null);
  const xLabelRef = useRef<HTMLSpanElement | null>(null);
  const yLabelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("colado-cursor");

    const onMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (nodeRef.current) {
        nodeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (crosshairRef.current) {
        crosshairRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (xLabelRef.current) {
        xLabelRef.current.textContent = `x${String(x).padStart(4, "0")}`;
      }
      if (yLabelRef.current) {
        yLabelRef.current.textContent = `y${String(y).padStart(4, "0")}`;
      }

      // Detect hover over hero section
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const inside =
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom;
        setOverHero((prev) => (prev === inside ? prev : inside));
      }
    };

    const INTERACTIVE =
      "a, button, input, textarea, select, label, [role='button'], [data-cursor='hover']";
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(INTERACTIVE)) setHovering(true);
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(INTERACTIVE)) setHovering(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);

    return () => {
      document.documentElement.classList.remove("colado-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot (standard cursor) — hidden in instrument mode */}
      <motion.div
        ref={nodeRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full bg-white mix-blend-difference"
        animate={{
          width: hovering ? 28 : overHero ? 0 : 8,
          height: hovering ? 28 : overHero ? 0 : 8,
          opacity: overHero && !hovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.4 }}
      />

      {/* Instrument crosshair — shown only over hero */}
      <motion.div
        ref={crosshairRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[69]"
        animate={{ opacity: overHero && !hovering ? 1 : 0 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Horizontal line */}
          <div
            style={{
              position: "absolute",
              left: -28,
              top: 0,
              width: 56,
              height: 1,
              background: "var(--ink)",
              opacity: 0.55,
              transform: "translateY(-0.5px)",
            }}
          />
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: -28,
              width: 1,
              height: 56,
              background: "var(--ink)",
              opacity: 0.55,
              transform: "translateX(-0.5px)",
            }}
          />
          {/* Center gap — small inner ring */}
          <div
            style={{
              position: "absolute",
              left: -3,
              top: -3,
              width: 6,
              height: 6,
              borderRadius: 3,
              border: "1px solid var(--ink)",
              background: "transparent",
              opacity: 0.75,
            }}
          />
          {/* Coord label */}
          <div
            style={{
              position: "absolute",
              left: 14,
              top: 12,
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              color: "var(--ink-soft)",
              whiteSpace: "nowrap",
              padding: "2px 6px",
              background: "color-mix(in srgb, var(--bg) 82%, transparent)",
              border: "1px solid var(--hairline-soft)",
              borderRadius: 2,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span ref={xLabelRef}>x0000</span>
            <span style={{ margin: "0 4px", opacity: 0.4 }}>·</span>
            <span ref={yLabelRef}>y0000</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
