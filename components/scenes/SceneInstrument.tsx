"use client";

/**
 * Scene 02 — Instrument (9.3 to 16.7s)
 * The prioritization: dumped list becomes ranked with reasoning ticks.
 */

import { Sprite } from "@/components/animation/Sprite";
import { useSprite } from "@/lib/animation/context";
import { Easing, clamp, interpolate } from "@/lib/animation/easing";
import { useLocalClock } from "@/lib/hooks/useLocalClock";
import {
  COLADO,
  FONTS,
  PaperGrain,
  HeroFog,
  Masthead,
  Folio,
  Inst,
} from "./shared";

type Task = {
  id: string;
  text: string;
  tags: string;
  label: string;
};

const INSTRUMENT_TASKS: Task[] = [
  { id: "t1", text: "Reply to investor email",     tags: "Fundraising · deadline today",      label: "NOW" },
  { id: "t2", text: "Ship the updated pitch deck", tags: "Fundraising · draft ready · review", label: "NEXT" },
  { id: "t3", text: "Call the design lead",        tags: "Team · 1:1 scheduled",               label: "THEN" },
  { id: "t4", text: "Book flight to Bangalore",    tags: "Travel · Monday departure",          label: "THEN" },
  { id: "t5", text: "Review the hiring doc",       tags: "Hiring · three candidates",          label: "LATER" },
  { id: "t6", text: "Groceries",                   tags: "Personal · can wait",                label: "ADMIN" },
];

export function SceneInstrument({
  start = 9.3,
  end = 16.7,
}: {
  start?: number;
  end?: number;
}) {
  return (
    <Sprite start={start} end={end}>
      <SceneInstrumentBody />
    </Sprite>
  );
}

function SceneInstrumentBody() {
  const { localTime, duration } = useSprite();

  const zoom = interpolate(
    [0, 0.93, duration - 0.4, duration],
    [0.88, 1.0, 1.02, 1.06],
    [Easing.easeOutQuart, Easing.linear, Easing.easeInCubic],
  )(localTime);

  const outT = clamp((localTime - (duration - 0.47)) / 0.47, 0, 1);
  const outOp = 1 - Easing.easeInCubic(outT);

  const sortedTasks = [...INSTRUMENT_TASKS].sort((a, b) => {
    const w: Record<string, number> = { NOW: 0, NEXT: 1, THEN: 2, LATER: 3, ADMIN: 4 };
    return (w[a.label] ?? 5) - (w[b.label] ?? 5);
  });

  const sortT = clamp((localTime - 2.13) / 0.87, 0, 1);
  const sortEased = Easing.easeOutQuart(sortT);

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
      <HeroFog opacity={0.8} />
      <Masthead
        leftSub="The instrument, reading context"
        right="Specimen"
        rightSub="Prioritize"
      />

      {/* Reasoning panel */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 220,
          width: 420,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        <Inst size={13}>Reasoning</Inst>
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: 56,
            lineHeight: 1.05,
            color: COLADO.ink,
            letterSpacing: "-0.018em",
          }}
        >
          Deadlines,
          <br />
          energy,
          <br />
          <em>context.</em>
        </div>
        <div
          style={{ height: 1, background: COLADO.hairline, marginTop: 8 }}
        />
        <ReasonTicks localTime={localTime} />
      </div>

      {/* The card */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: "50%",
          transform: `translateY(-50%) scale(${zoom})`,
          transformOrigin: "center right",
          width: 680,
        }}
      >
        <SpecimenCard
          sortedTasks={sortedTasks}
          originalTasks={INSTRUMENT_TASKS}
          sortEased={sortEased}
          localTime={localTime}
        />
      </div>

      <Folio
        coord="Colado / Landing / Method · Coordinate"
        idx="02"
        total="06"
      />
    </div>
  );
}

