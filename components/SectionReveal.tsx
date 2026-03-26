"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { SECTION_VIEWPORT, sectionRevealTransition } from "@/lib/motion";

type SectionRevealProps = HTMLMotionProps<"section"> & {
  children: React.ReactNode;
};

/**
 * Full-bleed section fade/slide-in as it enters the viewport (pairs with Lenis).
 */
export const SectionReveal = forwardRef<HTMLElement, SectionRevealProps>(
  function SectionReveal(
    { children, className, transition, ...rest },
    ref
  ) {
    return (
      <motion.section
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={SECTION_VIEWPORT}
        transition={transition ?? sectionRevealTransition(0)}
        {...rest}
      >
        {children}
      </motion.section>
    );
  }
);
