const QUOTES = [
  {
    text: "Simple, focused, and exactly what I needed.",
    attribution: "Beta tester",
  },
  {
    text: "I stop opening five apps to figure out what’s next.",
    attribution: "Design lead",
  },
  {
    text: "The opposite of another cluttered task list.",
    attribution: "Founder",
  },
];

export function QuotesSection() {
  return (
    <section
      className="bg-[var(--surface-container-low)] px-4 py-16 sm:px-8 lg:px-16 xl:px-20"
      aria-label="What people say"
    >
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 md:gap-10">
        {QUOTES.map(({ text, attribution }) => (
          <blockquote
            key={text}
            className="rounded-2xl bg-[var(--surface-container-lowest)] p-8 shadow-ambient"
          >
            <p className="text-sm font-medium leading-relaxed text-[var(--on-surface)]">
              &ldquo;{text}&rdquo;
            </p>
            <footer className="mt-6 text-xs font-semibold tracking-wide text-[var(--on-surface-variant)]">
              — {attribution}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
