"use client";

import { ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/SectionReveal";
import { useScrollToSection } from "@/hooks/useScrollToSection";

export function CTASection() {
  const scrollToSection = useScrollToSection();
  const scrollToHero = () => scrollToSection("hero");

  return (
    <SectionReveal
      id="early-access"
      className="scroll-mt-8 px-6 pb-28 pt-12 md:px-10 md:pb-36 md:pt-16"
    >
      <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--colado-deep)] via-[#2d2648] to-[var(--colado-primary)] px-8 py-14 text-center shadow-[0_28px_80px_-20px_rgba(34,30,54,0.65)] md:px-14 md:py-16">
        <div
          className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-1/4 h-40 w-40 rounded-full bg-[var(--colado-accent)]/30 blur-3xl"
          aria-hidden
        />

        <span className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-amber-100 ring-1 ring-white/25 backdrop-blur-md">
          <Sparkles className="h-8 w-8" strokeWidth={1.5} aria-hidden />
        </span>

        <h2 className="relative z-10 font-display text-[clamp(1.65rem,4vw,2.35rem)] font-medium leading-tight tracking-tight text-white">
          Let Colado decide your next move.
        </h2>
        <p className="relative z-10 mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/75">
          Join the list from the top — we&apos;ll only email you when it matters.
        </p>

        <div className="relative z-10 mt-8">
          <Button
            type="button"
            size="lg"
            onClick={scrollToHero}
            className="gap-2 rounded-full border-0 bg-white text-[var(--colado-deep)] shadow-lg hover:bg-white/95"
          >
            <ArrowUp className="h-4 w-4" aria-hidden />
            Early access in hero
          </Button>
        </div>
      </div>
    </SectionReveal>
  );
}
