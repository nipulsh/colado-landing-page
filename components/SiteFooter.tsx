"use client";

import { motion } from "framer-motion";
import { SECTION_VIEWPORT, contentRevealTransition } from "@/lib/motion";

export function SiteFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={SECTION_VIEWPORT}
      transition={contentRevealTransition(0)}
      className="border-t border-[var(--colado-primary)]/10 bg-[var(--colado-deep)]/95 px-6 py-12 text-center text-sm text-white/55"
    >
      <p className="text-xs">© {new Date().getFullYear()} Colado</p>
    </motion.footer>
  );
}
