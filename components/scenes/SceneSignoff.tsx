"use client";

/**
 * Scene 05 — Signoff (36 to 40s)
 * The wordmark stamp. "Colado." — quiet, decisive.
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

export function SceneSignoff({
  start = 36,
  end = 40,
}: {
  start?: number;
  end?: number;
}) {
  return (
    <Sprite start={start} end={end}>
      <SceneSignoffBody />
    </Sprite>
  );
}

function SceneSignoffBody() {
  const { localTime, duration } = useSprite();

  const stampT = clamp((localTime - 0.13) / 0.47, 0, 1);
  const stampOp = Easing.easeOutExpo(stampT);
  const stampScale = 1.08 - 0.08 * Easing.easeOutExpo(stampT);

  const loopT = clamp((localTime - (duration - 0.8)) / 0.8, 0, 1);
  const loopFade = 1 - Easing.easeInQuad(loopT);

  const tagT = clamp((localTime - 0.93) / 0.67, 0, 1);
  const tagOp = Easing.easeOutCubic(tagT);

  const ctaT = clamp((localTime - 1.73) / 0.6, 0, 1);
  const ctaOp = Easing.easeOutCubic(ctaT);

  const sweepT = clamp((localTime - 0.73) / 0.8, 0, 1);
  const sweepW = Easing.easeInOutCubic(sweepT) * 520;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: COLADO.paper,
        overflow: "hidden",
        opacity: loopFade,
      }}
    >
      <PaperGrain opacity={0.28} />
      <HeroFog opacity={0.5} />
      <Masthead
        leftSub="Quiet instruments, field notes"
        right="Specimen"
        rightSub="Colophon"
      />

      {/* Stamp block */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            opacity: stampOp,
            transform: `scale(${stampScale})`,
            transformOrigin: "center",
            willChange: "transform, opacity",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 260,
              lineHeight: 1,
              color: COLADO.ink,
              letterSpacing: "-0.03em",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Colado.
          </div>
        </div>

        {/* Sweep */}
        <div
          style={{
            width: 520,
            height: 1,
            position: "relative",
            background: COLADO.hairline,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: sweepW,
              background: COLADO.ink,
              height: 1,
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: tagOp,
            fontFamily: FONTS.mono,
            fontSize: 14,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: COLADO.inkSoft,
            fontWeight: 500,
          }}
        >
          An instrument for the next move.
        </div>

        {/* CTA row */}
        <div
          style={{
            opacity: ctaOp,
            marginTop: 18,
            display: "flex",
            gap: 28,
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 24px",
              borderRadius: 9999,
              background: COLADO.ink,
              color: COLADO.paper,
              fontFamily: FONTS.body,
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Get early access <span>→</span>
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 15,
              color: COLADO.inkSoft,
              borderBottom: `1px solid ${COLADO.muteSoft}`,
              paddingBottom: 2,
            }}
          >
            colado.app
          </div>
        </div>
      </div>

      {/* Corner signature */}
      <div
        style={{
          position: "absolute",
          left: 120,
          bottom: 160,
          opacity: ctaOp,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <Inst size={12} color={COLADO.muteSoft}>
          Edition 01 · Winter 2026
        </Inst>
        <Inst size={12} color={COLADO.muteSoft}>
          Built for founders &amp; students
        </Inst>
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: 160,
          opacity: ctaOp,
          textAlign: "right",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <Inst size={12} color={COLADO.muteSoft}>
          Fig. — Colophon
        </Inst>
        <Inst size={12} color={COLADO.muteSoft}>
          Pressed on bone paper
        </Inst>
      </div>

      <Folio
        coord="Colado / Landing / Colophon · Coordinate"
        idx="06"
        total="06"
      />
    </div>
  );
}
