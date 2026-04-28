import { Container } from "@/components/layout/container";
import { Upload, Sparkles, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload a photo",
    description:
      "Snap or upload a picture of any room. Our AI scans the dimensions, lighting, and existing furniture in seconds.",
  },
  {
    icon: Sparkles,
    title: "Get AI recommendations",
    description:
      "Receive a tailored furnishing plan with layout options, color palettes, and style suggestions optimized for guest appeal.",
  },
  {
    icon: ShoppingCart,
    title: "Shop the list",
    description:
      "Get a detailed shopping list with direct purchase links so you can order everything in one go and start hosting.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y bg-muted/30 py-16 sm:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-3 text-muted-foreground">
            Three simple steps from photo to furnished room
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center gap-4 text-center"
            >
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="size-6" />
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Step {i + 1}
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
