import type { ReactNode } from "react";

/** CSS-only product previews — Focused Curator tokens (tonal depth, no harsh borders). */

function CardShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-[var(--surface-container-lowest)] p-5 shadow-ambient">
      {children}
    </div>
  );
}

export function MockManyToOne() {
  return (
    <CardShell>
      <p className="text-xs font-semibold text-[var(--on-surface-variant)]">
        Before → after
      </p>
      <div className="mt-5 space-y-3">
        {[0.85, 0.7, 0.55, 0.4].map((op, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full bg-[var(--surface-container-low)]"
            style={{ width: `${op * 100}%`, opacity: 0.35 + i * 0.15 }}
          />
        ))}
      </div>
      <p className="my-6 text-center text-xs font-semibold tracking-wide text-[var(--primary)]">
        Colado
      </p>
      <div className="h-3 w-[85%] rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dim)]" />
    </CardShell>
  );
}

export function MockCaptureList() {
  return (
    <CardShell>
      <div className="mb-4 flex items-center gap-2 rounded-xl bg-[var(--surface-container-low)] px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
        <span className="text-xs font-medium text-[var(--on-surface-variant)]">
          Add anything…
        </span>
      </div>
      <ul className="space-y-3 text-sm">
        {["Ship the deck", "Reply to Alex", "Book flights"].map((label, i) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-xl bg-[var(--surface-container-low)] px-3 py-3"
          >
            <span
              className={`flex h-4 w-4 shrink-0 rounded border-2 ${
                i === 0
                  ? "border-[var(--primary)] bg-[var(--primary)]"
                  : "border-[var(--ghost-border-primary)] bg-[var(--surface-container-lowest)]"
              }`}
            />
            <span
              className={
                i === 0
                  ? "text-[var(--on-surface-variant)] line-through"
                  : "text-[var(--on-surface)]"
              }
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

export function MockNextAction() {
  return (
    <CardShell>
      <p className="label-caps text-[var(--on-surface-variant)]">Right now</p>
      <div className="mt-5 rounded-xl bg-[var(--primary-container)]/50 p-5 ring-1 ring-[var(--ghost-border-primary)]">
        <p className="font-display text-lg font-bold text-[var(--on-surface)]">
          Finish the outline
        </p>
        <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
          ~25 min · High impact
        </p>
        <div className="mt-5 flex gap-2">
          <span className="rounded-lg bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dim)] px-3 py-1.5 text-xs font-semibold text-[var(--on-primary)]">
            Start
          </span>
          <span className="rounded-lg bg-[var(--surface-container-lowest)] px-3 py-1.5 text-xs font-medium text-[var(--on-surface-variant)]">
            Snooze
          </span>
        </div>
      </div>
    </CardShell>
  );
}

export function MockWeekStrip() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <CardShell>
      <div className="mb-4 flex justify-between text-xs font-medium text-[var(--on-surface-variant)]">
        <span>This week</span>
        <span className="font-semibold text-[var(--primary)]">Calendar</span>
      </div>
      <div className="flex gap-1.5">
        {days.map((d, i) => (
          <div
            key={`${d}-${i}`}
            className={`flex flex-1 flex-col items-center rounded-xl py-2.5 text-xs ${
              i === 2
                ? "bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dim)] font-semibold text-[var(--on-primary)]"
                : "bg-[var(--surface-container-low)] text-[var(--on-surface)]"
            }`}
          >
            <span className="opacity-80">{d}</span>
            <span className="mt-1 font-bold">{4 + i}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-xs text-[var(--on-surface-variant)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />
          Design review · 2:00 PM
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--on-surface-variant)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--surface-container-high)]" />
          Weekly plan · Fri
        </div>
      </div>
    </CardShell>
  );
}

export function MockRhythm() {
  return (
    <CardShell>
      <p className="text-xs font-semibold text-[var(--on-surface-variant)]">
        Your rhythm
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-xl bg-[var(--surface-container-low)] py-4">
          <p className="font-bold text-[var(--on-surface)]">Morning</p>
          <p className="mt-1 text-[var(--on-surface-variant)]">Deep work</p>
        </div>
        <div className="rounded-xl bg-[var(--surface-container-low)] py-4">
          <p className="font-bold text-[var(--on-surface)]">Afternoon</p>
          <p className="mt-1 text-[var(--on-surface-variant)]">Meetings</p>
        </div>
        <div className="rounded-xl bg-[var(--surface-container-low)] py-4">
          <p className="font-bold text-[var(--on-surface)]">Evening</p>
          <p className="mt-1 text-[var(--on-surface-variant)]">Light tasks</p>
        </div>
      </div>
      <p className="mt-4 text-center text-[10px] tracking-wide text-[var(--secondary-text)]">
        Colado adapts suggestions to your day
      </p>
    </CardShell>
  );
}
