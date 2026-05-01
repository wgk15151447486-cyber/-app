import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";

interface Props {
  projectId: string;
}

export function UnlockProjectCard({ projectId }: Props) {
  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardContent className="flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:text-left">
        <LockKeyhole className="size-6 shrink-0 text-primary" />
        <div className="flex-1 space-y-1">
          <p className="font-medium">Unlock complete shopping details</p>
          <p className="text-sm text-muted-foreground">
            One-time payment of $4.99 to access product links, supplier
            information, and detailed purchase reasons for this project.
          </p>
        </div>
        <Link
          href={`/projects/${projectId}/checkout`}
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Unlock for $4.99
        </Link>
      </CardContent>
    </Card>
  );
}
