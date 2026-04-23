"use client";

/**
 * RevealHeading — animates a display heading with a bottom-up clip-path reveal
 * per line. Ink soaking into paper. Respects `prefers-reduced-motion`.
 *
 * Usage:
 *   <RevealHeading as="h2" className="display …">
 *     For people<br /><em>who make things.</em>
 *   </RevealHeading>
 */

import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealHeadingProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  /** Delay in seconds before the reveal starts (in view). */
  delay?: number;
  /** Per-line stagger in seconds. */
  stagger?: number;
  /** Total duration per line. */
  duration?: number;
};

function splitByBreaks(children: ReactNode): ReactNode[] {
  const lines: ReactNode[] = [];
  let current: ReactNode[] = [];
  const flush = () => {
    if (current.length > 0) {
      lines.push(current.length === 1 ? current[0] : <>{current}</>);
      current = [];
    }
  };
  const nodes = Array.isArray(children) ? children : [children];
  for (const n of nodes) {
    if (
      typeof n === "object" &&
      n !== null &&
      "type" in (n as object) &&
      (n as { type?: unknown }).type === "br"
    ) {
      flush();
    } else {
      current.push(n);
    }
  }
  flush();
  return lines;
}

export function RevealHeading({
  as = "h2",
  className = "",
  children,
  delay = 0,
  stagger = 0.06,
  duration = 0.72,
}: RevealHeadingProps) {
  const reduce = useReducedMotion() ?? false;
  const sentinelRef = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lines = useMemo(() => splitByBreaks(children), [children]);

  if (reduce) {
    return createElement(as, { className }, children);
  }

  return createElement(
    as,
    { className },
    <>
      {/* Invisible sentinel used for IntersectionObserver, avoids ref-on-heading */}
      <span
        ref={sentinelRef}
        aria-hidden
        style={{ display: "inline-block", width: 0, height: 0, overflow: "hidden" }}
      />
      {lines.map((line, i) => (
        <span
          key={i}
          style={{
            display: "block",
            overflow: "hidden",
            paddingBottom: "0.08em",
          }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform, clip-path" }}
            initial={{
              clipPath: "inset(100% 0 0 0)",
              y: "0.3em",
            }}
            animate={
              inView
                ? {
                    clipPath: "inset(0% 0 0 0)",
                    y: "0em",
                  }
                : undefined
            }
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.77, 0, 0.175, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </>,
  );
}
