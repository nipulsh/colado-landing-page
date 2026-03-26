"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, Sparkles } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { EASE_SECTION } from "@/lib/motion";

const CARDS = [
  { label: "Finish the proposal", x: -130, y: -50, r: -7 },
  { label: "Inbox zero", x: 115, y: -60, r: 6 },
  { label: "Walk the dog", x: -95, y: 55, r: 5 },
  { label: "Plan Q2", x: 105, y: 48, r: -5 },
];

export function TransitionSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18%" });

  return (
    <SectionReveal
      ref={ref}
      className="relative min-h-[72vh] overflow-hidden border-t border-[var(--colado-primary)]/10 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-[var(--colado-accent)]/35 to-transparent" />

      <div className="relative mx-auto flex min-h-[52vh] max-w-4xl flex-col items-center justify-center">
        <div className="relative h-72 w-full max-w-lg md:h-80">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.label}
              className="absolute left-1/2 top-1/2 flex w-[11rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-2xl border border-white/45 bg-[var(--colado-card)] px-3 py-3.5 text-center text-sm font-medium text-[var(--colado-ink)] shadow-[0_10px_40px_-14px_rgba(79,77,140,0.35)] backdrop-blur-xl md:w-[12rem] md:text-base"
              initial={{
                x: c.x,
                y: c.y,
                rotate: c.r,
                opacity: 1,
                scale: 1,
              }}
              animate={
                inView
                  ? {
                      x: c.x * 0.2,
                      y: c.y * 0.2,
                      rotate: c.r * 0.5,
                      opacity: 0,
                      scale: 0.88,
                    }
                  : undefined
              }
              transition={{
                duration: 1.05,
                ease: EASE_SECTION,
                delay: i * 0.06,
              }}
            >
              <Compass
                className="h-4 w-4 shrink-0 text-[var(--colado-muted)]"
                strokeWidth={1.75}
                aria-hidden
              />
              {c.label}
            </motion.div>
          ))}

          <motion.div
            className="absolute left-1/2 top-1/2 w-[min(19rem,88vw)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] border border-white/50 bg-gradient-to-br from-white/95 to-[#e8e4f8]/90 px-7 py-9 text-center shadow-[0_28px_90px_-24px_rgba(79,77,140,0.45)] backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.94, y: 8 }
            }
            transition={{
              duration: 0.9,
              delay: 0.62,
              ease: EASE_SECTION,
            }}
          >
            <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--colado-accent)]/15 text-[var(--colado-accent)]">
              <Sparkles className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--colado-primary)]">
              Next
            </p>
            <p className="mt-2 font-display text-xl text-[var(--colado-ink)] md:text-2xl">
              Finish the proposal
            </p>
          </motion.div>
        </div>

        <motion.h2
          className="mt-14 flex max-w-lg items-center justify-center gap-2 text-center font-display text-2xl tracking-tight text-[var(--colado-ink)] md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 1.05, ease: EASE_SECTION }}
        >
          <Sparkles
            className="h-6 w-6 shrink-0 text-[var(--colado-accent)] md:h-7 md:w-7"
            strokeWidth={1.5}
            aria-hidden
          />
          Colado decides for you.
        </motion.h2>
      </div>
    </SectionReveal>
  );
}
