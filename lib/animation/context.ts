"use client";

import { createContext, useContext } from "react";

// ── Timeline context ────────────────────────────────────────────────────────

export type TimelineValue = {
  time: number;
  duration: number;
  playing: boolean;
  setTime: (t: number | ((prev: number) => number)) => void;
  setPlaying: (p: boolean | ((prev: boolean) => boolean)) => void;
};

export const TimelineContext = createContext<TimelineValue>({
  time: 0,
  duration: 10,
  playing: false,
  setTime: () => {},
  setPlaying: () => {},
});

export const useTime = (): number => useContext(TimelineContext).time;
export const useTimeline = (): TimelineValue => useContext(TimelineContext);

// ── Sprite context ──────────────────────────────────────────────────────────

export type SpriteValue = {
  localTime: number;
  progress: number;
  duration: number;
  visible?: boolean;
};

export const SpriteContext = createContext<SpriteValue>({
  localTime: 0,
  progress: 0,
  duration: 0,
});

export const useSprite = (): SpriteValue => useContext(SpriteContext);
