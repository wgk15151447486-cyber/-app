import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

const roomTypeLabels: Record<string, string> = {
  bedroom: "Bedroom",
  living_room: "Living Room",
  studio: "Studio",
  entire_home: "Entire Home",
  hotel_room: "Hotel Room",
  other: "Other",
};

const purposeLabels: Record<string, string> = {
  personal_use: "Personal Use",
  long_term_rental: "Long-term Rental",
  short_term_rental: "Short-term Rental",
  hotel_operation: "Hotel Operation",
};

const budgetTypeLabels: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  custom: "Custom",
};

export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <div className="mt-2 flex items-center gap-2">
            <ProjectStatusBadge status={project.status} />
            <span className="text-sm text-muted-foreground">
              {roomTypeLabels[project.room_type]} &middot;{" "}
              {purposeLabels[project.purpose]}
            </span>
          </div>
        </div>
        <Link
          href={`/projects/${project.id}/upload`}
          className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Upload photos
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {budgetTypeLabels[project.budget_type]}
            </p>
            {project.budget_type === "custom" &&
              project.budget_min != null &&
              project.budget_max != null && (
                <p className="mt-1 text-lg font-semibold">
                  ${project.budget_min} – ${project.budget_max} {project.currency}
                </p>
              )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Location</CardTitle>
          </CardHeader>
          <CardContent>
            {project.location_city || project.location_country ? (
              <p className="text-sm text-muted-foreground">
                {[project.location_city, project.location_country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Not specified</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <p>Status: {project.status}</p>
            <p>Created: {new Date(project.created_at).toLocaleDateString()}</p>
            <p>
              Updated: {new Date(project.updated_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
