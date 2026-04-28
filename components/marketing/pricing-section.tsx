import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free Preview",
    price: "Free",
    period: null,
    description: "Try it out before committing a cent.",
    features: [
      "1 room analysis",
      "AI furnishing suggestions",
      "Basic shopping list (no links)",
      "Watermarked output",
    ],
    cta: "Try free",
    href: "/projects/new",
    highlighted: false,
  },
  {
    name: "Single Project",
    price: "$19",
    period: "one-time",
    description: "Perfect for one room makeover.",
    features: [
      "1 full room project",
      "Complete AI layout plan",
      "Clickable shopping links",
      "2 revision rounds",
      "Full-resolution export",
    ],
    cta: "Start project",
    href: "/projects/new",
    highlighted: true,
  },
  {
    name: "Pro Monthly",
    price: "$49",
    period: "month",
    description: "For hosts managing multiple listings.",
    features: [
      "Unlimited room projects",
      "Priority AI processing",
      "Branded style profiles",
      "Bulk export & share",
      "Early access to new features",
    ],
    cta: "Go Pro",
    href: "/projects/new",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-3 text-muted-foreground">
            Start free, upgrade when you&apos;re ready
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-xl border p-6 ${
                plan.highlighted
                  ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                  : "bg-card"
              }`}
            >
              {plan.highlighted && (
                <Badge className="mb-3 w-fit self-center">Most popular</Badge>
              )}
              <div className="mb-4">
                <h3 className="font-semibold text-lg">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <ul className="mb-6 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`inline-flex h-9 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border hover:bg-muted"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
