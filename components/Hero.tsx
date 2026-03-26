"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailForm } from "@/components/EmailForm";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export function Hero() {
  const scrollToSection = useScrollToSection();
  const scrollToProblem = () => scrollToSection("problem");
  const reduceMotion = useReducedMotion();

  const enter = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } as const }
    : {
        initial: { opacity: 0, y: 14 } as const,
        animate: { opacity: 1, y: 0 } as const,
      };

  const t = (delay: number) =>
    reduceMotion
      ? { duration: 0 }
      : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, delay };

  return (
    <section
      id="hero"
      className="colado-grain relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-24 md:px-10 md:pb-28 md:pt-28"
    >
      <div
        className="pointer-events-none absolute -right-24 top-20 h-56 w-56 rounded-full bg-[var(--colado-accent)]/20 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-32 h-64 w-64 rounded-full bg-[var(--colado-primary)]/22 blur-2xl"
        aria-hidden
      />

      <motion.div
        {...enter}
        transition={t(0)}
        className="relative z-10 mb-8 flex flex-col items-center gap-6 sm:mb-8 sm:flex-row sm:gap-5"
        aria-hidden
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--colado-card)] text-[var(--colado-primary)] shadow-md shadow-[var(--colado-primary)]/12 ring-1 ring-white/50">
          <Sparkles className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <span className="hidden h-px w-10 bg-gradient-to-r from-transparent via-[var(--colado-primary)]/40 to-transparent sm:block" />
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--colado-deep)]/90 text-amber-200 shadow-md shadow-black/15 ring-1 ring-white/10">
          <Zap className="h-7 w-7" strokeWidth={1.5} />
        </span>
        <span className="hidden h-px w-10 bg-gradient-to-r from-transparent via-[var(--colado-primary)]/40 to-transparent sm:block" />
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--colado-card)] text-[var(--colado-accent)] shadow-md shadow-[var(--colado-accent)]/12 ring-1 ring-white/50">
          <Layers className="h-7 w-7" strokeWidth={1.5} />
        </span>
      </motion.div>

      <motion.div
        {...enter}
        transition={t(0.06)}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--colado-primary)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Colado
        </p>
        <h1 className="font-display text-[clamp(2.25rem,6vw,3.75rem)] font-medium leading-[1.08] tracking-tight text-[var(--colado-ink)]">
          Stop planning.
          <br />
          Start doing.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--colado-muted)]">
          Colado tells you exactly what to do next.
        </p>
      </motion.div>

      <motion.div
        {...enter}
        transition={t(0.12)}
        className="relative z-10 mt-10 w-full max-w-lg"
      >
        <p className="mb-3 text-center text-sm font-medium text-[var(--colado-muted)]">
          Get early access
        </p>
        <EmailForm formClassName="items-stretch sm:items-center" />
      </motion.div>

      <motion.div
        {...enter}
        transition={t(0.18)}
        className="relative z-10 mt-10"
      >
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={scrollToProblem}
          className="gap-2 rounded-full px-6 text-[var(--colado-ink)]"
        >
          Scroll to experience
          <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
        </Button>
      </motion.div>
    </section>
  );
}
