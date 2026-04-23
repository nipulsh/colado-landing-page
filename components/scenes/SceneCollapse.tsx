"use client";

/**
 * Scene 01 — Collapse (5 to 9.3s)
 * The exhale. "Stop planning. Start doing." types in with strike-through.
 */

import { Sprite } from "@/components/animation/Sprite";
import { useSprite } from "@/lib/animation/context";
import { Easing, clamp } from "@/lib/animation/easing";
import {
  COLADO,
  FONTS,
  PaperGrain,
  HeroFog,
  Masthead,
  Folio,
  Inst,
} from "./shared";

export function SceneCollapse({
  start = 5,
  end = 9.3,
}: {
  start?: number;
  end?: number;
}) {
  return (
    <Sprite start={start} end={end}>
      <SceneCollapseBody />
    </Sprite>
  );
}

function SceneCollapseBody() {
  const { localTime, duration } = useSprite();

  const outT = clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
  const outOp = 1 - Easing.easeInCubic(outT);

  const stopT = clamp((localTime - 0.2) / 0.37, 0, 1);
  const stopY = (1 - Easing.easeOutExpo(stopT)) * 28;

  const startT = clamp((localTime - 1.0) / 0.87, 0, 1);
  const startY = (1 - Easing.easeOutQuart(startT)) * 20;

  const annT = clamp((localTime - 0.0) / 0.47, 0, 1);
  const annOut = clamp((localTime - 1.87) / 0.47, 0, 1);
  const annOp =
    Easing.easeOutSine(annT) * (1 - Easing.easeInCubic(annOut));

  const sweepT = clamp((localTime - 1.33) / 0.37, 0, 1);
  const sweepW = Easing.easeOutExpo(sweepT) * 680;

  const subT = clamp((localTime - 1.87) / 0.93, 0, 1);
  const subOp = Easing.easeOutSine(subT);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: COLADO.paper,
        overflow: "hidden",
        opacity: outOp,
      }}
    >
      <PaperGrain opacity={0.28} />
      <HeroFog opacity={1} />
      <Masthead
        leftSub="An instrument for the next move"
        right="Specimen"
        rightSub="Hero"
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 1440,
          display: "flex",
          flexDirection: "column",
          gap: 48,
        }}
      >
        {/* Fig marker + annotation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: annOp,
          }}
        >
          <Inst
            size={13}
            color={COLADO.muteSoft}
            style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            Fig.
          </Inst>
          <span style={{ color: COLADO.muteSoft }}>—</span>
          <Inst size={13}>
            An intelligent assistant for founders &amp; students
          </Inst>
        </div>

        {/* Headline — per-glyph typesetting blur-in */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 148,
            lineHeight: 1.12,
            color: COLADO.ink,
            letterSpacing: "-0.018em",
            fontWeight: 400,
          }}
        >
          {/* Line 1 */}
          <div
            style={{
              display: "block",
              position: "relative",
              opacity: Math.max(0.001, stopT),
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${stopY}px)`,
                willChange: "transform",
                position: "relative",
              }}
            >
              <TypesetLine
                text="Stop planning."
                localTime={localTime}
                start={0.08}
                perChar={0.028}
              />
              {/* Strikethrough sweep */}
              <span
                style={{
                  position: "absolute",
                  left: 6,
                  top: "54%",
                  width: sweepW,
                  height: 4,
                  background: COLADO.signal,
                  display: "block",
                  pointerEvents: "none",
                }}
              />
            </span>
            {/* Blinking caret at end of line 1 while typing */}
            <Caret
              visibleFrom={0.08}
              visibleUntil={1.0}
              localTime={localTime}
              color={COLADO.signal}
            />
          </div>
          {/* Line 2 */}
          <div
            style={{
              display: "block",
              fontStyle: "italic",
              opacity: Math.max(0.001, startT),
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: `translateY(${startY}px)`,
                willChange: "transform",
              }}
            >
              <TypesetLine
                text="Start doing."
                localTime={localTime}
                start={1.0}
                perChar={0.034}
              />
            </span>
          </div>
        </div>

        {/* Subline */}
        <div
          style={{
            opacity: subOp,
            fontFamily: FONTS.body,
            fontSize: 26,
            lineHeight: 1.45,
            color: COLADO.inkSoft,
            maxWidth: 760,
            fontWeight: 400,
            marginTop: 8,
          }}
        >
          Dump everything on your mind. Colado reads the context — deadlines,
          energy, what you actually have to finish — and hands back the single
          next move.
        </div>
      </div>

      <Folio
        coord="Colado / Landing / Hero · Coordinate"
        idx="01"
        total="06"
      />
    </div>
  );
}

/**
 * TypesetLine — renders each glyph individually, fading + unblurring in with
 * a per-character stagger. Spaces are rendered as non-breaking so layout is
 * stable. Completed glyphs are sharp; in-flight glyphs are blurred.
 */
function TypesetLine({
  text,
  localTime,
  start,
  perChar,
}: {
  text: string;
  localTime: number;
  start: number;
  perChar: number;
}) {
  const chars = Array.from(text);
  return (
    <>
      {chars.map((ch, i) => {
        const tStart = start + i * perChar;
        const t = clamp((localTime - tStart) / 0.18, 0, 1);
        const eased = Easing.easeOutCubic(t);
        const blur = (1 - eased) * 8;
        const opacity = eased;
        const ty = (1 - eased) * 0.18;
        const display = ch === " " ? "\u00A0" : ch;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity,
              filter: blur > 0.04 ? `blur(${blur.toFixed(2)}px)` : "none",
              transform: `translateY(${ty.toFixed(3)}em)`,
              willChange: "filter, opacity, transform",
            }}
          >
            {display}
          </span>
        );
      })}
    </>
  );
}

/** Blinking caret that sits at the end of the typesetting line. */
function Caret({
  visibleFrom,
  visibleUntil,
  localTime,
  color,
}: {
  visibleFrom: number;
  visibleUntil: number;
  localTime: number;
  color: string;
}) {
  const visible = localTime >= visibleFrom && localTime <= visibleUntil;
  if (!visible) return null;
  const blink = Math.floor(localTime * 2.3) % 2 === 0;
  return (
    <span
      style={{
        display: "inline-block",
        width: 4,
        height: "0.9em",
        background: color,
        marginLeft: 10,
        verticalAlign: "-0.08em",
        opacity: blink ? 1 : 0.15,
      }}
    />
  );
}
