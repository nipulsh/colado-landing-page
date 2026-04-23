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
  children,
}: StageProps) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (autoplay) setPlaying(true);
  }, [autoplay]);

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
    if (!playing) {
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
  }, [playing, duration, loop]);

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
