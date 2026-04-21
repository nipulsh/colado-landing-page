"use client";

import { useCallback, useMemo, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, Pencil, RotateCcw } from "lucide-react";
import {
  parseTaskInput,
  prioritize,
  type PrioritizedTask,
  type PriorityLabel,
} from "@/lib/prioritize";

const DEFAULT_INPUT =
  "Reply to investor email, Ship the pitch deck, Call the design lead, Book flight to Bangalore, Buy groceries";

type DemoState = "at-rest" | "editing" | "sorted";

type LiveDemoProps = {
  className?: string;
  initialInput?: string;
  /** If true, auto-prioritize on mount so the card looks "at rest" per the PDF. */
  autoRun?: boolean;
  /** Caption shown below the card (small inst text) */
  caption?: string;
};

const LABEL_STYLE: Record<PriorityLabel, { bg: string; text: string }> = {
  NOW: {
    bg: "var(--signal-priority)",
    text: "#fff",
  },
  NEXT: {
    bg: "transparent",
    text: "var(--ink)",
  },
  THEN: {
    bg: "transparent",
    text: "var(--ink-soft)",
  },
  LATER: {
    bg: "transparent",
    text: "var(--muted)",
  },
  ADMIN: {
    bg: "transparent",
    text: "var(--muted)",
  },
};

/** Static stamp used on the hero demo — matches the PDF "at rest" specimen. */
const STATIC_STAMP = "14:32 IST";

