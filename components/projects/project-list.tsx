import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/types/project";

interface Props {
  projects: Project[];
}

export function ProjectList({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-12 text-center">
        <p className="text-muted-foreground">No projects yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
