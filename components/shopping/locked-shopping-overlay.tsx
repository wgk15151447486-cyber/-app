import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LockKeyhole } from "lucide-react";

interface Props {
  projectId: string;
}

export function LockedShoppingOverlay({ projectId }: Props) {
  return (
    <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
      <CardContent className="flex flex-col items-center gap-3 py-6 text-center sm:flex-row sm:text-left">
        <LockKeyhole className="size-6 shrink-0 text-yellow-600 dark:text-yellow-400" />
        <div className="flex-1 space-y-1">
          <p className="font-medium text-yellow-800 dark:text-yellow-200">
            Unlock complete shopping details
          </p>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Complete payment to access product links, supplier information, detailed
            purchase reasons, and more.
          </p>
        </div>
        <Link
          href={`/projects/${projectId}/checkout`}
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-yellow-600 px-4 text-sm font-medium text-white transition-colors hover:bg-yellow-700 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400"
        >
          Unlock for $4.99
        </Link>
      </CardContent>
    </Card>
  );
}
