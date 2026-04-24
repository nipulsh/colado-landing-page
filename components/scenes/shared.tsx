"use client";

/**
 * Shared primitives for all Colado scenes.
 * Quiet Instruments palette, reusable specimen chrome, typing helper.
 */

import { Easing, clamp } from "@/lib/animation/easing";
import { useSprite } from "@/lib/animation/context";
import { brandMastheadSub } from "@/lib/brand";

// ── Palette ─────────────────────────────────────────────────────────────────

export const COLADO = {
  paper: "#f7f5f0",
  paperSoft: "#efece4",
  paperElev: "#ffffff",
  ink: "#0e0f0c",
  inkSoft: "#2a2b27",
  muted: "#6b6c66",
  muteSoft: "#8a8b84",
  hairline: "#e5e1d6",
  hairlineSoft: "#efeae0",
  accent: "#2d5f3f",
  accentSoft: "#e8f0ea",
  signal: "#c9502e",
  signalSoft: "#f4e6e0",
  signalDone: "#6b8e5a",
} as const;

export const FONTS = {
  display: "'Instrument Serif', ui-serif, Georgia, serif",
  body: "'Geist', ui-sans-serif, system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
} as const;

// ── Masthead ────────────────────────────────────────────────────────────────

type MastheadProps = {
  left?: string;
  leftSub?: string;
  right?: string;
  rightSub?: string;
  /**
   * `stage` = design pixels inside the 1920×1080 canvas (scales with Stage).
   * `fluid` = real viewport; clamped padding for reduced-motion / screen-sized layouts.
   */
  variant?: "stage" | "fluid";
};

export function Masthead({
  left = "Colado",
  leftSub = brandMastheadSub,
  right = "Specimen",
  rightSub = "",
  variant = "stage",
}: MastheadProps) {
  const fluid = variant === "fluid";
  return (
    <div
      style={{
        position: fluid ? "relative" : "absolute",
        top: fluid ? undefined : 0,
        left: fluid ? undefined : 0,
        right: fluid ? undefined : 0,
        padding: fluid
          ? "max(8px, env(safe-area-inset-top, 0px)) max(12px, env(safe-area-inset-right, 0px)) 10px max(12px, env(safe-area-inset-left, 0px))"
          : "28px 72px",
        display: "flex",
        flexWrap: fluid ? "wrap" : "nowrap",
        rowGap: fluid ? 8 : 0,
        columnGap: 16,
        justifyContent: "space-between",
        alignItems: fluid ? "flex-start" : "center",
        borderBottom: `1px solid ${COLADO.hairlineSoft}`,
        fontFamily: FONTS.mono,
        fontSize: fluid ? "clamp(8px, 2.1vw, 13px)" : 13,
        letterSpacing: fluid ? "0.16em" : "0.22em",
        textTransform: "uppercase",
        color: COLADO.muted,
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: fluid ? 8 : 16,
          alignItems: "center",
          flexWrap: "wrap",
          minWidth: 0,
        }}
      >
        <span style={{ color: COLADO.inkSoft, fontWeight: 500 }}>{left}</span>
        <span style={{ color: COLADO.muteSoft, letterSpacing: 0 }}>·</span>
        <span style={{ minWidth: 0 }}>{leftSub}</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: fluid ? 8 : 16,
          alignItems: "center",
          marginLeft: fluid ? "auto" : undefined,
          flexWrap: "wrap",
          justifyContent: "flex-end",
          textAlign: "right" as const,
        }}
      >
        <span style={{ color: COLADO.inkSoft, fontWeight: 500 }}>{right}</span>
        {rightSub && (
          <>
            <span style={{ color: COLADO.muteSoft, letterSpacing: 0 }}>·</span>
            <span>{rightSub}</span>
          </>
        )}
      </div>
    </div>
  );
}

// ── Folio ────────────────────────────────────────────────────────────────────

type FolioProps = {
  coord?: string;
  idx?: string;
  total?: string;
  variant?: "stage" | "fluid";
};

