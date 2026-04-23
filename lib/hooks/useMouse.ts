"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * useMouse — global pointer position. Stored in a ref and mirrored via a
 * ref-based subscription for components that need re-renders on low cadence.
 * Prefer `useMouseRef()` for transform-style work (no re-renders).
 */

type Mouse = { x: number; y: number; nx: number; ny: number };

const listeners: Set<() => void> = new Set();
let state: Mouse = { x: 0, y: 0, nx: 0, ny: 0 };
let initialized = false;

function ensureGlobalListener() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  const onMove = (e: PointerEvent) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    state = {
      x: e.clientX,
      y: e.clientY,
      nx: (e.clientX / w) * 2 - 1,
      ny: (e.clientY / h) * 2 - 1,
    };
    listeners.forEach((cb) => cb());
  };
  window.addEventListener("pointermove", onMove, { passive: true });
}

function subscribe(cb: () => void) {
  ensureGlobalListener();
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Mouse {
  return state;
}

function getServerSnapshot(): Mouse {
  return { x: 0, y: 0, nx: 0, ny: 0 };
}

export function useMouse(): Mouse {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Same data but via a ref — no re-renders. For RAF-driven transforms. */
export function useMouseRef(): React.MutableRefObject<Mouse> {
  const ref = useRef<Mouse>({ x: 0, y: 0, nx: 0, ny: 0 });
  useEffect(() => {
    ensureGlobalListener();
    const unsub = subscribe(() => {
      ref.current = state;
    });
    return unsub;
  }, []);
  return ref;
}
