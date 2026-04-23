"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SpecimenFrame } from "@/components/SpecimenFrame";
import { RevealHeading } from "@/components/RevealHeading";
import { SectionMark } from "@/components/SectionMark";
import { Marginalia } from "@/components/Marginalia";

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
    <SpecimenFrame sectionId="audience">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 md:py-28 lg:px-12 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={fadeIn}
          className="flex flex-col gap-4 sm:gap-6"
        >
          <SectionMark index={1}>Audience</SectionMark>
          <RevealHeading
            as="h2"
            className="display max-w-[960px] text-[40px] leading-[1.03] sm:text-[56px] md:text-[68px] lg:text-[88px]"
          >
            For people
            <br />
            <em>who make things.</em>
          </RevealHeading>
        </motion.div>

        <AudienceGrid blocks={AUDIENCES} reduce={reduce} />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5%" }}
          variants={fadeIn}
          className="relative mt-16 flex flex-col gap-3 border-t border-[var(--hairline)] pt-10 sm:mt-20 sm:pt-12 md:mt-24"
        >
          <p className="flex flex-wrap items-center gap-2">
            <span className="inst inst-ink">Two audiences</span>
            <span className="text-[var(--mute-soft)]">·</span>
            <span className="inst">One instrument</span>
          </p>
          <RevealHeading
            as="p"
            className="display max-w-[900px] text-[28px] leading-[1.22] text-[var(--ink-soft)] sm:text-[36px] md:text-[44px] lg:text-[52px]"
          >
            The rhythms differ. The answer — <em>one clear next move</em> —
            does not.
          </RevealHeading>
          <Marginalia
            note={<>← this is the product</>}
            side="right"
            top={100}
            rotate={-3}
            decoration="arrow"
          />
        </motion.div>
      </div>
    </SpecimenFrame>
  );
}

/**
 * AudienceGrid — layout wrapper that tracks which column is "in gaze":
 *   - Desktop: IntersectionObserver measures which column is most in view.
 *   - Mobile:  scroll-snap-y pins whichever card is closest to centre.
 *
 * The non-focused column dims to brightness(0.96) to create a reading focus.
 */
function AudienceGrid({
  blocks,
  reduce,
}: {
  blocks: AudienceBlock[];
  reduce: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    const root = wrapRef.current;
    if (!root) return;
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-audience-card]"),
    );

    const measure = () => {
      const vpCenterY = window.innerHeight / 2;
      let bestIdx: number | null = null;
      let bestDist = Infinity;
      cards.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - vpCenterY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setFocusedIdx(bestIdx);
    };

    measure();
    const onScroll = () => measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  return (
    <div
      ref={wrapRef}
      className="audience-grid mt-14 grid grid-cols-1 gap-12 sm:mt-20 md:mt-24 md:grid-cols-2 md:gap-10 lg:gap-16"
    >
      {blocks.map((a, i) => (
        <AudienceColumn
          key={a.letter}
          block={a}
          index={i}
          reduce={reduce}
          focused={focusedIdx === null ? true : focusedIdx === i}
        />
      ))}
    </div>
  );
}

function AudienceColumn({
  block,
  index,
  reduce,
  focused,
}: {
  block: AudienceBlock;
  index: number;
  reduce: boolean;
  focused: boolean;
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
      data-audience-card
      data-focused={focused ? "true" : "false"}
      className="audience-card flex flex-col gap-6 border-t border-[var(--hairline)] pt-6 sm:gap-8 sm:pt-8"
      style={{
        filter: focused ? "none" : "brightness(0.96)",
        transition: "filter 360ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <header className="flex flex-col gap-2">
        <p className="flex items-baseline gap-4">
          <span className="display text-[48px] leading-none text-[var(--ink)] sm:text-[64px] md:text-[72px]">
            {block.letter}.
          </span>
          <span className="inst inst-ink text-[36px] sm:text-[42px] md:text-[48px]">{block.title}</span>
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
