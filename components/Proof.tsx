"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SpecimenFrame } from "@/components/SpecimenFrame";

type Voice = {
  roman: "i." | "ii." | "iii.";
  quote: string;
  name: string;
  role: string;
  note: string;
};

const VOICES: Voice[] = [
  {
    roman: "i.",
    quote: "Finally, one thing to focus on.",
    name: "Priya S.",
    role: "final-year student",
    note: "placeholder — replace with real beta user",
  },
  {
    roman: "ii.",
    quote: "I stopped opening five apps to figure out what's next.",
    name: "Arjun M.",
    role: "design lead",
    note: "placeholder — stealth, early-stage",
  },
  {
    roman: "iii.",
    quote: "The opposite of another cluttered list.",
    name: "Riya K.",
    role: "founder",
    note: "placeholder — YC-backed, stealth",
  },
];

export function Proof() {
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
      sectionId="voices"
      specimen="V"
      specimenTitle="Field notes from beta"
      coordinate="Colado / Landing / Voices Editorial V"
      folio="05 / 06"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 py-16 sm:px-8 sm:py-20 md:py-28 lg:px-12 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          variants={fadeIn}
          className="flex flex-col gap-4 sm:gap-6"
        >
          <p className="section-mark">§ 05 — Voices</p>
          <h2 className="display max-w-[960px] text-[40px] leading-[1.03] sm:text-[56px] md:text-[68px] lg:text-[84px]">
            From the <em>quiet few</em>
            <br />
            who have it already.
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:mt-16 md:mt-20">
          {VOICES.map((v, i) => (
            <VoiceRow key={v.roman} voice={v} index={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </SpecimenFrame>
  );
}

function VoiceRow({
  voice,
  index,
  reduce,
}: {
  voice: Voice;
  index: number;
  reduce: boolean;
}) {
  const variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: 0.06 * index,
          },
    },
  };

  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
      className="grid grid-cols-[52px_1fr] items-start gap-4 border-t border-[var(--hairline)] py-10 last:border-b last:border-[var(--hairline)] sm:grid-cols-[80px_1fr] sm:gap-8 sm:py-14 md:py-16"
    >
      <span className="display text-[36px] leading-none text-[var(--mute-soft)] sm:text-[48px] md:text-[56px]">
        {voice.roman}
      </span>
      <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
        <blockquote className="display italic text-[26px] leading-[1.15] text-[var(--ink)] sm:text-[36px] md:max-w-[640px] md:text-[44px] lg:text-[52px]">
          “{voice.quote}”
        </blockquote>
        <figcaption className="flex shrink-0 flex-col gap-1 md:min-w-[220px] md:text-right">
          <span className="inst inst-ink">{voice.name}</span>
          <span className="text-[13.5px] italic text-[var(--ink-soft)] sm:text-[14.5px]">
            {voice.role}
          </span>
          <span className="inst-sm mt-2 normal-case tracking-[0.04em] text-[var(--mute-soft)]">
            [{voice.note}]
          </span>
        </figcaption>
      </div>
    </motion.figure>
  );
}
