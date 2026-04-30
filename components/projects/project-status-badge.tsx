import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/types/project";

const variants: Record<ProjectStatus, string> = {
  draft: "border-transparent bg-muted text-muted-foreground",
  images_uploaded:
    "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  requirements_completed:
    "border-transparent bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  in_progress:
    "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  completed:
    "border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  failed:
    "border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

const labels: Record<ProjectStatus, string> = {
  draft: "Draft",
  images_uploaded: "Images Uploaded",
  requirements_completed: "Requirements Done",
  in_progress: "In Progress",
  completed: "Completed",
  failed: "Failed",
};

interface Props {
  status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: Props) {
  return (
    <Badge variant="outline" className={variants[status]}>
      {labels[status]}
    </Badge>
  );
}
