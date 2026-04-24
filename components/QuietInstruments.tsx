"use client";

/**
 * QuietInstruments — Centerpiece animated experience.
 *
 * The stage sits in **normal document flow** (one viewport tall): when you
 * scroll, the whole frame moves up and off the screen like any other block.
 * The film plays on a loop; it is not scroll-scrubbed and does not use a
 * sticky “pinned” frame (that mode felt like a stuck layer on top of the
 * page).
 *
 * `prefers-reduced-motion: reduce` still swaps in ReducedMotionPoster.
 */

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

  if (reduce) {
    return (
      <section
        id="hero"
        aria-label="Colado — Quiet Instruments"
        data-embedded="true"
        data-poster="true"
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
      id="hero"
      aria-label="Colado — Quiet Instruments"
      className="quiet-instruments-section"
    >
      <div className="quiet-instruments-frame">
        <div className="quiet-instruments-canvas">
          <Stage
            width={1920}
            height={1080}
            duration={DURATION}
            background="#f7f5f0"
            persistKey="colado-video"
            loop
            autoplay
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
    </section>
  );
}
