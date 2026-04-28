import { Container } from "@/components/layout/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What kind of rooms can I upload?",
    answer:
      "Any indoor room — bedrooms, living rooms, kitchens, bathrooms, home offices, and even open-plan spaces. The AI works best with well-lit photos taken from a corner or doorway.",
  },
  {
    question: "How long does it take to get results?",
    answer:
      "Most analyses complete in under 60 seconds. Larger or more complex rooms may take up to 2 minutes. You will receive a notification when your plan is ready.",
  },
  {
    question: "Can I customize the AI suggestions?",
    answer:
      "Yes. After the initial plan is generated, you can request revisions targeting specific styles (e.g., 'make it more minimalist'), budget ranges, or color preferences. Pro users get unlimited revision rounds.",
  },
  {
    question: "Where do the shopping links come from?",
    answer:
      "The shopping list links to major furniture retailers. You can also configure preferred retailers in your account settings. Links are affiliate-free by default.",
  },
  {
    question: "Is my photo data private?",
    answer:
      "Yes. Room photos are encrypted at rest and in transit. We never use your photos for training without explicit opt-in consent. You can delete your data at any time.",
  },
  {
    question: "Do I need a subscription?",
    answer:
      "No. You can try the Free Preview with one room at no cost. After that, you can pay per project ($19 one-time) or subscribe monthly ($49/mo) for unlimited projects.",
  },
];

export function FaqSection() {
  return (
    <section className="border-t py-16 sm:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <Accordion className="mx-auto max-w-2xl">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
