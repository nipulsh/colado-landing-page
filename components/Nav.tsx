"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#hero", label: "Experience", section: "§ 01" },
  { href: "#audience", label: "Audience", section: "§ 02" },
  { href: "#voices", label: "Voices", section: "§ 03" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <>
      <header className="nav-surface fixed inset-x-0 top-0 z-50 border-b border-[var(--hairline)]">
        <nav className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:h-[60px] sm:px-8 lg:px-12">
          <Link
            href="/"
            className="flex items-baseline gap-2"
            aria-label="Colado — home"
          >
            <span className="display text-[22px] leading-none tracking-tight text-[var(--ink)] sm:text-[24px]">
              Colado
            </span>
            <span className="hidden text-[10.5px] text-[var(--muted)] sm:inline inst-sm">
              An instrument for the next move
            </span>
          </Link>

          <ul className="hidden items-center gap-7 md:flex lg:gap-9">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group flex items-baseline gap-1.5 text-[13.5px] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  <span className="folio tnum opacity-70 group-hover:opacity-100">
                    {l.section}
                  </span>
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#fin"
              className="hidden h-9 items-center rounded-full bg-[var(--ink)] px-4 text-[12.5px] font-medium tracking-wide text-[var(--bg)] transition-opacity hover:opacity-90 md:inline-flex"
            >
              Request access
            </a>

            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--ink)] sm:h-10 sm:w-10 md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-[var(--bg)] md:hidden"
          >
            <div className="flex h-full flex-col px-6 pt-20 sm:px-8">
              <p className="inst-sm mb-8">§ Contents</p>
              <ul className="flex flex-col gap-5">
                {LINKS.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.35 }}
                  >
                    <a
                      href={l.href}
                      onClick={close}
                      className="flex items-baseline gap-3"
                    >
                      <span className="folio tnum w-10 shrink-0">
                        {l.section}
                      </span>
                      <span className="display text-[36px] leading-tight text-[var(--ink)] sm:text-[44px]">
                        {l.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * LINKS.length + 0.1, duration: 0.35 }}
                  className="pt-5"
                >
                  <a
                    href="#fin"
                    onClick={close}
                    className="inline-flex h-12 items-center rounded-full bg-[var(--ink)] px-6 text-[14px] font-medium text-[var(--bg)]"
                  >
                    Request access →
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
