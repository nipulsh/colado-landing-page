"use client";

/**
 * ReducedMotionPoster — when a user opts into `prefers-reduced-motion`,
 * instead of *stripping* the hero animation, we serve a composed specimen
 * page: a single, still, art-directed frame that communicates everything
 * the animation does — but in print. No animation. No JS. No surprises.
 *
 * The same typography, palette, and layout logic as the animated scenes,
 * frozen into a bookplate.
 */

import {
  COLADO,
  FONTS,
  PaperGrain,
  HeroFog,
  Masthead,
  Folio,
  Inst,
} from "@/components/scenes/shared";

export function ReducedMotionPoster() {
  return (
    <div
      role="img"
      aria-label="Colado — Stop planning. Start doing. An intelligent assistant for founders and students."
      style={{
        position: "absolute",
        inset: 0,
        background: COLADO.paper,
        overflow: "hidden",
      }}
    >
      <PaperGrain opacity={0.32} />
      <HeroFog opacity={0.9} />

      <Masthead
        leftSub="An instrument for the next move"
        right="Specimen"
        rightSub="Colado · Edition 01"
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
          gap: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <Inst
            size={13}
            color={COLADO.muteSoft}
            style={{ letterSpacing: "0.18em" }}
          >
            Fig.
          </Inst>
          <span style={{ color: COLADO.muteSoft }}>—</span>
          <Inst size={13}>
            An intelligent assistant for founders &amp; students
          </Inst>
        </div>

        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 148,
            lineHeight: 1.08,
            color: COLADO.ink,
            letterSpacing: "-0.018em",
            fontWeight: 400,
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            Stop planning.
            <span
              style={{
                position: "absolute",
                left: 6,
                top: "54%",
                width: "100%",
                height: 4,
                background: COLADO.signal,
              }}
            />
          </div>
          <br />
          <span style={{ fontStyle: "italic" }}>Start doing.</span>
        </div>

        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 24,
            lineHeight: 1.5,
            color: COLADO.inkSoft,
            maxWidth: 820,
            fontWeight: 400,
          }}
        >
          Dump everything on your mind. Colado reads the context — deadlines,
          energy, what you actually have to finish — and hands back the single
          next move.
        </div>

        {/* Three movements summary — the animated triptych, frozen. */}
        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 40,
            borderTop: `1px solid ${COLADO.hairline}`,
            paddingTop: 32,
          }}
        >
          {[
            { roman: "I", label: "Capture", line: "Say it. Like a friend." },
            { roman: "II", label: "Prioritize", line: "We read. You trust." },
            { roman: "III", label: "Act", line: "One move. Then the next." },
          ].map((m) => (
            <div
              key={m.roman}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 56,
                    color: COLADO.ink,
                    lineHeight: 1,
                  }}
                >
                  {m.roman}
                </span>
                <Inst size={12} color={COLADO.inkSoft}>
                  {m.label}
                </Inst>
              </div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 28,
                  color: COLADO.ink,
                  lineHeight: 1.2,
                }}
              >
                {m.line}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Folio
        coord="Colado / Landing / Specimen · Poster Frame"
        idx="01"
        total="01"
      />
    </div>
  );
}
