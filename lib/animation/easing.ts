/**
 * Easing functions & interpolation helpers.
 * Ported from the Quiet Instruments animation prototype.
 */

// ── Easing functions ────────────────────────────────────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).

export type EasingFn = (t: number) => number;

export const Easing = {
  linear: ((t: number) => t) as EasingFn,

  // Quad
  easeInQuad: ((t: number) => t * t) as EasingFn,
  easeOutQuad: ((t: number) => t * (2 - t)) as EasingFn,
  easeInOutQuad: ((t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t) as EasingFn,

  // Cubic
  easeInCubic: ((t: number) => t * t * t) as EasingFn,
  easeOutCubic: ((t: number) => {
    const u = t - 1;
    return u * u * u + 1;
  }) as EasingFn,
  easeInOutCubic: ((t: number) =>
    t < 0.5
      ? 4 * t * t * t
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1) as EasingFn,

  // Quart
  easeInQuart: ((t: number) => t * t * t * t) as EasingFn,
  easeOutQuart: ((t: number) => {
    const u = t - 1;
    return 1 - u * u * u * u;
  }) as EasingFn,
  easeInOutQuart: ((t: number) => {
    if (t < 0.5) return 8 * t * t * t * t;
    const u = t - 1;
    return 1 - 8 * u * u * u * u;
  }) as EasingFn,

  // Expo
  easeInExpo: ((t: number) =>
    t === 0 ? 0 : Math.pow(2, 10 * (t - 1))) as EasingFn,
  easeOutExpo: ((t: number) =>
    t === 1 ? 1 : 1 - Math.pow(2, -10 * t)) as EasingFn,
  easeInOutExpo: ((t: number) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  }) as EasingFn,

  // Sine
  easeInSine: ((t: number) => 1 - Math.cos((t * Math.PI) / 2)) as EasingFn,
  easeOutSine: ((t: number) => Math.sin((t * Math.PI) / 2)) as EasingFn,
  easeInOutSine: ((t: number) =>
    -(Math.cos(Math.PI * t) - 1) / 2) as EasingFn,

  // Back (overshoot)
  easeOutBack: ((t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }) as EasingFn,
  easeInBack: ((t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  }) as EasingFn,
  easeInOutBack: ((t: number) => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  }) as EasingFn,

  // Elastic
  easeOutElastic: ((t: number) => {
    const c4 = (2 * Math.PI) / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }) as EasingFn,
} as const;

// ── Core interpolation helpers ──────────────────────────────────────────────

/** Clamp a value to [min, max] */
export const clamp = (v: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, v));

/**
 * Popmotion-style interpolation.
 * Maps t across input keyframes to output values with optional easing per segment.
 */
export function interpolate(
  input: number[],
  output: number[],
  ease: EasingFn | EasingFn[] = Easing.linear,
): (t: number) => number {
  return (t: number) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

/**
 * Single-segment tween.
 * Returns `from` before `start`, `to` after `end`.
 */
export function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic,
}: {
  from?: number;
  to?: number;
  start?: number;
  end?: number;
  ease?: EasingFn;
}): (t: number) => number {
  return (t: number) => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}
