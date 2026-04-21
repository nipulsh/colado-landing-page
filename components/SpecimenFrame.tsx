import type { ReactNode } from "react";

/**
 * SpecimenFrame — the almanac-style top masthead + bottom folio wrapper.
 *
 * Top: "COLADO · AN INSTRUMENT FOR THE NEXT MOVE · SPECIMEN N · TITLE"
 * Bottom: "COLADO / LANDING / <coordinate>" on the left, "NN / 06" on the right.
 *
 * The masthead collapses gracefully on narrow viewports (mobile will only show
 * "SPECIMEN N · TITLE" and the folio).
 */
type SpecimenFrameProps = {
  specimen: string; // e.g. "I"
  specimenTitle: string; // e.g. "HERO"
  coordinate: string; // e.g. "COLADO / LANDING / HERO"
  folio: string; // e.g. "01 / 06"
  sectionId?: string;
  className?: string;
  children: ReactNode;
};

export function SpecimenFrame({
  specimen,
  specimenTitle,
  coordinate,
  folio,
  sectionId,
  className,
  children,
}: SpecimenFrameProps) {
  return (
    <section
      id={sectionId}
      className={[
        "relative border-t border-[var(--hairline)]",
        className ?? "",
      ].join(" ")}
    >
      {/* Masthead */}
      <div className="border-b border-[var(--hairline-soft)] bg-[var(--bg)]/60">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4 lg:px-12">
          <p className="hidden items-center gap-3 text-[11px] md:flex">
            <span className="inst-sm inst-ink">Colado</span>
            <span className="text-[var(--mute-soft)]">·</span>
            <span className="inst-sm">An instrument for the next move</span>
          </p>
          <p className="flex items-center gap-2 text-[11px]">
            <span className="inst-sm inst-ink">Specimen {specimen}</span>
            <span className="text-[var(--mute-soft)]">·</span>
            <span className="inst-sm">{specimenTitle}</span>
          </p>
        </div>
      </div>

      {children}

      {/* Folio */}
      <div className="border-t border-[var(--hairline-soft)] bg-[var(--bg)]/60">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4 lg:px-12">
          <p className="folio truncate">{coordinate}</p>
          <p className="folio tnum shrink-0">{folio}</p>
        </div>
      </div>
    </section>
  );
}
