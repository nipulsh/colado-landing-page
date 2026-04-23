"use client";

/**
 * ViewTransitionsBridge — enables the browser's View Transitions API for
 * in-page anchor navigation. When a user clicks <a href="#section">, we
 * wrap the smooth-scroll inside `document.startViewTransition`. Browsers
 * that support it (Chromium 111+, Safari 18+) get a free crossfade
 * between the before and after layouts.
 *
 * Progressive: if the API isn't available, we fall back to the default
 * anchor-link behaviour. Users see the same scroll; they just don't get
 * the crossfade.
 *
 * We also emit @view-transition CSS below (in globals.css) to opt-in
 * top-level.
 */

import { useEffect } from "react";

type DocumentWithVT = Document & {
  startViewTransition?: (cb: () => void) => {
    finished: Promise<void>;
    ready: Promise<void>;
  };
};

export function ViewTransitionsBridge() {
  useEffect(() => {
    const doc = document as DocumentWithVT;
    if (typeof doc.startViewTransition !== "function") return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const targetEl = document.querySelector(href);
      if (!targetEl) return;

      e.preventDefault();
      doc.startViewTransition!(() => {
        targetEl.scrollIntoView({ behavior: "auto", block: "start" });
        // Update the URL hash without re-triggering scroll
        history.pushState(null, "", href);
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
