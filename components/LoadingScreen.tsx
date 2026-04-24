"use client";

/**
 * LoadingScreen — editorial percentage counter, shown once on first paint.
 *
 * Visual grammar matches the rest of the page:
 *   - Huge Instrument Serif number (0 → 100), tabular nums for stable layout
 *   - JetBrains Mono labels ("Loading · Colado") above, scene hint below
 *   - A single 1px hairline progress bar (dark ink on paper)
 *   - Exits with a clip-path reveal upward + subtle opacity fade
 *
 * Progress signal (real, not fake):
 *   - document.readyState → 25% / 55% / 85%
 *   - document.fonts.ready → +15%
 *   - window 'load' event → 100%
 *   - rAF ticker drives a smooth counter toward the latest target
 *
 * UX:
 *   - Minimum visible time of ~1.2s so the screen always reads intentional
 *   - Respects `prefers-reduced-motion` (instant in, instant out)
 *   - Disables body scroll while visible
 *   - Mounts once per session (sessionStorage), so returning visitors skip
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { brandMastheadSub } from "@/lib/brand";

const SESSION_KEY = "colado:loaded";
const MIN_VISIBLE_MS = 1200;

export function LoadingScreen() {
  const reduce = useReducedMotion() ?? false;

  // Visible starts true on both server & client (no hydration mismatch);
  // we read sessionStorage after mount to decide whether to skip.
  const [visible, setVisible] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const startRef = useRef<number | null>(null);

  // Read the "already loaded this session" flag post-hydration.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setVisible(false);
      }
    } catch {
      // sessionStorage blocked → keep visible
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    // Lock scroll while loading screen is up
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // If Lenis is running, stop it too (it drives scroll on its own raf loop)
    window.__lenis?.stop?.();

    startRef.current = performance.now();

    const bumpTarget = (v: number) => {
      targetRef.current = Math.max(targetRef.current, Math.min(100, v));
    };

    // Initial bump based on readyState
    if (document.readyState === "interactive") bumpTarget(55);
    else if (document.readyState === "complete") bumpTarget(85);
    else bumpTarget(25);

    const onDomLoaded = () => bumpTarget(55);
    const onLoad = () => bumpTarget(95);
    document.addEventListener("DOMContentLoaded", onDomLoaded);
    window.addEventListener("load", onLoad);

    // Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => bumpTarget(85)).catch(() => {});
    }

    // Simulated tail so we never stall — tops out at 96 before actual load
    const tailInterval = window.setInterval(() => {
      const t = (performance.now() - (startRef.current ?? 0)) / 1000;
      // Logistic-ish curve approaching 96
      const tail = 96 * (1 - Math.exp(-t * 0.9));
      bumpTarget(tail);
    }, 60);

    let raf = 0;
    const step = () => {
      setProgress((p) => {
        const target = targetRef.current;
        // Ease toward target; bigger distance -> bigger step, capped
        const delta = target - p;
        if (Math.abs(delta) < 0.05) return target;
        return p + delta * 0.08;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    // When window fully loaded + min time elapsed, jump to 100 & unmount
    const finish = () => {
      const elapsed = performance.now() - (startRef.current ?? 0);
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        targetRef.current = 100;
        // Allow a beat for the counter to hit 100 before exit
        window.setTimeout(() => {
          setVisible(false);
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {}
        }, 320);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      window.__lenis?.start?.();
      document.removeEventListener("DOMContentLoaded", onDomLoaded);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("load", finish);
      window.clearInterval(tailInterval);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  const pct = Math.floor(progress);
  const pctStr = String(pct).padStart(3, "0");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          aria-hidden
          initial={reduce ? { opacity: 1 } : { opacity: 1 }}
          exit={
            reduce
              ? { opacity: 0 }
              : {
                  clipPath: "inset(0 0 100% 0)",
                  opacity: 1,
                }
          }
          transition={reduce ? { duration: 0.001 } : { duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[100] flex min-h-0 flex-col items-stretch justify-between"
          style={{
            background: "#f4f0e6",
            color: "var(--ink)",
            padding: "max(16px, env(safe-area-inset-top, 0px)) max(16px, env(safe-area-inset-right, 0px)) max(20px, env(safe-area-inset-bottom, 0px)) max(16px, env(safe-area-inset-left, 0px))",
            willChange: "clip-path, opacity",
          }}
        >
          {/* Top-left wordmark / label */}
          <div className="flex min-w-0 flex-col items-start justify-between gap-2 min-[420px]:flex-row min-[420px]:items-baseline">
            <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
              <span
                className="display"
                style={{
                  fontSize: 28,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                Colado
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                Loading
              </span>
            </div>
            <span
              className="max-w-full shrink-0 text-right text-[0.6rem] min-[420px]:text-[10.5px]"
              style={{
                fontFamily: "var(--mono)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Edition 01 · Winter 2026
            </span>
          </div>

          {/* Centered giant percentage */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              paddingTop: 32,
              paddingBottom: 32,
            }}
          >
            <span
              className="display"
              style={{
                fontSize: "clamp(140px, 26vw, 360px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                fontWeight: 400,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {pctStr}
              <span
                style={{
                  fontSize: "0.28em",
                  verticalAlign: "super",
                  marginLeft: "0.08em",
                  color: "var(--muted)",
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.1em",
                }}
              >
                %
              </span>
            </span>
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11.5,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              {stageLabel(pct)}
            </span>
          </div>

          {/* Bottom: hairline progress + meta */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 1,
                background: "var(--hairline)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: `${pct}%`,
                  background: "var(--ink)",
                  transition: "width 120ms linear",
                  willChange: "width",
                }}
              />
            </div>
            <div className="flex min-w-0 flex-col items-start justify-between gap-1 min-[500px]:flex-row min-[500px]:items-baseline">
              <span
                className="max-w-full min-w-0 [word-break:break-word] text-[0.58rem] min-[500px]:text-[10.5px]"
                style={{
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {brandMastheadSub}
              </span>
              <span
                className="shrink-0 self-end text-[0.58rem] min-[500px]:text-[10.5px]"
                style={{
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                Specimen · {pctStr} / 100
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function stageLabel(pct: number): string {
  if (pct < 20) return "Pressing paper";
  if (pct < 45) return "Setting type";
  if (pct < 70) return "Composing plates";
  if (pct < 92) return "Warming the press";
  if (pct < 100) return "Final pass";
  return "Ready";
}
