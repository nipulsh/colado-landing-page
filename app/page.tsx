import { FeatureStack } from "@/components/marketing/FeatureStack";
import { FinalCtaSection } from "@/components/marketing/FinalCtaSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HowItWorksBand } from "@/components/marketing/HowItWorksBand";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";
import { QuotesSection } from "@/components/marketing/QuotesSection";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { TrustBand } from "@/components/marketing/TrustBand";

export default function Home() {
  return (
    <div className="min-h-dvh bg-[var(--surface)] text-[var(--on-surface)]">
      <SiteHeader />
      <main>
        <HeroSection />
        <QuotesSection />
        <HowItWorksBand />
        <FeatureStack />
        <TrustBand />
        <FinalCtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
