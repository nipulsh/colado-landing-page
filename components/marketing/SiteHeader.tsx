"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/marketing/BrandLogo";
import { Button } from "@/components/ui/button";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "features", label: "Features" },
  { id: "how", label: "How it works" },
  { id: "early-access", label: "Early access" },
] as const;

export function SiteHeader() {
  const scrollTo = useScrollToSection();
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(id);
  };

  return (
    <header className="bg-[color-mix(in_srgb,var(--surface-container-lowest)_80%,transparent)] shadow-ambient backdrop-blur-[20px]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 lg:px-16 xl:px-20">
        <button
          type="button"
          onClick={() => go("hero")}
          className="flex shrink-0 items-center rounded-lg outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
          aria-label="Colado, go to top"
        >
          <BrandLogo className="h-9 sm:h-10" priority />
        </button>

        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Primary"
        >
          {LINKS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className="text-sm font-medium text-[var(--on-surface-variant)] transition-colors hover:text-[var(--on-surface)]"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button size="sm" onClick={() => go("early-access")}>
            Get early access
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-container-low)] text-[var(--on-surface)] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <X className="h-5 w-5" strokeWidth={2} aria-hidden />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "bg-[var(--surface-container-low)] md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex flex-col gap-1 px-4 py-4 sm:px-8">
          {LINKS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className="rounded-xl px-3 py-3 text-left text-sm font-medium text-[var(--on-surface)] hover:bg-[var(--surface-container-high)]"
            >
              {label}
            </button>
          ))}
          <Button className="mt-2 w-full" onClick={() => go("early-access")}>
            Get early access
          </Button>
        </div>
      </div>
    </header>
  );
}
