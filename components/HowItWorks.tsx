"use client";

import { motion } from "framer-motion";
import { Mic, Sparkles, Target } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { SECTION_VIEWPORT, contentRevealTransition } from "@/lib/motion";

const STEPS = [
  {
    icon: Mic,
    title: "Add tasks",
    body: "Type or speak — Colado captures the noise.",
  },
  {
    icon: Sparkles,
    title: "Understands priorities",
    body: "Context, energy, deadlines — without another list.",
  },
  {
    icon: Target,
    title: "One clear action",
    body: "Always the next best move, not ten options.",
  },
];

export function HowItWorks() {
  return (
    <SectionReveal className="border-t border-[var(--colado-primary)]/10 px-6 py-24 md:px-10 md:py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={contentRevealTransition(0)}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--colado-primary)]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Flow
          </span>
          <h2 className="mt-3 font-display text-2xl text-[var(--colado-ink)] md:text-3xl">
            How it works
          </h2>
        </motion.div>
        <div className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SECTION_VIEWPORT}
              transition={contentRevealTransition(0.08 + i * 0.09)}
              className="relative overflow-hidden rounded-3xl border border-white/55 bg-[var(--colado-card)] px-6 py-9 text-center shadow-[0_16px_50px_-22px_rgba(79,77,140,0.35)] backdrop-blur-xl"
            >
              <span
                className="absolute right-4 top-4 font-display text-4xl font-medium tabular-nums text-[var(--colado-primary)]/15"
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--colado-deep)]/90 text-amber-100 shadow-md ring-1 ring-white/10">
                <step.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mt-6 font-display text-lg text-[var(--colado-ink)]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--colado-muted)]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
