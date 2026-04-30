import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { EditRequest } from "@/types/edit";

const statusLabels: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  failed: "Failed",
};

const statusVariants: Record<string, string> = {
  pending: "outline",
  processing: "secondary",
  completed: "default",
  failed: "destructive",
} as const;

interface Props {
  editRequests: EditRequest[];
}

export function EditHistory({ editRequests }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit History</CardTitle>
      </CardHeader>
      <CardContent>
        {editRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No edits have been made yet.
          </p>
        ) : (
          <div className="divide-y">
            {editRequests.map((edit, index) => (
              <div
                key={edit.id}
                className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">
                    #{editRequests.length - index} &mdash; {edit.instruction}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {new Date(edit.created_at).toLocaleString()}
                  </p>
                </div>
                <Badge
                  variant={
                    (statusVariants[edit.status] as "default") ?? "default"
                  }
                  className="shrink-0"
                >
                  {statusLabels[edit.status] ?? edit.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
