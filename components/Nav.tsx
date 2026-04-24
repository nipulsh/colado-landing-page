"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { brandMastheadSub } from "@/lib/brand";

const LINKS = [
  { href: "#hero", label: "Experience" },
  { href: "#audience", label: "Audience" },
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
      <header
        className="nav-surface fixed inset-x-0 top-0 z-50 border-b border-[var(--hairline)]"
        style={{
          paddingTop: "max(0px, env(safe-area-inset-top, 0px))",
        }}
      >
        <nav className="mx-auto flex h-14 w-full min-w-0 max-w-[1280px] items-center justify-between gap-c3 px-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] sm:h-[60px] sm:gap-c5 sm:px-c6 lg:px-c7">
          <Link
            href="/"
            className="flex min-w-0 max-w-[min(100%,18rem)] flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:max-w-none"
            aria-label="Colado — home"
          >
            <span className="display text-[20px] leading-none tracking-tight text-[var(--ink)] min-[400px]:text-[22px] sm:text-[24px]">
              Colado
            </span>
            <span className="hidden w-full min-w-0 [word-break:break-word] sm:ml-0 sm:inline sm:w-auto sm:text-[10.5px] inst-sm text-[var(--muted)]">
              {brandMastheadSub}
            </span>
          </Link>

          <ul className="hidden items-center gap-7 md:flex lg:gap-9">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group flex items-baseline gap-1.5 text-[13.5px] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  <span>{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-c2">
            <a
              href="#fin"
              className="hidden h-9 items-center rounded-full bg-[var(--ink)] px-c4 text-[12.5px] font-medium tracking-wide text-[var(--bg)] transition-opacity hover:opacity-90 md:inline-flex"
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
            style={{
              paddingTop: "max(5rem, env(safe-area-inset-top, 0px))",
            }}
          >
            <div className="flex h-full min-w-0 flex-col px-c5 sm:px-c6">
              <p className="inst-sm mb-8">Contents</p>
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
                    className="inline-flex h-12 items-center rounded-full bg-[var(--ink)] px-c5 text-[14px] font-medium text-[var(--bg)]"
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
