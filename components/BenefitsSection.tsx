"use client";

import { motion } from "framer-motion";
import { Brain, Crosshair, Waves } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { SECTION_VIEWPORT, contentRevealTransition } from "@/lib/motion";

const ITEMS = [
  {
    line: "No overwhelm.",
    icon: Waves,
    hint: "Quiet the noise",
  },
  {
    line: "No decision fatigue.",
    icon: Brain,
    hint: "Fewer forks in the road",
  },
  {
    line: "One task. Total focus.",
    icon: Crosshair,
    hint: "Clarity beats lists",
  },
];

export function BenefitsSection() {
  return (
    <SectionReveal className="border-t border-[var(--colado-primary)]/10 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto flex max-w-2xl flex-col gap-12 md:gap-14">
        {ITEMS.map(({ line, icon: Icon, hint }, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={SECTION_VIEWPORT}
            transition={contentRevealTransition(0.06 + i * 0.1)}
            className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-8 sm:text-left"
          >
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--colado-deep)]/90 text-amber-100 shadow-lg shadow-[var(--colado-deep)]/25 ring-1 ring-white/10">
              <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden />
            </span>
            <div>
              <p className="font-display text-[clamp(1.5rem,4vw,2.25rem)] font-medium leading-tight tracking-tight text-[var(--colado-ink)]">
                {line}
              </p>
              <p className="mt-1 text-sm text-[var(--colado-muted)]">{hint}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}
