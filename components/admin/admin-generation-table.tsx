import { Badge } from "@/components/ui/badge";
import type { GenerationJob } from "@/types/generation";

interface Props {
  jobs: GenerationJob[];
}

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  completed: "default",
  processing: "secondary",
  queued: "secondary",
  failed: "destructive",
};

export function AdminGenerationTable({ jobs }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Project
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
              Progress
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Error
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {jobs.map((job) => (
            <tr key={job.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 text-xs text-muted-foreground font-mono max-w-[120px] truncate">
                {job.project_id.slice(0, 8)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {job.job_type}
              </td>
              <td className="px-4 py-3">
                <Badge
                  variant={statusVariant[job.status] ?? "secondary"}
                  className="text-xs"
                >
                  {job.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-center tabular-nums text-xs">
                {job.progress}%
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate">
                {job.error_message ?? "—"}
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground text-xs tabular-nums">
                {new Date(job.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
          {jobs.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No generation jobs yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
