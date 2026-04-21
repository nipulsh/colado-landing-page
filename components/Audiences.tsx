"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SpecimenFrame } from "@/components/SpecimenFrame";

type UseCase = { title: string; body: string };

type AudienceBlock = {
  letter: "A" | "B";
  title: string;
  byline: string;
  cases: UseCase[];
};

const AUDIENCES: AudienceBlock[] = [
  {
    letter: "A",
    title: "The founder",
    byline: "ships weekly · raises occasionally · sleeps rarely",
    cases: [
      {
        title: "Fundraising week",
        body: "Investor threads, deck revisions, warm intros — ranked by who's about to go cold.",
      },
      {
        title: "Hiring sprint",
        body: "Candidate replies, scheduling, references — nothing drops between two people's inboxes.",
      },
      {
        title: "Launch day",
        body: "The forty-item checklist, sorted by what breaks if you skip it.",
      },
      {
        title: "Deep work",
        body: "Knows when to leave you alone. Reopens the loop when you come back.",
      },
    ],
  },
  {
    letter: "B",
    title: "The student",
    byline: "syllabus · side projects · the rest of their life",
    cases: [
      {
        title: "Exam season",
        body: "Mocks, revision, office hours — ordered by impact on your transcript.",
      },
      {
        title: "Internship hunt",
        body: "Applications, follow-ups, deadlines — in the sequence most likely to return.",
      },
      {
        title: "The side project",
        body: "Keeps the thread warm between classes so you don't lose the week.",
      },
      {
        title: "Life, actually",
        body: "Rent, fees, forms, parents — handled before they turn into emergencies.",
      },
    ],
  },
];

export function Audiences() {
  const reduce = useReducedMotion() ?? false;
  const fadeIn = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
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
      sectionId="audience"
      specimen="IV"
      specimenTitle="Built for makers"
      coordinate="Colado / Landing / Audiences Spread IV.A – B"
      folio="04 / 06"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 md:py-28 lg:px-12 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={fadeIn}
          className="flex flex-col gap-4 sm:gap-6"
        >
          <p className="section-mark">§ 04 — Audience</p>
          <h2 className="display max-w-[960px] text-[40px] leading-[1.03] sm:text-[56px] md:text-[68px] lg:text-[88px]">
            For people
            <br />
            <em>who make things.</em>
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-12 sm:mt-20 md:mt-24 md:grid-cols-2 md:gap-10 lg:gap-16">
          {AUDIENCES.map((a, i) => (
            <AudienceColumn key={a.letter} block={a} index={i} reduce={reduce} />
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          variants={fadeIn}
          className="mt-16 flex flex-col gap-3 border-t border-[var(--hairline)] pt-10 sm:mt-20 sm:pt-12 md:mt-24"
        >
          <p className="flex flex-wrap items-center gap-2">
            <span className="inst inst-ink">Two audiences</span>
            <span className="text-[var(--mute-soft)]">·</span>
            <span className="inst">One instrument</span>
          </p>
          <p className="display max-w-[780px] text-[22px] leading-[1.28] text-[var(--ink-soft)] sm:text-[28px] md:text-[32px]">
            The rhythms differ. The answer — <em>one clear next move</em> —
            does not.
          </p>
        </motion.div>
      </div>
    </SpecimenFrame>
  );
}

function AudienceColumn({
  block,
  index,
  reduce,
}: {
  block: AudienceBlock;
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
            delay: 0.1 * index,
          },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
      className="flex flex-col gap-6 border-t border-[var(--hairline)] pt-6 sm:gap-8 sm:pt-8"
    >
      <header className="flex flex-col gap-2">
        <p className="flex items-baseline gap-3">
          <span className="display text-[40px] leading-none text-[var(--ink)] sm:text-[48px]">
            {block.letter}.
          </span>
          <span className="inst inst-ink">{block.title}</span>
        </p>
        <p className="inst-sm normal-case tracking-[0.04em] text-[var(--muted)]">
          {block.byline}
        </p>
      </header>

      <ul className="flex flex-col">
        {block.cases.map((c, i) => (
          <li
            key={c.title}
            className={[
              "grid grid-cols-[28px_1fr] items-start gap-3 border-b border-[var(--hairline-soft)] py-4 last:border-b-0 sm:gap-4 sm:py-5",
            ].join(" ")}
          >
            <span className="folio tnum pt-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="display text-[22px] leading-tight text-[var(--ink)] sm:text-[26px] md:text-[28px]">
                {c.title}
              </h3>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--ink-soft)] sm:text-[15.5px]">
                {c.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