export function Folio({
  coord = "Colado / Landing / Fig.",
  idx = "01",
  total = "06",
  variant = "stage",
}: FolioProps) {
  const fluid = variant === "fluid";
  return (
    <div
      style={{
        position: fluid ? "relative" : "absolute",
        bottom: fluid ? undefined : 0,
        left: fluid ? undefined : 0,
        right: fluid ? undefined : 0,
        marginTop: fluid ? "auto" : undefined,
        padding: fluid
          ? "10px max(12px, env(safe-area-inset-right, 0px)) max(10px, env(safe-area-inset-bottom, 0px)) max(12px, env(safe-area-inset-left, 0px))"
          : "24px 72px",
        display: "flex",
        flexDirection: fluid ? "column" : "row",
        flexWrap: "wrap",
        gap: fluid ? 6 : 0,
        justifyContent: "space-between",
        alignItems: fluid ? "stretch" : "center",
        rowGap: fluid ? 4 : 0,
        borderTop: `1px solid ${COLADO.hairlineSoft}`,
        fontFamily: FONTS.mono,
        fontSize: fluid ? "clamp(8px, 1.8vw, 12px)" : 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: COLADO.muteSoft,
        fontVariantNumeric: "tabular-nums",
        zIndex: 10,
      }}
    >
      <span style={{ minWidth: 0, lineHeight: 1.35 }}>{coord}</span>
      <span style={{ alignSelf: fluid ? "flex-end" : "auto" }}>
        {idx} / {total}
      </span>
    </div>
  );
}

// ── Paper grain overlay ─────────────────────────────────────────────────────

export function PaperGrain({ opacity = 0.32 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(20,20,15,0.06) 0.6px, transparent 1.4px)",
        backgroundSize: "6px 6px",
        opacity,
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}

// ── Hero fog ─────────────────────────────────────────────────────────────────

export function HeroFog({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background: `
          radial-gradient(72% 58% at 82% 16%, rgba(42,77,51,0.08) 0%, transparent 62%),
          radial-gradient(58% 44% at 12% 88%, rgba(178,74,40,0.06) 0%, transparent 58%)
        `,
        opacity,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

// ── Typewriter ──────────────────────────────────────────────────────────────

type TypewriterProps = {
  text: string;
  start?: number;
  end?: number;
  cursor?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export function Typewriter({
  text,
  start = 0,
  end = 1,
  cursor = true,
  ...rest
}: TypewriterProps) {
  const { localTime } = useSprite();
  const t = clamp((localTime - start) / (end - start), 0, 1);
  const n = Math.floor(t * text.length);
  const shown = text.slice(0, n);
  const blinking = localTime % 1 < 0.55;
  return (
    <span {...rest}>
      {shown}
      {cursor && t < 1 && (
        <span style={{ opacity: blinking ? 1 : 0 }}>▍</span>
      )}
      {cursor && t >= 1 && (
        <span style={{ opacity: blinking ? 1 : 0 }}>▍</span>
      )}
    </span>
  );
}

// ── Inst — mono label ───────────────────────────────────────────────────────

type InstProps = {
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  caps?: boolean;
};

export function Inst({
  children,
  size = 12,
  color,
  style = {},
  caps = true,
}: InstProps) {
  return (
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize: size,
        letterSpacing: caps ? "0.22em" : "0.04em",
        textTransform: caps ? "uppercase" : "none",
        color: color || COLADO.muted,
        fontWeight: 500,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ── Hairline ────────────────────────────────────────────────────────────────

export function Hairline({ style = {} }: { style?: React.CSSProperties }) {
  return <div style={{ height: 1, background: COLADO.hairline, ...style }} />;
}

// ── Fade ────────────────────────────────────────────────────────────────────

type FadeProps = {
  children: React.ReactNode;
  entryDur?: number;
  exitDur?: number;
  dy?: number;
  style?: React.CSSProperties;
};

export function Fade({
  children,
  entryDur = 0.45,
  exitDur = 0.35,
  dy = 12,
  style = {},
}: FadeProps) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let ty = 0;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * dy;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(
      clamp((localTime - exitStart) / exitDur, 0, 1),
    );
    opacity = 1 - t;
    ty = -t * dy * 0.6;
  }
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${ty}px)`,
        willChange: "transform, opacity",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
