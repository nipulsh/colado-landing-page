import { EmailForm } from "@/components/EmailForm";

export function FinalCtaSection() {
  return (
    <section
      id="early-access"
      className="scroll-mt-16 bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dim)] px-4 py-20 sm:px-8 lg:px-16 xl:px-20 lg:py-24"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight text-[var(--on-primary)] md:text-3xl">
          Get calm, focused productivity
        </h2>
        <p className="mt-4 text-sm text-[color-mix(in_srgb,var(--on-primary)_88%,transparent)] md:text-base">
          Request early access. We&apos;ll reach out when spots open up.
        </p>
        <div className="mt-10 rounded-2xl bg-[var(--surface-container-lowest)] p-8 shadow-ambient md:p-10">
          <EmailForm />
        </div>
      </div>
    </section>
  );
}
