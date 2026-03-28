const STEPS = [
  {
    title: "Capture",
    body: "Add tasks by typing or voice—Colado holds the noise so you don’t have to.",
  },
  {
    title: "Prioritize",
    body: "Deadlines, energy, and context shape what matters without another manual sort.",
  },
  {
    title: "Act",
    body: "You always get one clear next move—not ten competing options.",
  },
];

export function HowItWorksBand() {
  return (
    <section
      id="how"
      className="scroll-mt-16 bg-[var(--surface-container-lowest)] px-4 py-20 sm:px-8 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-center text-2xl font-bold tracking-tight text-[var(--on-surface)] md:text-3xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--on-surface-variant)]">
          Three steps from chaos to one obvious action.
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-10">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl bg-[var(--surface-container-low)] p-8"
            >
              <span className="font-display text-3xl font-bold text-[var(--primary-container)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-lg font-bold text-[var(--on-surface)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--on-surface-variant)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
