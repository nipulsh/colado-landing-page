"use client";

/**
 * KeyboardShortcuts — press `?` to reveal a small overlay listing hotkeys.
 * Auto-fades after 4s of inactivity. Press `Esc` or `?` again to dismiss.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SHORTCUTS: Array<{ keys: string[]; label: string }> = [
  { keys: ["?"], label: "This panel" },
  { keys: ["Esc"], label: "Close" },
];

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let autoCloseTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleAutoClose = () => {
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
      autoCloseTimer = setTimeout(() => setOpen(false), 4000);
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if (e.key === "?" && !isEditable) {
        e.preventDefault();
        setOpen((v) => {
          const next = !v;
          if (next) scheduleAutoClose();
          return next;
        });
        return;
      }

      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (isEditable) return;
    };

    window.addEventListener("keydown", onKey);
    return () => {
      if (autoCloseTimer) clearTimeout(autoCloseTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          key="shortcuts"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Keyboard shortcuts"
          className="fixed bottom-6 right-6 z-[80] hidden md:block"
        >
          <div
            style={{
              minWidth: 260,
              background: "color-mix(in srgb, var(--bg) 92%, transparent)",
              backdropFilter: "saturate(170%) blur(10px)",
              WebkitBackdropFilter: "saturate(170%) blur(10px)",
              border: "1px solid var(--hairline)",
              borderRadius: 10,
              padding: "14px 16px",
              fontFamily: "var(--mono)",
              boxShadow:
                "0 1px 1px color-mix(in srgb, var(--ink) 4%, transparent), 0 24px 60px -28px color-mix(in srgb, var(--ink) 22%, transparent)",
            }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--muted)",
                margin: 0,
              }}
            >
              Shortcuts
            </p>
            <ul
              style={{
                marginTop: 10,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {SHORTCUTS.map((s) => (
                <li
                  key={s.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    fontSize: 12,
                    color: "var(--ink-soft)",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span>{s.label}</span>
                  <span style={{ display: "inline-flex", gap: 4 }}>
                    {s.keys.map((k) => (
                      <kbd
                        key={k}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: 22,
                          height: 22,
                          padding: "0 6px",
                          fontFamily: "var(--mono)",
                          fontSize: 10.5,
                          letterSpacing: "0.08em",
                          color: "var(--ink)",
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--hairline)",
                          borderBottomWidth: 2,
                          borderRadius: 4,
                        }}
                      >
                        {k}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
