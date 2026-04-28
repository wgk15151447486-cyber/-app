import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";
import type { Project } from "@/types/project";

const roomTypeLabels: Record<string, string> = {
  bedroom: "Bedroom",
  living_room: "Living Room",
  studio: "Studio",
  entire_home: "Entire Home",
  hotel_room: "Hotel Room",
  other: "Other",
};

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="h-full transition-colors hover:border-primary/30">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base">{project.title}</CardTitle>
            <ProjectStatusBadge status={project.status} />
          </div>
          <CardDescription>
            {roomTypeLabels[project.room_type] ?? project.room_type}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Created {new Date(project.created_at).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
