"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  FileCheck,
  FileText,
  Mail,
  Plane,
  Receipt,
  type LucideIcon,
} from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { SECTION_VIEWPORT, contentRevealTransition } from "@/lib/motion";

const TASKS: { label: string; icon: LucideIcon }[] = [
  { label: "Ship the deck", icon: FileText },
  { label: "Reply to Alex", icon: Mail },
  { label: "Book flights", icon: Plane },
  { label: "Review contract", icon: FileCheck },
  { label: "Gym", icon: Dumbbell },
  { label: "Tax receipts", icon: Receipt },
];

const driftTransition = (i: number) => ({
  x: {
    duration: 5 + (i % 3),
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
  y: {
    duration: 5 + (i % 3),
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
});

const cardViewport = { once: true as const, margin: "-12% 0px" as const };

export function ProblemSection() {
  return (
    <SectionReveal
      id="problem"
      className="relative min-h-[85vh] border-t border-[var(--colado-primary)]/10 bg-[var(--colado-surface)]/40 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={contentRevealTransition(0)}
          className="font-display text-2xl text-[var(--colado-ink)] md:text-3xl"
        >
          You already know what to do…
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={contentRevealTransition(0.1)}
          className="mt-4 text-lg text-[var(--colado-muted)]"
        >
          But you don’t know what to do first.
        </motion.p>
      </div>

      <div className="relative mx-auto mt-16 h-[min(420px,55vh)] max-w-4xl md:mt-20 md:h-[480px]">
        {TASKS.map(({ label, icon: Icon }, i) => {
          const positions = [
            { top: "6%", left: "8%", rotate: -8 },
            { top: "12%", right: "6%", rotate: 6 },
            { top: "38%", left: "4%", rotate: 4 },
            { top: "32%", right: "10%", rotate: -5 },
            { top: "58%", left: "18%", rotate: -3 },
            { top: "52%", right: "14%", rotate: 7 },
          ][i] ?? { top: "40%", left: "40%", rotate: 0 };

          return (
            <motion.div
              key={label}
              className="absolute max-w-[11rem] rounded-2xl border border-white/50 bg-[var(--colado-card)] px-3 py-3 text-left text-sm font-medium text-[var(--colado-ink)] shadow-[0_10px_40px_-12px_rgba(79,77,140,0.35)] backdrop-blur-xl md:max-w-[13rem] md:px-4 md:py-3.5 md:text-base"
              style={{
                top: positions.top,
                left: "left" in positions ? positions.left : undefined,
                right: "right" in positions ? positions.right : undefined,
                rotate: positions.rotate,
              }}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={cardViewport}
              transition={contentRevealTransition(i * 0.07)}
            >
              <motion.div
                animate={{
                  x: [0, (i % 2 === 0 ? 1 : -1) * 12, 0],
                  y: [0, (i % 3) * -10 - 4, 0],
                }}
                transition={driftTransition(i)}
                className="flex items-start gap-2.5"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--colado-primary)]/12 text-[var(--colado-primary)]">
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="leading-snug">{label}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </SectionReveal>
  );
}
