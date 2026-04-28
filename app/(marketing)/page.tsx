import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { BeforeAfterSection } from "@/components/marketing/before-after-section";
import { UseCasesSection } from "@/components/marketing/use-cases-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <BeforeAfterSection />
      <UseCasesSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
