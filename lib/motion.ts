/** Shared easing + viewport for section scroll reveals */
export const EASE_SECTION = [0.22, 1, 0.36, 1] as const;

export const SECTION_VIEWPORT = {
  once: true as const,
  amount: 0.2 as const,
  margin: "-10% 0px -8% 0px" as const,
};

export function sectionRevealTransition(delay = 0) {
  return {
    duration: 0.95,
    ease: EASE_SECTION,
    delay,
  };
}

export function contentRevealTransition(delay = 0) {
  return {
    duration: 0.75,
    ease: EASE_SECTION,
    delay,
  };
}
