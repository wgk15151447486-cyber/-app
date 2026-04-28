import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/types/project";

const variants: Record<ProjectStatus, string> = {
  draft: "border-transparent bg-muted text-muted-foreground",
  in_progress:
    "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  completed:
    "border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
};

interface Props {
  status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: Props) {
  return (
    <Badge variant="outline" className={variants[status]}>
      {status === "in_progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
