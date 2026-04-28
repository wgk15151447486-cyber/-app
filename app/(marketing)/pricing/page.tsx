import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaSection } from "@/components/marketing/cta-section";

export default function PricingPage() {
  return (
    <>
      <section className="py-20 text-center sm:py-32">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Choose your plan
        </h1>
        <p className="mt-4 text-muted-foreground">
          Start free, pay when you&apos;re ready to unlock the full plan.
        </p>
      </section>
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
