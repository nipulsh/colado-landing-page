"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { TimelineContext } from "@/lib/animation/context";

type StageProps = {
  width?: number;
  height?: number;
  duration?: number;
  background?: string;
  fps?: number;
  loop?: boolean;
  autoplay?: boolean;
  /** Accepted for backwards compatibility; no longer persists state. */
  persistKey?: string;
  onTimeUpdate?: (time: number) => void;
  /**
   * Optional externally-driven time (e.g. scroll-scrub). When provided, the
   * internal RAF loop is suspended and the stage plays wherever the host
   * sets `externalTime`. Pass `null` to resume internal playback.
   */
  externalTime?: number | null;
  children: ReactNode;
};

export function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = "#f6f4ef",
  loop = true,
  autoplay = true,
  onTimeUpdate,
  externalTime,
  children,
}: StageProps) {
  const [internalTime, setInternalTime] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [scale, setScale] = useState(1);
  const externallyDriven = typeof externalTime === "number";

  // When externalTime is given we use it directly; otherwise use the
  // internal RAF-driven clock. Computing this outside of state avoids
  // a render cascade for every frame of the parent's scroll.
  const time = externallyDriven ? (externalTime as number) : internalTime;
  const setTime = setInternalTime;
  const playing = autoplay && !externallyDriven && !stopped;
  const setPlaying = (v: boolean | ((p: boolean) => boolean)) => {
    setStopped((prev) => {
      const next = typeof v === "function" ? (v as (p: boolean) => boolean)(!prev) : v;
      return !next;
    });
  };

  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    onTimeUpdate?.(time);
  }, [time, onTimeUpdate]);

  useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const s = Math.min(
        el.clientWidth / width,
        el.clientHeight / height,
      );
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [width, height]);

  useEffect(() => {
    if (!playing || externallyDriven) {
      lastTsRef.current = null;
      return;
    }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime((t) => {
        let next = t + dt;
        if (next >= duration) {
          if (loop) next = next % duration;
          else {
            next = duration;
            setPlaying(false);
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loop, externallyDriven]);

  const ctxValue = useMemo(
    () => ({ time, duration, playing, setTime, setPlaying }),
    [time, duration, playing],
  );

  return (
    <div
      ref={stageRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width,
          height,
          background,
          position: "relative",
          transform: `scale(${scale})`,
          transformOrigin: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <TimelineContext.Provider value={ctxValue}>
          {children}
        </TimelineContext.Provider>
      </div>
    </div>
  );
}
