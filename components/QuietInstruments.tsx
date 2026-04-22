"use client";

/**
 * QuietInstruments — The centerpiece animated experience.
 * Assembles the Stage with all 6 scenes.
 * Timeline: 40 seconds (compressed from 60s prototype).
 */

import { Stage } from "@/components/animation/Stage";
import { SceneIntro } from "@/components/scenes/SceneIntro";
import { SceneCollapse } from "@/components/scenes/SceneCollapse";
import { SceneInstrument } from "@/components/scenes/SceneInstrument";
import { SceneMovements } from "@/components/scenes/SceneMovements";
import { SceneOneMove } from "@/components/scenes/SceneOneMove";
import { SceneSignoff } from "@/components/scenes/SceneSignoff";

export function QuietInstruments() {
  return (
    <section
      id="hero"
      className="relative pt-[60px] sm:pt-[60px]"
      aria-label="Colado — Quiet Instruments"
    >
      {/* The animated canvas */}
      <div className="mx-auto w-full max-w-[1400px] px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-12 lg:py-10">
        <Stage
          width={1920}
          height={1080}
          duration={40}
          background="#f4f0e6"
          persistKey="colado-video"
        >
          <SceneIntro      start={0}      end={5} />
          <SceneCollapse   start={5}      end={9.3} />
          <SceneInstrument start={9.3}    end={16.7} />
          <SceneMovements  start={16.7}   end={28} />
          <SceneOneMove    start={28}     end={36} />
          <SceneSignoff    start={36}     end={40} />
        </Stage>
      </div>
    </section>
  );
}
