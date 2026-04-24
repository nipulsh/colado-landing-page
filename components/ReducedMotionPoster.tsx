"use client";

/**
 * ReducedMotionPoster — when a user opts into `prefers-reduced-motion`,
 * instead of *stripping* the hero animation, we serve a composed specimen
 * page: a single, still, art-directed frame that communicates everything
 * the animation does — but in print. No animation. No JS. No surprises.
 *
 * Laid out for real viewports: fluid type, triptych stacks on narrow screens.
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
import { brandHeroSubline, siteDescription } from "@/lib/brand";

export function ReducedMotionPoster() {
  return (
    <div
      role="img"
      aria-label={`Colado — ${siteDescription}`}
      className="poster-min-h flex min-h-0 w-full max-w-full flex-1 flex-col"
      style={{ background: COLADO.paper }}
    >
      <PaperGrain opacity={0.32} />
      <HeroFog opacity={0.9} />

      <Masthead
        variant="fluid"
        right="Specimen"
        rightSub="Colado · Edition 01"
      />

      <div className="relative z-[1] flex w-full min-w-0 flex-1 flex-col justify-center px-c4 py-5 sm:px-c5 sm:py-7 md:px-c6 md:py-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-[min(100%,90rem)] min-w-0 flex-col gap-c5 sm:gap-c6 md:gap-9 lg:gap-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6rem] sm:text-[0.65rem]">
            <Inst
              size={13}
              color={COLADO.muteSoft}
              style={{ letterSpacing: "0.18em" }}
            >
              Fig.
            </Inst>
            <span style={{ color: COLADO.muteSoft }}>—</span>
            <Inst
              size={13}
              caps={false}
              style={{ letterSpacing: "0.06em", maxWidth: "100%" }}
            >
              An intelligent assistant for founders &amp; students
            </Inst>
          </div>

          <div
            className="w-full min-w-0"
            style={{
              fontFamily: FONTS.display,
              color: COLADO.ink,
              letterSpacing: "-0.018em",
              fontWeight: 400,
            }}
          >
            <div
              className="w-full min-w-0 leading-[1.02]"
              style={{ fontSize: "clamp(2.1rem, 7.2vw, 9.25rem)" }}
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
                    maxWidth: "100%",
                    background: COLADO.signal,
                  }}
                />
              </div>
              <br />
              <span style={{ fontStyle: "italic" }}>Start doing.</span>
            </div>

            <p
              className="mt-3 max-w-[40rem] min-w-0 sm:mt-4"
              style={{
                fontFamily: FONTS.body,
                fontSize: "clamp(0.9rem, 1.1vw + 0.6rem, 1.1rem)",
                lineHeight: 1.5,
                color: COLADO.inkSoft,
                fontWeight: 400,
              }}
            >
              {brandHeroSubline}
            </p>
          </div>

          <div
            className="mt-1 grid w-full min-w-0 grid-cols-1 gap-c6 sm:mt-0 sm:gap-9 sm:pt-6 md:grid-cols-2 md:gap-c6 md:pt-7 lg:grid-cols-3 lg:gap-10"
            style={{
              borderTop: `1px solid ${COLADO.hairline}`,
              paddingTop: 24,
            }}
          >
            {[
              { roman: "I", label: "Capture", line: "Say it. No performance." },
              {
                roman: "II",
                label: "Prioritize",
                line: "We cut noise. You stay composed.",
              },
              { roman: "III", label: "Act", line: "One move. Clean exit." },
            ].map((m) => (
              <div
                key={m.roman}
                className="flex min-w-0 flex-col gap-2.5 sm:gap-2.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className="leading-none"
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: "clamp(2.1rem, 5.5vw, 3.5rem)",
                      color: COLADO.ink,
                    }}
                  >
                    {m.roman}
                  </span>
                  <Inst size={12} color={COLADO.inkSoft}>
                    {m.label}
                  </Inst>
                </div>
                <p
                  className="min-w-0"
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: "clamp(1.1rem, 1.1vw + 0.5rem, 1.75rem)",
                    color: COLADO.ink,
                    lineHeight: 1.2,
                  }}
                >
                  {m.line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Folio
        variant="fluid"
        coord="Colado / Landing / Specimen · Poster Frame"
        idx="01"
        total="01"
      />
    </div>
  );
}
