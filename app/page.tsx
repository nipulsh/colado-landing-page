import { BenefitsSection } from "@/components/BenefitsSection";
import { CTASection } from "@/components/CTASection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProblemSection } from "@/components/ProblemSection";
import { SiteFooter } from "@/components/SiteFooter";
import { TransitionSection } from "@/components/TransitionSection";

export default function Home() {
  return (
    <div className="min-h-dvh text-[var(--colado-ink)]">
      <main>
        <Hero />
        <ProblemSection />
        <TransitionSection />
        <ExperienceSection />
        <HowItWorks />
        <BenefitsSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}
