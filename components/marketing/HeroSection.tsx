"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { MockCaptureList } from "@/components/marketing/product-mocks";

export function HeroSection() {
  const scrollTo = useScrollToSection();

  return (
    <section
      id="hero"
      className="bg-[var(--surface-container-lowest)] px-4 pb-20 pt-12 sm:px-8 lg:px-16 xl:px-20 lg:pb-28 lg:pt-16"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <h1 className="font-display text-[clamp(2.125rem,5vw,3.5rem)] font-bold leading-[1.12] tracking-tight text-[var(--on-surface)]">
            Clarity on what to do next.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--on-surface-variant)]">
            Colado tells you the single best action to take right now—so you
            spend less time planning and more time doing.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[var(--on-surface-variant)]">
            <div className="flex items-center gap-0.5 text-[var(--primary)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-current"
                  strokeWidth={0}
                  aria-hidden
                />
              ))}
            </div>
            <span className="font-medium text-[var(--on-surface)]">
              Early supporters
            </span>
            <span className="hidden sm:inline text-[var(--secondary-text)]">
              ·
            </span>
            <span className="hidden sm:inline">
              &ldquo;Finally, one thing to focus on.&rdquo;
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => scrollTo("early-access")}>
              Get early access
            </Button>
            <Button
              variant="tertiary"
              size="lg"
              onClick={() => scrollTo("features")}
            >
              See how it works
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="rounded-3xl bg-[var(--surface-container)] p-6 lg:p-8">
            <MockCaptureList />
          </div>
        </div>
      </div>
    </section>
  );
}
