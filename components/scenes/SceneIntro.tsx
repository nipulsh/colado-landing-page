"use client";

/**
 * Scene 00 — Intro (0 to 5s)
 * The chaos — typing fragments, corrections, strikethroughs.
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
  Hairline,
  Inst,
} from "./shared";

// ── Beat types ──────────────────────────────────────────────────────────────

type Beat =
  | { row: number; t: number; text: string; time?: string; action?: undefined }
  | { row: number; t: number; action: "delete"; chars: number; text?: undefined; time?: undefined }
  | { row: number; t: number; action: "strike"; text?: undefined; chars?: undefined; time?: undefined };

type RowState = {
  committed: string;
  text: string;
  active: boolean;
  struck: boolean;
  time: string;
  _pendingDelete?: number;
  _pendingType?: string;
};

// ── computeRowStates ────────────────────────────────────────────────────────

function computeRowStates(
  beats: Beat[],
  localTime: number,
  numRows = 10,
): RowState[] {
  const rows: RowState[] = Array.from({ length: numRows }, () => ({
    committed: "",
    text: "",
    active: false,
    struck: false,
    time: "",
  }));

  const byRow: Beat[][] = Array.from({ length: numRows }, () => []);
  for (const b of beats) byRow[b.row].push(b);
  for (const list of byRow) list.sort((a, b) => a.t - b.t);

  for (let i = 0; i < numRows; i++) {
    const r = rows[i];
    for (const beat of byRow[i]) {
      if (beat.t > localTime) break;
      if ("time" in beat && beat.time && !r.time) r.time = beat.time;

      if (beat.action === "strike") {
        r.struck = true;
        continue;
      }

      if (beat.action === "delete") {
        const dur = Math.max(0.25, beat.chars * 0.03);
        const t = clamp((localTime - beat.t) / dur, 0, 1);
        const removed = Math.floor(beat.chars * t);
        if (t >= 1) {
          r.committed = r.committed.slice(
            0,
            Math.max(0, r.committed.length - beat.chars),
          );
          r.active = false;
        } else {
          r.active = true;
          r._pendingDelete = removed;
        }
        continue;
      }

      // type action
      const text = beat.text!;
      const dur = Math.max(0.35, text.length * 0.042);
      const t = clamp((localTime - beat.t) / dur, 0, 1);
      const n = Math.floor(text.length * t);
      if (t >= 1) {
        r.committed = r.committed + text;
        r.active = false;
      } else {
        r.active = true;
        r._pendingType = text.slice(0, n);
      }
    }

    // Build display text
    let display = r.committed;
    if (r._pendingDelete)
      display = display.slice(0, Math.max(0, display.length - r._pendingDelete));
    if (r._pendingType) display = display + r._pendingType;
    r.text = display;
    delete r._pendingDelete;
    delete r._pendingType;
  }

  return rows;
}

// ── Scene component ─────────────────────────────────────────────────────────

export function SceneIntro({
  start = 0,
  end = 5,
}: {
  start?: number;
  end?: number;
}) {
  const beats: Beat[] = [
    { row: 0, t: 0.17, text: "reply to investor — the one from tuesday", time: "14:32:04" },
    { row: 0, t: 0.73, action: "delete", chars: 14 },
    { row: 0, t: 0.93, text: "before she cools off" },
    { row: 1, t: 1.03, text: "pitch deck v7 (or 8??)", time: "14:32:18" },
    { row: 2, t: 1.4, text: "call design lead re: onboarding", time: "14:32:25" },
    { row: 2, t: 2.2, action: "strike" },
    { row: 3, t: 1.77, text: "flight to bangalore — monday? tuesday?", time: "14:32:31" },
    { row: 4, t: 2.13, text: "hiring doc. three candidates.", time: "14:32:44" },
    { row: 5, t: 2.57, text: "groceries", time: "14:32:52" },
    { row: 5, t: 2.9, text: ". somehow." },
    { row: 6, t: 2.8, text: "follow-up with the enterpise", time: "14:33:01" },
    { row: 6, t: 3.2, action: "delete", chars: 9 },
    { row: 6, t: 3.33, text: "enterprise lead" },
    { row: 7, t: 3.4, text: "parents. rent. the form. the thing.", time: "14:33:12" },
    { row: 8, t: 3.8, text: "essay. the one.", time: "14:33:20" },
    { row: 8, t: 4.4, action: "strike" },
    { row: 9, t: 4.07, text: "sleep?", time: "14:33:29" },
  ];

  return (
    <Sprite start={start} end={end}>
      <SceneIntroBody beats={beats} />
    </Sprite>
  );
}

function SceneIntroBody({ beats }: { beats: Beat[] }) {
  const { localTime, duration } = useSprite();

  const zoom = interpolate(
    [0, duration],
    [1.0, 1.055],
    Easing.easeInOutCubic,
  )(localTime);

  const exitT = clamp((localTime - (duration - 0.4)) / 0.4, 0, 1);
  const outOpacity = 1 - Easing.easeInCubic(exitT);

  const anxiety = clamp((localTime - 2) / 2, 0, 1);
  const shakeX = Math.sin(localTime * 11.3) * anxiety * 1.4;
  const shakeY = Math.cos(localTime * 9.7) * anxiety * 1.0;

  const rowStates = computeRowStates(beats, localTime, 10);
  const totalRows = rowStates.filter(
    (r) => r.text.length > 0 || r.active,
  ).length;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: COLADO.paper,
        overflow: "hidden",
        opacity: outOpacity,
      }}
    >
      <PaperGrain opacity={0.3} />
      <HeroFog opacity={0.6} />
      <Masthead
        leftSub="What is on your mind — Tuesday, 14:32"
        rightSub="Capture"
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(calc(-50% + ${shakeX}px), calc(-50% + ${shakeY}px)) scale(${zoom})`,
          transformOrigin: "center",
          width: 1280,
        }}
      >
        {/* Specimen header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "baseline",
            }}
          >
            <Inst
              size={14}
              color={COLADO.muteSoft}
              style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              Fig. 0
            </Inst>
            <span style={{ color: COLADO.muteSoft }}>—</span>
            <Inst size={14}>
              Unfiltered capture · {totalRows.toString().padStart(2, "0")}{" "}
              entries
            </Inst>
          </div>
          <Inst
            size={13}
            color={COLADO.muteSoft}
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            14:32 IST
          </Inst>
        </div>
        <Hairline />

        {/* Rows */}
        <div style={{ marginTop: 10 }}>
          {rowStates.map((r, i) => {
            if (!r.text && !r.active) return null;
            const isCurrent = r.active;
            const blink = Math.floor(localTime * 2.3) % 2 === 0;
            const indent = i === 1 || i === 4 || i === 7 ? 14 : 0;

            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 110px 1fr",
                  alignItems: "baseline",
                  padding: "13px 0",
                  borderBottom: `1px solid ${COLADO.hairlineSoft}`,
                  opacity: r.struck ? 0.48 : isCurrent ? 1 : 0.78,
                  transition: "opacity 300ms",
                  paddingLeft: indent,
                }}
              >
                <Inst
                  size={11}
                  color={COLADO.muteSoft}
                  style={{ letterSpacing: "0.18em" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </Inst>
                <Inst
                  size={11}
                  color={COLADO.muteSoft}
                  caps={false}
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "0.08em",
                  }}
                >
                  {r.time}
                </Inst>
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 26,
                    lineHeight: 1.35,
                    color: r.struck ? COLADO.muted : COLADO.ink,
                    fontWeight: 400,
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  {r.text}
                  {isCurrent && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 2,
                        height: 26,
                        background: COLADO.signal,
                        marginLeft: 3,
                        verticalAlign: "-4px",
                        opacity: blink ? 1 : 0.15,
                      }}
                    />
                  )}
                  {r.struck && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: "54%",
                        height: 1.5,
                        background: COLADO.signal,
                        opacity: 0.7,
                      }}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Margin note */}
        <MarginNote localTime={localTime} />
      </div>

      <Folio
        coord="Colado / Landing / Capture · Coordinate 0.A"
        idx="00"
        total="06"
      />
    </div>
  );
}

function MarginNote({ localTime }: { localTime: number }) {
  const op =
    clamp((localTime - 3.7) / 0.5, 0, 1) *
    (1 - clamp((localTime - 4.6) / 0.3, 0, 1));
  if (op <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        right: -240,
        top: 320,
        width: 200,
        opacity: op,
        transform: `rotate(-2deg) translateY(${(1 - op) * 10}px)`,
        transformOrigin: "left top",
      }}
    >
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 12,
          color: COLADO.signal,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        § — too much
      </span>
      <div
        style={{
          marginTop: 6,
          fontFamily: FONTS.display,
          fontStyle: "italic",
          fontSize: 18,
          color: COLADO.inkSoft,
          lineHeight: 1.3,
        }}
      >
        which one do you do next?
      </div>
    </div>
  );
}
