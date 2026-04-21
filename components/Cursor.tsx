"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Custom cursor — small 8px dot that grows to 28px with mix-blend-mode: difference
 * when hovering interactive elements. Pointer: fine only; gracefully off on touch.
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
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("colado-cursor");

    const onMove = (e: PointerEvent) => {
      if (nodeRef.current) {
        nodeRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
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
    <motion.div
      ref={nodeRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full bg-[var(--ink)]"
      style={{ mixBlendMode: "difference" }}
      animate={{
        width: hovering ? 28 : 8,
        height: hovering ? 28 : 8,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.4 }}
    />
  );
}
