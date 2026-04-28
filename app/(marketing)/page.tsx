import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-32">
        <span className="rounded-full border bg-muted px-4 py-1 text-xs font-medium text-muted-foreground">
          Now in early access
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Turn any empty room into a{" "}
          <span className="text-primary">guest-ready space</span> with AI
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Upload a photo of your room and get personalized furnishing recommendations,
          layout options, and a ready-to-order shopping list — all powered by AI.
        </p>
        <div className="flex gap-3">
          <Button size="lg">Upload a photo</Button>
          <Button size="lg" variant="outline">
            Learn more
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-3 sm:px-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
              1
            </div>
            <h3 className="font-semibold">Upload a photo</h3>
            <p className="text-sm text-muted-foreground">
              Snap or upload a picture of any room. Our AI analyzes the space in seconds.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
              2
            </div>
            <h3 className="font-semibold">Get AI recommendations</h3>
            <p className="text-sm text-muted-foreground">
              Receive a complete furnishing plan with layout options optimized for guest appeal.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
              3
            </div>
            <h3 className="font-semibold">Shop the list</h3>
            <p className="text-sm text-muted-foreground">
              Get a detailed shopping list with links so you can order everything in one go.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to transform your rental?
        </h2>
        <p className="text-muted-foreground">
          Join thousands of hosts who are increasing bookings with professionally styled rooms.
        </p>
        <Button size="lg" className="mt-2">
          Get started free
        </Button>
      </section>
    </>
  );
}
