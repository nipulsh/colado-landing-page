"use client";

/**
 * QuietInstruments — The centerpiece animated experience.
 *
 * Instead of auto-playing on a fixed RAF timeline, the animation is now
 * *scroll-driven*: the user's scroll progress through a tall pinned
 * container maps to the stage timeline. Pause at scene II and the scene
 * holds, pause at the boundary and the aperture wipe holds mid-sweep.
 *
 * Layout beats:
 *   1. Section is 6× viewport height tall — one "page" per scene.
 *   2. Inside, a sticky inner container pins the stage to the viewport
 *      for the duration of the scroll.
 *   3. As the user scrolls from section.top to section.bottom - 1vh,
 *      progress drives `externalTime` on the Stage.
 *   4. Once the user scrolls past the hero, the animation stops and
 *      the rest of the page flows normally.
 *
 * Accessibility:
 *   - `prefers-reduced-motion` renders a static ReducedMotionPoster instead.
 *   - J/K keyboard events jump by scene; Space toggles free-play mode.
 *
 * Free-play mode:
 *   If the user presses Space, we disengage scroll-scrub and let the
 *   animation loop on its own timer. Pressing Space again re-engages.
 */

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import { Stage } from "@/components/animation/Stage";
import { SceneIntro } from "@/components/scenes/SceneIntro";
import { SceneCollapse } from "@/components/scenes/SceneCollapse";
import { SceneInstrument } from "@/components/scenes/SceneInstrument";
import { SceneMovements } from "@/components/scenes/SceneMovements";
import { SceneOneMove } from "@/components/scenes/SceneOneMove";
import { SceneSignoff } from "@/components/scenes/SceneSignoff";
import { SceneTransition } from "@/components/scenes/SceneTransition";
import { ReducedMotionPoster } from "@/components/ReducedMotionPoster";

const DURATION = 40;
const BOUNDARIES = [5, 9.3, 16.7, 28, 36];

export function QuietInstruments() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrubTime, setScrubTime] = useState(0);
  const [embedded, setEmbedded] = useState(false);
  const [freePlay, setFreePlay] = useState(false);

  // Scroll → time mapping
  useLayoutEffect(() => {
    if (reduce || freePlay) return;
    const sec = sectionRef.current;
    if (!sec) return;

    let frame = 0;
    const measure = () => {
      if (!sec) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // Progress: 0 when the section top hits the viewport top;
        // 1 when the section bottom meets the viewport bottom.
        const scrollDist = Math.max(1, rect.height - vh);
        const scrolled = -rect.top;
        const p = Math.max(0, Math.min(1, scrolled / scrollDist));
        setScrubTime(p * DURATION);
        // "Embedded" (the animation shrinks into a panel) once we've
        // scrolled past the intro window.
        setEmbedded(p >= 5 / DURATION);
      });
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [reduce, freePlay]);

  // J / K / Space handlers from KeyboardShortcuts
  useEffect(() => {
    const onStep = (e: Event) => {
      const dir = (e as CustomEvent<number>).detail;
      // Snap to the next/prev scene boundary
      const stops = [0, ...BOUNDARIES, DURATION];
      const current = scrubTime;
      let targetT = current;
      if (dir > 0) {
        const next = stops.find((s) => s > current + 0.2);
        if (next) targetT = next;
      } else {
        const prev = [...stops].reverse().find((s) => s < current - 0.2);
        if (prev !== undefined) targetT = prev;
      }
      // Convert time back to scroll position and smooth-scroll there
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const scrollTopOfSec = window.scrollY + rect.top;
      const scrollDist = Math.max(1, rect.height - window.innerHeight);
      const p = targetT / DURATION;
      const targetScroll = scrollTopOfSec + p * scrollDist;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    };

    const onTogglePlay = () => {
      setFreePlay((v) => !v);
    };

    window.addEventListener("colado:scene-step", onStep as EventListener);
    window.addEventListener("colado:toggle-play", onTogglePlay);
    return () => {
      window.removeEventListener("colado:scene-step", onStep as EventListener);
      window.removeEventListener("colado:toggle-play", onTogglePlay);
    };
  }, [scrubTime]);

  const handleTime = useCallback((_t: number) => {
    // Stage reports its time; we ignore it since we drive time externally
    void _t;
  }, []);

  // Reduced-motion users see the poster frame instead
  if (reduce) {
    return (
      <section
        id="hero"
        aria-label="Colado — Quiet Instruments"
        data-embedded="true"
        className="quiet-instruments-section"
      >
        <div className="quiet-instruments-frame">
          <div
            className="quiet-instruments-canvas"
            style={{ position: "relative" }}
          >
            <ReducedMotionPoster />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Colado — Quiet Instruments"
      data-embedded={embedded ? "true" : "false"}
      data-freeplay={freePlay ? "true" : "false"}
      className="quiet-instruments-section quiet-instruments-scrub"
      style={{
        minHeight: "600vh",
        display: "block",
        alignItems: "initial",
        justifyContent: "initial",
      }}
    >
      <div className="quiet-instruments-sticky">
        <div className="quiet-instruments-frame">
          <div className="quiet-instruments-canvas">
            <Stage
              width={1920}
              height={1080}
              duration={DURATION}
              background="#f4f0e6"
              persistKey="colado-video"
              onTimeUpdate={handleTime}
              externalTime={freePlay ? null : scrubTime}
              autoplay={freePlay}
              loop={freePlay}
            >
              <SceneIntro      start={0}      end={5} />
              <SceneCollapse   start={5}      end={9.3} />
              <SceneInstrument start={9.3}    end={16.7} />
              <SceneMovements  start={16.7}   end={28} />
              <SceneOneMove    start={28}     end={36} />
              <SceneSignoff    start={36}     end={40} />
              <SceneTransition boundaries={BOUNDARIES} />
            </Stage>
          </div>
        </div>

        {/* Scrub progress indicator along the bottom edge */}
        {!freePlay && <ScrubIndicator t={scrubTime} />}
      </div>
    </section>
  );
}

function ScrubIndicator({ t }: { t: number }) {
  const p = Math.max(0, Math.min(1, t / DURATION));
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        background: "color-mix(in srgb, var(--ink) 8%, transparent)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: `${(p * 100).toFixed(2)}%`,
          background: "var(--ink)",
          transition: "width 80ms linear",
        }}
      />
      {/* Scene boundary ticks */}
      {BOUNDARIES.map((b, i) => {
        const pb = (b / DURATION) * 100;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${pb}%`,
              top: -3,
              bottom: -3,
              width: 1,
              background: "color-mix(in srgb, var(--ink) 24%, transparent)",
            }}
          />
        );
      })}
    </div>
  );
}