export function LiveDemo({
  className,
  initialInput = DEFAULT_INPUT,
  autoRun = true,
  caption,
}: LiveDemoProps) {
  const shouldReduce = useReducedMotion() ?? false;
  const [input, setInput] = useState(initialInput);
  const [state, setState] = useState<DemoState>(autoRun ? "sorted" : "editing");
  const [tasks, setTasks] = useState<PrioritizedTask[]>(() =>
    autoRun ? prioritize(parseTaskInput(initialInput)) : []
  );

  const spring = useMemo(
    () =>
      shouldReduce
        ? { type: "tween" as const, duration: 0.01 }
        : { type: "spring" as const, stiffness: 300, damping: 30 },
    [shouldReduce]
  );

  const handlePrioritize = useCallback(() => {
    const raw = parseTaskInput(input);
    if (raw.length === 0) return;
    const sorted = prioritize(raw);
    setTasks(sorted);
    setState("sorted");
  }, [input]);

  const handleEdit = useCallback(() => {
    setState("editing");
  }, []);

  const handleReset = useCallback(() => {
    setInput(DEFAULT_INPUT);
    setTasks(prioritize(parseTaskInput(DEFAULT_INPUT)));
    setState("sorted");
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePrioritize();
    }
  };

  return (
    <figure
      className={[
        "w-full max-w-[460px] text-left",
        className ?? "",
      ].join(" ")}
      aria-label="Colado interactive demo"
    >
      <div className="specimen-card demo-shadow overflow-hidden">
        {/* Card masthead */}
        <div className="flex items-center justify-between border-b border-[var(--hairline)] bg-[var(--bg-elevated)] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--signal-priority)]"
            />
            <span className="inst-sm">What&apos;s on your mind</span>
          </div>
          <span className="folio tnum hidden sm:inline">Fig. I.a</span>
        </div>

        {/* Editing pane (only when user is writing) */}
        <AnimatePresence initial={false}>
          {state === "editing" && (
            <motion.div
              key="editor"
              initial={shouldReduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-b border-[var(--hairline)]"
            >
              <div className="px-4 pb-3 pt-3 sm:px-5">
                <label htmlFor="demo-input" className="sr-only">
                  What&apos;s on your mind?
                </label>
                <textarea
                  id="demo-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={3}
                  placeholder="Type tasks, separated by commas. Press Enter to rank."
                  className="w-full resize-none rounded-md border border-transparent bg-transparent px-0 py-1 text-[14.5px] leading-relaxed text-[var(--ink)] placeholder:text-[var(--muted)] focus:border-transparent focus:outline-none sm:text-[15px]"
                  data-cursor="hover"
                  autoFocus
                />
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <span className="inst-sm">
                    {input.trim().length === 0
                      ? "Try: reply to investor, ship deck, buy groceries…"
                      : "Press Enter to rank"}
                  </span>
                  <button
                    type="button"
                    onClick={handlePrioritize}
                    disabled={input.trim().length === 0}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--accent)] px-3.5 text-[12px] font-medium text-white transition-opacity hover:opacity-95 disabled:opacity-40 sm:text-[13px]"
                  >
                    Prioritize <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Specimen list — the "instrument at rest" */}
        <div className="bg-[var(--bg-elevated)] px-3 py-2 sm:px-4">
          <LayoutGroup id="demo-list">
            <AnimatePresence mode="popLayout" initial={false}>
              {state === "sorted" && tasks.length > 0 ? (
                tasks.map((task, index) => {
                  const num = String(index + 1).padStart(2, "0");
                  const style = LABEL_STYLE[task.label];
                  const isTop = task.label === "NOW";
                  return (
                    <motion.div
                      key={task.id}
                      layout
                      initial={shouldReduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        layout: spring,
                        delay: shouldReduce ? 0 : 0.06 * index,
                        duration: 0.3,
                      }}
                      className={[
                        "group grid grid-cols-[28px_1fr_auto] items-start gap-3 border-b border-[var(--hairline-soft)] px-1 py-3 last:border-b-0 sm:px-2",
                      ].join(" ")}
                    >
                      <span className="folio tnum pt-1 text-[var(--mute-soft)]">
                        {num}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={[
                            "text-[14.5px] leading-snug text-[var(--ink)] sm:text-[15.5px]",
                            isTop ? "font-medium" : "",
                          ].join(" ")}
                        >
                          {task.text}
                        </p>
                        <p className="inst-sm mt-1 normal-case tracking-[0.04em] text-[var(--muted)]">
                          {task.tags}
                        </p>
                      </div>
                      <div className="flex shrink-0 justify-end pt-0.5">
                        <span
                          className="pill-label inline-flex items-center rounded-full px-2 py-0.5"
                          style={{
                            background: isTop ? style.bg : "transparent",
                            color: style.text,
                            border: isTop
                              ? "1px solid transparent"
                              : "1px solid var(--hairline)",
                          }}
                        >
                          {task.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })
              ) : state === "editing" ? (
                <motion.div
                  key="empty-editing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 text-center"
                >
                  <p className="text-[13px] text-[var(--muted)]">
                    Your ranked list will appear here.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </LayoutGroup>
        </div>

        {/* Card footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--hairline)] bg-[var(--bg)] px-4 py-3 sm:px-5">
          <span className="inst-sm">
            Prioritized by Colado · <span className="tnum">{STATIC_STAMP}</span>
          </span>
          <div className="flex items-center gap-2">
            {state === "editing" ? (
              <button
                type="button"
                onClick={() => {
                  if (tasks.length > 0) setState("sorted");
                  else handleReset();
                }}
                className="inst-sm inline-flex h-7 items-center gap-1 rounded-full border border-[var(--hairline)] px-2.5 hover:text-[var(--ink)]"
              >
                <span>Cancel</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleEdit}
                  aria-label="Rewrite tasks"
                  className="inst-sm inline-flex h-7 items-center gap-1 rounded-full border border-[var(--hairline)] px-2.5 hover:text-[var(--ink)]"
                >
                  <Pencil size={11} />
                  <span>Rewrite</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset demo"
                  className="inst-sm inline-flex h-7 items-center gap-1 rounded-full border border-[var(--hairline)] px-2.5 hover:text-[var(--ink)]"
                >
                  <RotateCcw size={11} />
                  <span>Reset</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {caption ? (
        <figcaption className="mt-3 flex items-center justify-between gap-4 px-1">
          <span className="inst-sm">{caption}</span>
          <span className="folio tnum">Fig. I.a</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
