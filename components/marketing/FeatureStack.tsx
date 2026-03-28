import {
  MockManyToOne,
  MockNextAction,
  MockRhythm,
  MockWeekStrip,
} from "@/components/marketing/product-mocks";

const BLOCKS = [
  {
    id: "clarity",
    eyebrow: "Clear your mind",
    title: "From noisy backlog to one next step",
    body: "When everything feels urgent, nothing is. Colado absorbs the chaos of tasks, messages, and ideas—and hands back a single actionable move.",
    mock: <MockManyToOne />,
    reverse: false,
  },
  {
    id: "focus",
    eyebrow: "Focus",
    title: "See only what matters now",
    body: "Mental clarity comes from hiding everything that isn’t the next step. Colado surfaces one action at a time so you can execute—not endlessly re-plan.",
    mock: <MockNextAction />,
    reverse: false,
  },
  {
    id: "plan",
    eyebrow: "Plan",
    title: "Your week, without the spreadsheet",
    body: "Due dates and a lightweight calendar view help you trust the plan. Recurring work and upcoming commitments stay visible without drowning you in tabs.",
    mock: <MockWeekStrip />,
    reverse: true,
  },
  {
    id: "rhythm",
    eyebrow: "Rhythm",
    title: "Built around how you actually work",
    body: "Morning deep work, afternoon meetings, evening admin—Colado respects the shape of your day when it suggests what to tackle next.",
    mock: <MockRhythm />,
    reverse: false,
  },
] as const;

export function FeatureStack() {
  return (
    <div id="features" className="scroll-mt-16">
      {BLOCKS.map((block, index) => (
        <section
          key={block.id}
          className={
            index % 2 === 0
              ? "bg-[var(--surface)] px-4 py-20 sm:px-8 lg:px-16 xl:px-20"
              : "bg-[var(--surface-container-low)] px-4 py-20 sm:px-8 lg:px-16 xl:px-20"
          }
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div className={block.reverse ? "lg:order-2" : undefined}>
              <p className="label-caps text-[var(--primary)]">{block.eyebrow}</p>
              <h2 className="font-display mt-3 text-2xl font-bold tracking-tight text-[var(--on-surface)] md:text-3xl">
                {block.title}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[var(--on-surface-variant)]">
                {block.body}
              </p>
            </div>
            <div
              className={
                block.reverse
                  ? "mx-auto w-full max-w-md lg:order-1 lg:mx-0"
                  : "mx-auto w-full max-w-md lg:mx-0"
              }
            >
              <div
                className={
                  index % 2 === 0
                    ? "rounded-3xl bg-[var(--surface-container-low)] p-6 lg:p-8"
                    : "rounded-3xl bg-[var(--surface-container)] p-6 lg:p-8"
                }
              >
                {block.mock}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
