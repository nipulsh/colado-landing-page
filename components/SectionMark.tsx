"use client";

/**
 * SectionMark — the editorial section label (e.g. "Audience", "Method").
 *
 * Adds a *moment* of numbering: when the section enters the viewport, a
 * Roman-numeral glyph types in next to the label for ~1.5s, then fades to
 * 20% opacity. Numbering as an appearance, not a permanent label.
 *
 *   <SectionMark index={1}>Audience</SectionMark>
 *   → typed-in "I" stays as quiet marginalia
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export function SectionMark({
  index,
  children,
}: {
  index?: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
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

  const roman = index != null ? ROMAN[index] : undefined;

  return (
    <p
      ref={ref}
      className="section-mark flex items-baseline gap-2"
    >
      {roman && (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, width: 0 }}
          animate={
            inView && !reduce
              ? { opacity: [0, 1, 1, 0.2], width: "auto" }
              : { opacity: reduce ? 0.2 : 0, width: "auto" }
          }
          transition={{
            duration: 2.2,
            times: [0, 0.18, 0.7, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            display: "inline-block",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.24em",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {roman} ·
        </motion.span>
      )}
      <span>{children}</span>
    </p>
  );
}
