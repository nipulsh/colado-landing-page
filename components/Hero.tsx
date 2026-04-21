"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LiveDemo } from "@/components/LiveDemo";

const staggerContainer = (reduce: boolean) => ({
  hidden: { opacity: reduce ? 1 : 0 },
  show: {
    opacity: 1,
    transition: reduce
      ? { duration: 0 }
      : { staggerChildren: 0.08, delayChildren: 0.04 },
  },
});

const staggerChild = (reduce: boolean) => ({
  hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export function Hero() {
  const shouldReduce = useReducedMotion() ?? false;
  const container = staggerContainer(shouldReduce);
  const child = staggerChild(shouldReduce);

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-t border-[var(--hairline)] pt-[60px] sm:pt-[60px]"
      aria-label="Colado — Specimen I"
    >
      <div
        aria-hidden
        className="hero-fog pointer-events-none absolute inset-0"
      />

      {/* Specimen masthead — always visible at the top of the hero */}
      <div className="relative border-b border-[var(--hairline-soft)] bg-[var(--bg)]/60">
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3 sm:px-8 sm:py-4 lg:px-12">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
            <span className="inst-sm inst-ink">Colado</span>
            <span className="text-[var(--mute-soft)]">·</span>
            <span className="inst-sm">An instrument for the next move</span>
          </p>
          <p className="flex items-center gap-2 text-[11px]">
            <span className="inst-sm inst-ink">Specimen I</span>
            <span className="text-[var(--mute-soft)]">·</span>
            <span className="inst-sm">Hero</span>
          </p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-start gap-12 px-5 pt-10 pb-14 sm:gap-14 sm:px-8 sm:pt-14 sm:pb-20 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-10 md:pt-20 md:pb-24 lg:gap-16 lg:px-12 lg:pt-24 lg:pb-28"
      >
        <div className="flex flex-col gap-6 sm:gap-7 md:gap-8">
          <motion.p variants={child} className="flex flex-wrap items-center gap-2">
            <span className="folio tnum">Fig. I</span>
            <span className="text-[var(--mute-soft)]">—</span>
            <span className="inst-sm">
              An intelligent assistant for founders &amp; students
            </span>
          </motion.p>

          <motion.h1
            variants={child}
            className="display text-[44px] leading-[1.02] sm:text-[62px] md:text-[72px] lg:text-[96px]"
          >
            Stop planning.
            <br />
            <em>Start doing.</em>
          </motion.h1>

          <motion.p
            variants={child}
            className="max-w-[520px] text-[16px] leading-relaxed text-[var(--ink-soft)] sm:text-[18px] md:text-[19px]"
          >
            Dump everything on your mind. Colado reads the context — deadlines,
            energy, what you actually have to finish — and hands back the single
            next move.
          </motion.p>

          <motion.div
            variants={child}
            className="flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <a
              href="#fin"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--ink)] px-5 text-[14px] font-medium text-[var(--bg)] transition-opacity hover:opacity-90 sm:h-12 sm:px-6 sm:text-[15px]"
            >
              Get the app <span aria-hidden>→</span>
            </a>
            <a
              href="#live"
              className="group inline-flex items-center gap-1.5 text-[14px] text-[var(--ink-soft)] sm:text-[15px]"
            >
              <span className="border-b border-[var(--ink-soft)]/30 pb-0.5 transition-colors group-hover:border-[var(--ink)]">
                or try it below
              </span>
              <span aria-hidden>↓</span>
            </a>
          </motion.div>

          <motion.div
            variants={child}
            className="mt-2 flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:gap-4"
          >
            <span className="inst-sm">Used by</span>
            <span className="text-[13.5px] text-[var(--ink-soft)] sm:text-[14px]">
              founders at early-stage startups
              <span className="mx-2 text-[var(--mute-soft)]">·</span>
              students at IIT, BITS, Ashoka
            </span>
          </motion.div>
        </div>

        <motion.div
          variants={child}
          className="flex w-full justify-center md:justify-end"
        >
          {/*
            ASSET SLOT: If you want a real app screenshot instead of the interactive demo,
            drop it at /public/app-screenshot-1.png and swap <LiveDemo /> for a next/image.
            But we recommend keeping the interactive demo — it converts better.
          */}
          <LiveDemo caption="The instrument at rest" />
        </motion.div>
      </motion.div>

      {/* Hero folio */}
      <div className="relative border-t border-[var(--hairline-soft)] bg-[var(--bg)]/60">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4 lg:px-12">
          <p className="folio truncate">
            Colado / Landing / Hero · Coordinate I.A
          </p>
          <p className="folio tnum shrink-0">01 / 06</p>
        </div>
      </div>
    </section>
  );
}
