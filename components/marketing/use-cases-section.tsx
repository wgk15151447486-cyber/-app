import { Container } from "@/components/layout/container";
import { Home, Building2, Hotel, User } from "lucide-react";

const audiences = [
  {
    icon: Home,
    title: "Airbnb Hosts",
    description:
      "Stand out in search results with professionally styled rooms. Higher nightly rates start with better photos and better spaces.",
    benefit: "Increase bookings by up to 30%",
  },
  {
    icon: Building2,
    title: "Rental Property Owners",
    description:
      "Furnish long-term rentals faster without hiring an interior designer. Get move-in ready plans tailored to your target tenant.",
    benefit: "Furnish a 2BR in under a week",
  },
  {
    icon: Hotel,
    title: "Small Hotel Owners",
    description:
      "Refresh guest rooms on a budget. AI-generated layouts account for brand consistency and operational practicality.",
    benefit: "Renovate without a design firm",
  },
  {
    icon: User,
    title: "Tenants & New Homeowners",
    description:
      "Moving into an unfurnished space? Upload a photo and get a complete setup plan with links to buy everything you need.",
    benefit: "First-night-ready in one order",
  },
];

export function UseCasesSection() {
  return (
    <section className="border-y py-16 sm:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Who is it for?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Built for anyone who needs to turn an empty room into a ready-to-use space
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="flex gap-4 rounded-xl border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <a.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold">{a.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {a.description}
                </p>
                <p className="mt-2 text-xs font-medium text-primary">
                  {a.benefit} →
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
