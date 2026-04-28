import Link from "next/link";
import { Container } from "@/components/layout/container";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to transform your rental?
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Join thousands of hosts who are increasing bookings with
          professionally styled rooms — all planned by AI.
        </p>
        <Link
          href="/projects/new"
          className="mt-2 inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get started free
          <ArrowRight className="size-4" />
        </Link>
      </Container>
    </section>
  );
}
