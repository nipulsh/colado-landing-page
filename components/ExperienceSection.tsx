"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, ListTodo } from "lucide-react";
import { useCallback, useEffect, useReducer } from "react";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/SectionReveal";
import { EASE_SECTION, SECTION_VIEWPORT, contentRevealTransition } from "@/lib/motion";

const QUEUE = [
  { title: "Draft the one-paragraph summary", seconds: 25 },
  { title: "Send the follow-up email", seconds: 15 },
  { title: "Block 20 minutes for deep work", seconds: 20 },
] as const;

type DemoState = { index: number; secondsLeft: number };

type DemoAction = { type: "tick" } | { type: "next" };

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  if (action.type === "tick") {
    return {
      ...state,
      secondsLeft: Math.max(0, state.secondsLeft - 1),
    };
  }
  const nextIndex =
    state.index + 1 < QUEUE.length ? state.index + 1 : 0;
  return {
    index: nextIndex,
    secondsLeft: QUEUE[nextIndex].seconds,
  };
}

export function ExperienceSection() {
  const [state, dispatch] = useReducer(demoReducer, {
    index: 0,
    secondsLeft: QUEUE[0].seconds,
  });

  const task = QUEUE[state.index] ?? QUEUE[0];

  useEffect(() => {
    if (state.secondsLeft <= 0) return;
    const t = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => clearInterval(t);
  }, [state.secondsLeft, state.index]);

  const complete = useCallback(() => {
    dispatch({ type: "next" });
  }, []);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(1, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <SectionReveal
      id="experience"
      className="scroll-mt-8 border-t border-[var(--colado-primary)]/10 bg-[var(--colado-surface)]/35 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-xl">
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={contentRevealTransition(0)}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--colado-primary)]/15 text-[var(--colado-primary)] ring-1 ring-[var(--colado-primary)]/20">
            <ListTodo className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--colado-muted)]">
            Try it
          </p>
          <h2 className="mt-2 font-display text-2xl text-[var(--colado-ink)] md:text-3xl">
            One thing. Right now.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[var(--colado-muted)]">
            Tap done — Colado surfaces what matters next.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 rounded-[1.75rem] border border-white/50 bg-gradient-to-b from-white/90 to-[var(--colado-card)] p-1 shadow-[0_20px_60px_-24px_rgba(79,77,140,0.4)] backdrop-blur-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={SECTION_VIEWPORT}
          transition={contentRevealTransition(0.12)}
        >
          <div className="rounded-[1.6rem] bg-[var(--colado-bg)]/65 px-6 py-8 md:px-8 md:py-10">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--colado-primary)]">
              <CheckCircle2 className="h-4 w-4" strokeWidth={2} aria-hidden />
              Do this now
            </div>

            <div className="relative mt-8 min-h-[8rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={task.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: EASE_SECTION }}
                  className="text-center"
                >
                  <p className="font-display text-xl leading-snug text-[var(--colado-ink)] md:text-2xl">
                    {task.title}
                  </p>
                  <p className="mt-6 flex items-center justify-center gap-2 font-mono text-3xl tabular-nums tracking-tight text-[var(--colado-ink)]/90">
                    <Clock
                      className="h-7 w-7 text-[var(--colado-accent)]"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    {fmt(state.secondsLeft)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button type="button" size="lg" onClick={complete}>
                Mark done
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={complete}>
                Skip for later
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionReveal>
  );
}