function ReasonTicks({ localTime }: { localTime: number }) {
  const ticks = [
    { t: 0.87, k: "Investor", v: "last reply 6 days ago", w: "hot" },
    { t: 1.2, k: "Deck", v: "review block on calendar", w: "ready" },
    { t: 1.53, k: "Design", v: "no hard deadline", w: "soft" },
    { t: 1.8, k: "Travel", v: "tickets fine for 48h", w: "cool" },
    { t: 2.07, k: "Hiring", v: "batch with friday block", w: "cool" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {ticks.map((tk, i) => {
        const op = clamp((localTime - tk.t) / 0.35, 0, 1);
        const y = (1 - op) * 8;
        return (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "110px 1fr 72px",
              gap: 16,
              alignItems: "baseline",
              opacity: op,
              transform: `translateY(${y}px)`,
              fontFamily: FONTS.mono,
              fontSize: 13,
              color: COLADO.inkSoft,
              letterSpacing: "0.04em",
            }}
          >
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: COLADO.muted,
                fontSize: 11,
              }}
            >
              {tk.k}
            </span>
            <span>{tk.v}</span>
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontSize: 11,
                color:
                  tk.w === "hot"
                    ? COLADO.signal
                    : tk.w === "ready"
                      ? COLADO.accent
                      : COLADO.muteSoft,
                textAlign: "right",
              }}
            >
              {tk.w}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function SpecimenCard({
  sortedTasks,
  originalTasks,
  sortEased,
  localTime,
}: {
  sortedTasks: Task[];
  originalTasks: Task[];
  sortEased: number;
  localTime: number;
}) {
  const rowH = 76;
  const clock = useLocalClock();

  const origIdx = Object.fromEntries(
    originalTasks.map((t, i) => [t.id, i]),
  );
  const sortIdx = Object.fromEntries(
    sortedTasks.map((t, i) => [t.id, i]),
  );

  return (
    <div
      style={{
        background: COLADO.paperElev,
        border: `1px solid ${COLADO.hairline}`,
        borderRadius: 16,
        boxShadow:
          "0 1px 1px rgba(20,20,15,0.04), 0 32px 80px -32px rgba(20,20,15,0.22)",
        overflow: "hidden",
      }}
    >
      {/* Card masthead */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 28px",
          borderBottom: `1px solid ${COLADO.hairline}`,
          background: COLADO.paperElev,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: COLADO.signal,
            }}
          />
          <Inst size={13}>What&apos;s on your mind</Inst>
        </div>
        <Inst size={12} color={COLADO.muteSoft}>
          Fig.
        </Inst>
      </div>

      {/* List body */}
      <div
        style={{
          position: "relative",
          padding: "8px 12px",
          height: originalTasks.length * rowH + 16,
        }}
      >
        {originalTasks.map((task) => {
          const from = origIdx[task.id];
          const to = sortIdx[task.id];
          const idx = from + (to - from) * sortEased;
          const isTop = task.label === "NOW" && sortEased > 0.6;

          const labelT = clamp((localTime - 2.93) / 0.33, 0, 1);
          const labelEased = Easing.easeOutBack(labelT);
          const isNOW = task.label === "NOW";

          return (
            <div
              key={task.id}
              style={{
                position: "absolute",
                left: 12,
                right: 12,
                top: 8 + idx * rowH,
                height: rowH - 8,
                display: "grid",
                gridTemplateColumns: "40px 1fr auto",
                gap: 16,
                alignItems: "center",
                padding: "0 12px",
                borderBottom: `1px solid ${COLADO.hairlineSoft}`,
                willChange: "top",
              }}
            >
              <Inst
                size={12}
                color={COLADO.muteSoft}
                style={{
                  letterSpacing: "0.18em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(Math.round(idx) + 1).padStart(2, "0")}
              </Inst>
              <div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: 21,
                    color: isTop ? COLADO.ink : COLADO.inkSoft,
                    fontWeight: isTop ? 500 : 400,
                    lineHeight: 1.25,
                    opacity: isNOW
                      ? 1
                      : 0.6 + (1 - Math.min(to, 4) / 5) * 0.4,
                  }}
                >
                  {task.text}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: FONTS.mono,
                    fontSize: 11.5,
                    letterSpacing: "0.04em",
                    color: COLADO.muted,
                  }}
                >
                  {task.tags}
                </div>
              </div>
              {/* Label pill */}
              <div
                style={{
                  opacity: labelT,
                  transform: `translateX(${(1 - labelEased) * 8}px) scale(${0.7 + labelEased * 0.3})`,
                  transformOrigin: "right center",
                }}
              >
                <PillLabel label={task.label} isNOW={isNOW} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Card footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 28px",
          borderTop: `1px solid ${COLADO.hairline}`,
          background: COLADO.paper,
        }}
      >
        <Inst size={12}>
          Prioritized by Colado ·{" "}
          <span style={{ fontVariantNumeric: "tabular-nums" }}>
            {clock.hhmm} {clock.tz}
          </span>
        </Inst>
      </div>
    </div>
  );
}

function PillLabel({ label, isNOW }: { label: string; isNOW: boolean }) {
  return (
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize: 10.5,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        fontWeight: 600,
        padding: "5px 11px",
        borderRadius: 9999,
        background: isNOW ? COLADO.signal : "transparent",
        color: isNOW ? "#fff" : COLADO.muted,
        border: isNOW
          ? "1px solid transparent"
          : `1px solid ${COLADO.hairline}`,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
