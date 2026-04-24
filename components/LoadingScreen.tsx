"use client";

/**
 * LoadingScreen — preloader inspired by activetheory.net’s “init” layer
 * (full-viewport #000, technical mono chrome, large tabular 000–100%,
 * single horizontal load bar, crossfade out).
 *
 * How close this is to the real site (critical read):
 * - Similar: dark full-screen, minimal top chrome, big percentage with
 *   leading zeros, bottom progress track, all-caps mono system labels,
 *   fade transition into the app (industrial / WebGL-landing look).
 * - Different: Active Theory’s loader hands off into a custom Hydra/WebGL
 *   scene, often with neon, glass, and 3D; we don’t run their engine,
 *   shaders, or real asset load ratios—progress is still inferred from
 *   document + fonts as before. The film-grain/scan is a **light** CSS
 *   stand-in, not a GPU compositor. Brand is Colado, not “Active Theory.”
 * - The Colado *site* is paper-ink; this is intentionally a **separate
 *   dark** layer for ~1.2s so the first paint reads as “boot,” then
 *   resolves to the paper field (same hand-off idea as AT → WebGL, but
 *   we crossfade to the landing page, not 3D).
 *
 * Real progress:
 *   document.readyState, document.fonts.ready, window load, rAF lerp, min
 *   visible time, sessionStorage skip for repeat views.
 *
 * a11y: `aria-hidden` on overlay, respects reduced motion, restores scroll
 * and Lenis on exit.
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "colado:loaded";
const MIN_VISIBLE_MS = 1200;

const bg = "#000000";
const ink = "#fafaf9";
const dim = "rgba(255,255,255,0.4)";
const track = "rgba(255,255,255,0.12)";

export function LoadingScreen() {
  const reduce = useReducedMotion() ?? false;

  const [visible, setVisible] = useState<boolean>(true);
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setVisible(false);
      }
    } catch {
      // sessionStorage blocked
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop?.();
    startRef.current = performance.now();

    const bumpTarget = (v: number) => {
      targetRef.current = Math.max(targetRef.current, Math.min(100, v));
    };

    if (document.readyState === "interactive") bumpTarget(55);
    else if (document.readyState === "complete") bumpTarget(85);
    else bumpTarget(25);

    const onDomLoaded = () => bumpTarget(55);
    const onLoad = () => bumpTarget(95);
    document.addEventListener("DOMContentLoaded", onDomLoaded);
    window.addEventListener("load", onLoad);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => bumpTarget(85)).catch(() => {});
    }

    const tailInterval = window.setInterval(() => {
      const t = (performance.now() - (startRef.current ?? 0)) / 1000;
      const tail = 96 * (1 - Math.exp(-t * 0.9));
      bumpTarget(tail);
    }, 60);

    let raf = 0;
    const step = () => {
      setProgress((p) => {
        const target = targetRef.current;
        const delta = target - p;
        if (Math.abs(delta) < 0.05) return target;
        return p + delta * 0.08;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const finish = () => {
      const elapsed = performance.now() - (startRef.current ?? 0);
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => {
        targetRef.current = 100;
        window.setTimeout(() => {
          setVisible(false);
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            // ignore
          }
        }, 280);
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

  const pct = Math.min(100, Math.max(0, Math.floor(progress)));
  const pctStr = String(pct).padStart(3, "0");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          aria-hidden
          initial={{ opacity: reduce ? 1 : 0 }}
          animate={{ opacity: 1, filter: reduce ? "none" : "blur(0px)" }}
          exit={
            reduce
              ? { opacity: 0, filter: "none" }
              : { opacity: 0, filter: "blur(7px)" }
          }
          transition={
            reduce
              ? { duration: 0.1 }
              : {
                  opacity: { duration: 0.58, ease: [0.22, 0.61, 0.36, 1] as const },
                  filter: { duration: 0.58, ease: [0.22, 0.61, 0.36, 1] as const },
                }
          }
          className="fixed inset-0 z-[100] flex min-h-0 flex-col"
          style={{
            background: bg,
            color: ink,
            padding:
              "max(18px, env(safe-area-inset-top, 0px)) max(20px, env(safe-area-inset-right, 0px)) max(22px, env(safe-area-inset-bottom, 0px)) max(20px, env(safe-area-inset-left, 0px))",
            willChange: "opacity, filter",
            fontFamily: "var(--body)",
          }}
        >
          <div
            className="at-loader-vignette pointer-events-none absolute inset-0"
            aria-hidden
          />
          <div
            className="at-loader-grain pointer-events-none absolute inset-0"
            aria-hidden
          />
          {!reduce && (
            <div
              className="at-loader-scan absolute inset-0 opacity-[0.12]"
              aria-hidden
            />
          )}

          <div className="relative z-[1] flex min-h-0 w-full min-w-0 flex-1 flex-col font-sans">
            {/* Top rail — small caps studio / system (AT-style) */}
            <div className="flex min-w-0 items-end justify-between gap-4 text-[9px] font-medium uppercase sm:text-[10px]">
              <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
                <span
                  className="shrink-0 tracking-[0.32em] text-white/50"
                  style={{ fontFamily: "var(--mono)" }}
                >
                  Colado
                </span>
                <span
                  className="hidden min-w-0 truncate sm:inline"
                  style={{
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.2em",
                    color: dim,
                  }}
                >
                  Composed. One next move.
                </span>
              </div>
              <span
                className="shrink-0 tabular-nums"
                style={{
                  fontFamily: "var(--mono)",
                  letterSpacing: "0.2em",
                  color: dim,
                }}
              >
                {pctStr} · INIT
              </span>
            </div>

            {/* Center: dominant percentage */}
            <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-1 px-1 py-4">
              <div
                className="relative flex w-full min-w-0 max-w-[min(100%,28rem)] items-baseline justify-center sm:max-w-[min(100%,40rem)]"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                <span
                  className="select-none"
                  style={{
                    fontSize: "clamp(5.5rem, 30vw, 12.5rem)",
                    lineHeight: 0.88,
                    fontWeight: 200,
                    letterSpacing: "-0.04em",
                    color: ink,
                    fontFeatureSettings: '"tnum" 1',
                  }}
                >
                  {pctStr}
                </span>
                <span
                  className="self-start pt-[0.2em] sm:pt-2"
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "clamp(0.65rem, 2.2vw, 0.85rem)",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    color: "rgba(255,255,255,0.35)",
                    marginLeft: "0.12em",
                  }}
                >
                  %
                </span>
              </div>
              <p
                className="mt-2 text-center text-[0.5rem] font-medium uppercase tracking-[0.4em] sm:text-[10px] sm:tracking-[0.36em]"
                style={{ fontFamily: "var(--mono)", color: dim }}
              >
                {stageLabel(pct)}
              </p>
            </div>

            {/* Bottom: single bar + meta */}
            <div className="flex w-full min-w-0 flex-col gap-3">
              <div
                className="relative w-full overflow-hidden"
                style={{ height: 2, background: track, borderRadius: 1 }}
              >
                <div
                  className="absolute left-0 top-0 h-full transition-[width] duration-100 ease-linear"
                  style={{
                    width: `${pct}%`,
                    background: ink,
                    borderRadius: 1,
                    boxShadow: "0 0 20px color-mix(in srgb, #fff 18%, transparent)",
                  }}
                />
              </div>
              <div className="flex min-w-0 items-start justify-between gap-4 text-[0.5rem] sm:text-[9px]">
                <span
                  className="min-w-0 [word-break:break-word]"
                  style={{
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                    maxWidth: "65%",
                  }}
                >
                  System · loader · {pctStr} / 100
                </span>
                <span
                  className="shrink-0 tabular-nums"
                  style={{
                    fontFamily: "var(--mono)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.28)",
                  }}
                >
                  ED. 01
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function stageLabel(pct: number): string {
  if (pct < 18) return "allocating";
  if (pct < 42) return "resolving";
  if (pct < 68) return "mounting";
  if (pct < 94) return "syncing";
  if (pct < 100) return "sealing";
  return "enter";
}
