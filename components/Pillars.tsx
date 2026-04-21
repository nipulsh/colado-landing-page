"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SpecimenFrame } from "@/components/SpecimenFrame";

type Movement = {
  roman: string;
  label: string;
  title: string;
  body: string;
  annotationA: string;
  annotationB: string;
};

const MOVEMENTS: Movement[] = [
  {
    roman: "I",
    label: "Capture",
    title: "Say it. Like a friend.",
    body:
      "Type, voice, fragments — Colado catches everything without judgment. Unfinished thoughts welcome.",
    annotationA: "Input accepts natural language.",
    annotationB: "No tags. No projects. No trees.",
  },
  {
    roman: "II",
    label: "Prioritize",
    title: "We read. You trust.",
    body:
      "Deadlines, energy, context — weighed against each other. Not a scoring game. An honest answer.",
    annotationA: "Reasoning surfaced for every rank.",
    annotationB: "You can always ask why.",
  },
  {
    roman: "III",
    label: "Act",
    title: "One move. Then the next.",
    body:
      "The rest of the list dims. The top move sharpens. Finish it. Come back. Another answer waits.",
    annotationA: "Single-task focus is the feature.",
    annotationB: "The queue is invisible until done.",
  },
];

export function Pillars() {
  const reduce = useReducedMotion() ?? false;
  const fadeIn = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <SpecimenFrame
      sectionId="method"
      specimen="III"
      specimenTitle="The Three Movements"
      coordinate="Colado / Landing / Method Triptych III.A – C"
      folio="03 / 06"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 md:py-28 lg:px-12 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={fadeIn}
          className="flex flex-col gap-4 sm:gap-6"
        >
          <p className="section-mark">§ 03 — Method</p>
          <h2 className="display max-w-[960px] text-[40px] leading-[1.03] sm:text-[56px] md:text-[68px] lg:text-[88px]">
            Three movements,
            <br />
            <em>one quiet instrument.</em>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-20 md:mt-24 md:grid-cols-3 md:gap-8 lg:gap-12">
          {MOVEMENTS.map((m, i) => (
            <MovementCard key={m.roman} movement={m} index={i} reduce={reduce} />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          variants={fadeIn}
          className="mt-16 flex flex-col gap-3 border-t border-[var(--hairline)] pt-10 sm:mt-20 sm:pt-12 md:mt-24"
        >
          <p className="display max-w-[820px] text-[22px] leading-[1.28] text-[var(--ink-soft)] sm:text-[28px] md:text-[34px]">
            The whole point is that you <em>stop choosing.</em>
          </p>
          <p className="inst-sm">
            — design principle · internal memo, March 2026
          </p>
        </motion.div>
      </div>
    </SpecimenFrame>
  );
}

function MovementCard({
  movement,
  index,
  reduce,
}: {
  movement: Movement;
  index: number;
  reduce: boolean;
}) {
  const variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.08 * index,
          },
    },
  };

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
      className="relative flex flex-col gap-5 border-t border-[var(--hairline)] pt-6 sm:gap-6 sm:pt-8"
    >
      <header className="flex items-baseline justify-between gap-4">
        <span className="display text-[40px] leading-none text-[var(--ink)] sm:text-[52px]">
          {movement.roman}
        </span>
        <span className="inst inst-ink">{movement.label}</span>
      </header>

      <h3 className="display text-[30px] leading-[1.05] text-[var(--ink)] sm:text-[36px] md:text-[40px]">
        {movement.title.split(" ").map((word, wi, arr) => (
          <span key={wi}>
            {wi === arr.length - 1 ? <em>{word}</em> : word}
            {wi < arr.length - 1 ? " " : ""}
          </span>
        ))}
      </h3>

      <p className="text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-[16px] md:text-[16.5px]">
        {movement.body}
      </p>

      <footer className="mt-2 flex flex-col gap-1 border-t border-[var(--hairline-soft)] pt-4">
        <p className="inst-sm normal-case tracking-[0.04em] text-[var(--muted)]">
          <span className="text-[var(--ink-soft)]">
            {movement.annotationA}
          </span>
        </p>
        <p className="inst-sm normal-case tracking-[0.04em] text-[var(--muted)]">
          {movement.annotationB}
        </p>
      </footer>
    </motion.article>
  );
}
