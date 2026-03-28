export function BetaStrip() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="border-b border-[var(--ghost-border-primary)] bg-[color-mix(in_srgb,var(--primary-container)_55%,var(--surface-container-lowest))] px-4 py-2 text-center text-xs leading-snug text-[var(--on-surface)] sm:text-sm sm:leading-normal"
    >
      <span className="label-caps mr-2 text-[var(--primary-dim)]">Beta</span>
      <span className="text-[var(--on-surface-variant)]">
        Colado is in beta. We&apos;re still polishing the experience—your feedback
        shapes what ships next.
      </span>
    </div>
  );
}
