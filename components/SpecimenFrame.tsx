import type { ReactNode } from "react";

/** Bordered section wrapper with optional anchor id (in-page nav targets). */
type SpecimenFrameProps = {
  sectionId?: string;
  className?: string;
  children: ReactNode;
};

export function SpecimenFrame({
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
      {children}
    </section>
  );
}
