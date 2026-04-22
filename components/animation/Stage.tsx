"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TimelineContext } from "@/lib/animation/context";
import { clamp } from "@/lib/animation/easing";
import { PlaybackBar } from "./PlaybackBar";

type StageProps = {
  width?: number;
  height?: number;
  duration?: number;
  background?: string;
  fps?: number;
  loop?: boolean;
  autoplay?: boolean;
  persistKey?: string;
  children: ReactNode;
};

export function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = "#f6f4ef",
  loop = true,
  autoplay = true,
  persistKey = "animstage",
  children,
}: StageProps) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ":t") || "0");
      if (isFinite(v)) setTime(clamp(v, 0, duration));
    } catch {
      /* noop */
    }
    if (autoplay) setPlaying(true);
    setMounted(true);
  }, [persistKey, duration, autoplay]);

  const stageRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  // Persist playhead
  useEffect(() => {
    try {
      localStorage.setItem(persistKey + ":t", String(time));
    } catch {
      /* noop */
    }
  }, [time, persistKey]);

  // Auto-scale to fit container
  useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(
        el.clientWidth / width,
        (el.clientHeight - barH) / height,
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

  // Animation loop
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

  // Keyboard: space = play/pause, ← → = seek
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target &&
        ((e.target as HTMLElement).tagName === "INPUT" ||
          (e.target as HTMLElement).tagName === "TEXTAREA")
      )
        return;
      if (e.code === "Space") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.code === "ArrowLeft") {
        setTime((t) => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === "ArrowRight") {
        setTime((t) => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === "0" || e.code === "Home") {
        setTime(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [duration]);

  const displayTime = hoverTime != null ? hoverTime : time;

  const handleHover = useCallback((t: number | null) => {
    setHoverTime(t);
  }, []);

  const handleSeek = useCallback((t: number) => {
    setTime(t);
  }, []);

  const ctxValue = useMemo(
    () => ({ time: displayTime, duration, playing, setTime, setPlaying }),
    [displayTime, duration, playing],
  );

  return (
    <div
      ref={stageRef}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#0a0a0a",
        fontFamily: "Inter, system-ui, sans-serif",
        // Responsive height: aspect ratio based with some breathing room
        aspectRatio: `${width} / ${height}`,
        maxHeight: "80vh",
        overflow: "hidden",
        borderRadius: 12,
      }}
    >
      {/* Canvas area */}
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          minHeight: 0,
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
            boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          <TimelineContext.Provider value={ctxValue}>
            {children}
          </TimelineContext.Provider>
        </div>
      </div>

      {/* Playback bar */}
      <PlaybackBar
        time={displayTime}
        actualTime={time}
        duration={duration}
        playing={playing}
        onPlayPause={() => setPlaying((p) => !p)}
        onReset={() => setTime(0)}
        onSeek={handleSeek}
        onHover={handleHover}
      />
    </div>
  );
}
