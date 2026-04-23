"use client";

/**
 * Scene 04 — One Move (28 to 36s)
 * Everything dims. Only the NOW card remains centered.
 * "The whole point is that you stop choosing."
 */

import { Sprite } from "@/components/animation/Sprite";
import { useSprite } from "@/lib/animation/context";
import { Easing, clamp, interpolate } from "@/lib/animation/easing";
import {
  COLADO,
  FONTS,
  PaperGrain,
  HeroFog,
  Masthead,
  Folio,
  Inst,
} from "./shared";

export function SceneOneMove({
  start = 28,
  end = 36,
}: {
  start?: number;
  end?: number;
}) {
  return (
    <Sprite start={start} end={end}>
      <SceneOneMoveBody />
    </Sprite>
  );
}

function SceneOneMoveBody() {
  const { localTime, duration } = useSprite();

  const cardY = interpolate([0, 0.6], [40, 0], Easing.easeOutExpo)(localTime);
  const cardOp = interpolate([0, 0.33], [0, 1], Easing.easeOutQuart)(localTime);

  const ghostOp = interpolate(
    [0, 0.27, 1.2, 1.73],
    [0, 0.5, 0.18, 0],
    Easing.easeInOutCubic,
  )(localTime);

  const headT = clamp((localTime - 1.87) / 0.93, 0, 1);
  const headOp = Easing.easeOutCubic(headT);
  const headY = (1 - headT) * 20;

  const payT = clamp((localTime - 4.13) / 1.33, 0, 1);
  const payOp = Easing.easeOutSine(payT);

  const finT = clamp((localTime - 5.6) / 1.07, 0, 1);
  const finOp = Easing.easeOutCubic(finT);

  const outT = clamp((localTime - (duration - 0.47)) / 0.47, 0, 1);
  const outOp = 1 - Easing.easeInCubic(outT);

  const zoom = interpolate(
    [0, duration],
    [1.0, 1.035],
    Easing.easeInOutCubic,
  )(localTime);

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
      <HeroFog opacity={0.6} />
      <Masthead
        leftSub="The single next move"
        right="Specimen IV"
        rightSub="Act"
      />

      {/* Main stage */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 220,
          transform: `translateX(-50%) scale(${zoom})`,
          transformOrigin: "center top",
          width: 900,
        }}
      >
        {/* Big NOW card */}
        <div
          style={{
            opacity: cardOp,
            transform: `translateY(${cardY}px)`,
            background: COLADO.paperElev,
            border: `1px solid ${COLADO.hairline}`,
            borderRadius: 18,
            boxShadow:
              "0 1px 1px rgba(20,20,15,0.04), 0 40px 100px -36px rgba(20,20,15,0.24)",
            overflow: "hidden",
          }}
        >
          {/* Card masthead */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "22px 32px",
              borderBottom: `1px solid ${COLADO.hairline}`,
            }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 5,
                  background: COLADO.signal,
                }}
              />
              <Inst size={13}>The next move</Inst>
            </div>
            <Inst size={12} color={COLADO.muteSoft}>
              Fig. IV.a
            </Inst>
          </div>

          {/* Content */}
          <div style={{ padding: "42px 40px 36px 40px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 18,
              }}
            >
              <Inst
                size={12}
                color={COLADO.muteSoft}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                01
              </Inst>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  background: COLADO.signal,
                  color: "#fff",
                }}
              >
                NOW
              </span>
            </div>

            <h3
              style={{
                margin: 0,
                fontFamily: FONTS.display,
                fontSize: 68,
                lineHeight: 1.05,
                color: COLADO.ink,
                letterSpacing: "-0.01em",
                fontWeight: 400,
              }}
            >
              Reply to the
              <br />
              <em>investor email.</em>
            </h3>

            <div
              style={{
                marginTop: 22,
                fontFamily: FONTS.mono,
                fontSize: 13,
                letterSpacing: "0.04em",
                color: COLADO.muted,
                lineHeight: 1.6,
              }}
            >
              Last thread · 6 days silent · warm but cooling.
              <br />
              Estimated 14 minutes · fits before your 3pm block.
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px 32px",
              borderTop: `1px solid ${COLADO.hairline}`,
              background: COLADO.paper,
            }}
          >
            <Inst size={12}>The queue is invisible until done.</Inst>
            <Inst size={12} color={COLADO.accent}>
              Begin →
            </Inst>
          </div>
        </div>

        {/* Ghost rows */}
        <div
          style={{
            opacity: ghostOp,
            marginTop: 22,
            padding: "0 4px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[
            "Ship the updated pitch deck",
            "Call the design lead",
            "Book flight to Bangalore",
            "Review the hiring doc",
          ].map((t, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr auto",
                padding: "12px 12px",
                gap: 16,
                alignItems: "center",
                borderBottom: `1px solid ${COLADO.hairlineSoft}`,
              }}
            >
              <Inst size={11} color={COLADO.muteSoft}>
                {String(i + 2).padStart(2, "0")}
              </Inst>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 17,
                  color: COLADO.muted,
                }}
              >
                {t}
              </span>
              <Inst size={10} color={COLADO.muteSoft}>
                {["NEXT", "THEN", "THEN", "LATER"][i]}
              </Inst>
            </div>
          ))}
        </div>
      </div>

      {/* Right annotation */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 280,
          width: 280,
          opacity: headOp,
          transform: `translateY(${headY}px)`,
        }}
      >
        <Inst size={13}>Outcome</Inst>
        <div
          style={{
            height: 1,
            background: COLADO.hairline,
            margin: "14px 0",
          }}
        />
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 13,
            color: COLADO.inkSoft,
            letterSpacing: "0.04em",
            lineHeight: 1.6,
          }}
        >
          The rest of the list
          <br />
          dims. The top move
          <br />
          sharpens.
        </div>
      </div>

      {/* Payoff line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: 140,
          transform: "translateX(-50%)",
          width: 1400,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: payOp,
            fontFamily: FONTS.display,
            fontSize: 76,
            lineHeight: 1.15,
            color: COLADO.inkSoft,
            letterSpacing: "-0.018em",
            fontWeight: 400,
          }}
        >
          The whole point
          <br />
          is that you{" "}
          <em style={{ color: COLADO.ink }}>stop choosing.</em>
        </div>
        <div
          style={{
            marginTop: 24,
            opacity: finOp,
            fontFamily: FONTS.mono,
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: COLADO.muted,
          }}
        >
          — design principle
        </div>
      </div>

      <Folio
        coord="Colado / Landing / Act · Coordinate IV.A"
        idx="04"
        total="06"
      />
    </div>
  );
}
