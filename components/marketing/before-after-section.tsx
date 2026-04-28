import { Container } from "@/components/layout/container";

const examples = [
  {
    before: { label: "Before", description: "Empty spare bedroom, bare walls" },
    after: {
      label: "After (AI plan)",
      description: "Cozy guest room with queen bed, nightstands, warm lighting",
    },
  },
  {
    before: { label: "Before", description: "Dated living room with mismatched furniture" },
    after: {
      label: "After (AI plan)",
      description: "Modern living space with sectional sofa, accent chairs, gallery wall",
    },
  },
  {
    before: { label: "Before", description: "Unused corner in a studio" },
    after: {
      label: "After (AI plan)",
      description: "Functional workspace with desk, shelving, and task lighting",
    },
  },
];

export function BeforeAfterSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See the transformation
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real examples of what RoomReady AI can do for your space
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {examples.map((item, i) => (
            <div key={i} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <div className="flex aspect-[3/4] items-center justify-center rounded-lg border-2 border-dashed border-destructive/30 bg-destructive/5">
                    <span className="text-xs font-medium text-destructive/70">
                      Empty room
                    </span>
                  </div>
                  <span className="text-xs font-medium text-destructive">
                    {item.before.label}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {item.before.description}
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex aspect-[3/4] items-center justify-center rounded-lg border-2 border-primary/30 bg-primary/5">
                    <span className="text-xs font-medium text-primary/70">
                      RoomReady
                    </span>
                  </div>
                  <span className="text-xs font-medium text-primary">
                    {item.after.label}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {item.after.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
