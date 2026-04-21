"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SpecimenFrame } from "@/components/SpecimenFrame";

type AfterItem = {
  label: "NOW" | "NEXT" | "THEN" | "LATER" | "ADMIN";
  text: string;
  note: string;
};

const BEFORE_ITEMS = [
  "buy groceries",
  "reply to investor email",
  "call mom",
  "ship the pitch deck",
  "book flight to Bangalore",
  "review Arjun's PR",
  "respond to design lead",
  "renew domain",
];

const AFTER_ITEMS: AfterItem[] = [
  {
    label: "NOW",
    text: "Reply to investor email",
    note: "time-sensitive · blocks the round",
  },
  {
    label: "NEXT",
    text: "Ship the pitch deck",
    note: "same thread · finish before reply",
  },
  {
    label: "THEN",
    text: "Review Arjun's PR",
    note: "15 min · unblocks the team",
  },
  {
    label: "LATER",
    text: "Call mom",
    note: "important, not urgent",
  },
  {
    label: "LATER",
    text: "Respond to design lead",
    note: "can wait 24 hours",
  },
  {
    label: "ADMIN",
    text: "Book flight to Bangalore",
    note: "schedule this evening",
  },
  {
    label: "ADMIN",
    text: "Renew domain",
    note: "batch with others",
  },
  {
    label: "ADMIN",
    text: "Buy groceries",
    note: "on the way home",
  },
];

export function ScrollDemo() {
  const reduce = useReducedMotion() ?? false;

  const fadeIn = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <SpecimenFrame
      sectionId="live"
      specimen="II"
      specimenTitle="The Live Instrument"
      coordinate="Colado / Landing / Demo Run II.A · Prioritize"
      folio="02 / 06"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 md:py-28 lg:px-12 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={fadeIn}
          className="flex flex-col gap-4 sm:gap-6"
        >
          <p className="section-mark">§ 02 — Try the instrument</p>
          <h2 className="display max-w-[900px] text-[40px] leading-[1.05] sm:text-[56px] md:text-[68px] lg:text-[84px]">
            Try it. <em>Right here.</em>
          </h2>
          <p className="max-w-[620px] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px]">
            Type anything on your mind — watch Colado think. One clear move,
            followed by a quiet queue.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          transition={reduce ? { duration: 0 } : { staggerChildren: 0.12 }}
          className="mt-12 grid grid-cols-1 gap-8 sm:mt-16 md:mt-20 md:grid-cols-[1fr_auto_1.3fr] md:gap-10 lg:gap-14"
        >
          {/* BEFORE column */}
          <motion.div variants={fadeIn} className="flex flex-col">
            <div className="flex items-baseline justify-between border-b border-[var(--hairline)] pb-3">
              <span className="inst">Before</span>
              <span className="folio tnum">what you dumped</span>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {BEFORE_ITEMS.map((t, i) => (
                <li
                  key={t}
                  className="flex items-baseline gap-3 text-[15px] text-[var(--ink-soft)] sm:text-[16px]"
                >
                  <span aria-hidden className="text-[var(--mute-soft)]">
                    —
                  </span>
                  <span>{t}</span>
                  <span className="folio tnum ml-auto hidden shrink-0 sm:inline">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Center pivot */}
          <motion.div
            variants={fadeIn}
            className="flex flex-row items-center justify-between gap-4 md:flex-col md:justify-center md:gap-6"
          >
            <div className="flex flex-row items-center gap-2 md:flex-col md:gap-3">
              <span className="inst">Reads</span>
              <span aria-hidden className="text-[var(--mute-soft)]">
                ·
              </span>
              <span className="inst">Ranks</span>
              <span aria-hidden className="text-[var(--mute-soft)]">
                ·
              </span>
              <span className="inst">Returns</span>
            </div>
            <div className="flex items-center gap-2 md:flex-col md:gap-3">
              <span
                aria-hidden
                className="display text-[28px] leading-none text-[var(--accent)] sm:text-[36px] md:text-[48px]"
              >
                <span className="md:hidden">→</span>
                <span className="hidden md:inline">↓</span>
              </span>
              <span className="inst-sm inst-ink">Colado</span>
            </div>
          </motion.div>

          {/* AFTER column */}
          <motion.div variants={fadeIn} className="flex flex-col">
            <div className="flex items-baseline justify-between border-b border-[var(--hairline)] pb-3">
              <span className="inst">After</span>
              <span className="folio tnum">one clear move</span>
            </div>
            <ul className="mt-2 flex flex-col">
              {AFTER_ITEMS.map((item, i) => (
                <li
                  key={i}
                  className={[
                    "grid grid-cols-[56px_1fr] items-start gap-3 border-b border-[var(--hairline-soft)] py-3 last:border-b-0 sm:grid-cols-[72px_1fr] sm:gap-4",
                    item.label === "NOW"
                      ? "bg-[color-mix(in_srgb,var(--signal-priority-soft)_60%,transparent)] px-2 sm:px-3"
                      : "",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "pill-label inline-flex items-center justify-center py-1",
                      item.label === "NOW"
                        ? "rounded-full bg-[var(--signal-priority)] px-2 text-white"
                        : "text-[var(--muted)]",
                    ].join(" ")}
                    style={{ letterSpacing: "0.22em" }}
                  >
                    {item.label}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={[
                        "text-[15px] leading-snug text-[var(--ink)] sm:text-[16px]",
                        item.label === "NOW" ? "font-medium" : "",
                      ].join(" ")}
                    >
                      {item.text}
                    </p>
                    <p className="inst-sm mt-1 normal-case tracking-[0.04em] text-[var(--muted)]">
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          variants={fadeIn}
          className="mt-16 flex flex-col gap-4 border-t border-[var(--hairline)] pt-10 sm:mt-20 sm:pt-12 md:mt-24"
        >
          <p className="flex flex-wrap items-center gap-2">
            <span className="folio tnum">Fig. II</span>
            <span className="text-[var(--mute-soft)]">—</span>
            <span className="inst">The mechanism</span>
          </p>
          <p className="display max-w-[780px] text-[22px] leading-[1.25] text-[var(--ink-soft)] sm:text-[28px] md:text-[32px]">
            The instrument does not ask you to sort. It <em>sorts</em>. One task
            at a time — the one that matters most — followed by a quiet queue.
          </p>
        </motion.div>
      </div>
    </SpecimenFrame>
  );
}
