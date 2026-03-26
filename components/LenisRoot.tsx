"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function LenisRoot({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        anchors: true,
        smoothWheel: true,
        lerp: 0.072,
        wheelMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
