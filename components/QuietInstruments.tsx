"use client";

/**
 * QuietInstruments — The centerpiece animated experience.
 * Assembles the Stage with all 6 scenes.
 *
 * Layout: starts full-bleed (covering the viewport below the nav) during the
 * intro scene (0–5s), then smoothly settles into a contained, embedded panel
 * once the intro completes. Subsequent loops stay embedded.
 */

import { useCallback, useState } from "react";
import { Stage } from "@/components/animation/Stage";
import { SceneIntro } from "@/components/scenes/SceneIntro";
import { SceneCollapse } from "@/components/scenes/SceneCollapse";
import { SceneInstrument } from "@/components/scenes/SceneInstrument";
import { SceneMovements } from "@/components/scenes/SceneMovements";
import { SceneOneMove } from "@/components/scenes/SceneOneMove";
import { SceneSignoff } from "@/components/scenes/SceneSignoff";

const INTRO_END = 5;
const SETTLE_AT = 4.5;

export function QuietInstruments() {
  const [embedded, setEmbedded] = useState(false);

  const handleTime = useCallback(
    (t: number) => {
      if (!embedded && t >= SETTLE_AT && t < INTRO_END + 1) {
        setEmbedded(true);
      }
    },
    [embedded],
  );

  return (
    <section
      id="hero"
      aria-label="Colado — Quiet Instruments"
      data-embedded={embedded ? "true" : "false"}
      className="quiet-instruments-section"
    >
      <div className="quiet-instruments-frame">
        <div className="quiet-instruments-canvas">
          <Stage
            width={1920}
            height={1080}
            duration={40}
            background="#f4f0e6"
            persistKey="colado-video"
            onTimeUpdate={handleTime}
          >
            <SceneIntro      start={0}      end={5} />
            <SceneCollapse   start={5}      end={9.3} />
            <SceneInstrument start={9.3}    end={16.7} />
            <SceneMovements  start={16.7}   end={28} />
            <SceneOneMove    start={28}     end={36} />
            <SceneSignoff    start={36}     end={40} />
          </Stage>
        </div>
      </div>
    </section>
  );
}
