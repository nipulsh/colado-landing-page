"use client";

import { useEffect, useState } from "react";

/**
 * useLocalClock — returns current time as HH:MM (24h) in the user's timezone,
 * updating once per minute. Also returns a short tz tag (e.g. "IST", "PDT").
 */
export function useLocalClock(): { hhmm: string; tz: string; full: string } {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeoutId = setTimeout(() => {
      tick();
      intervalId = setInterval(tick, 60_000);
    }, msToNextMinute);
    return () => {
      clearTimeout(timeoutId);
      if (intervalId != null) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const tz = shortTz(now);

  return { hhmm: `${hh}:${mm}`, tz, full: `${hh}:${mm}:${ss}` };
}

function shortTz(d: Date): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZoneName: "short",
    }).formatToParts(d);
    const tz = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    const m = tz.match(/[A-Z]{2,5}/);
    return m ? m[0] : tz;
  } catch {
    const offset = -d.getTimezoneOffset() / 60;
    return `UTC${offset >= 0 ? "+" : ""}${offset}`;
  }
}
