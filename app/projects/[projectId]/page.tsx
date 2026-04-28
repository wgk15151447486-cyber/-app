/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { getProjectImages } from "@/lib/projects/get-project-images";
import { getRequirements } from "@/lib/requirements/get-requirements";
import { ProjectStatusBadge } from "@/components/projects/project-status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  const images = await getProjectImages(projectId);
  const requirements = await getRequirements(projectId);

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
        <div className="flex flex-col gap-2 text-right">
          <Link
            href={`/projects/${project.id}/upload`}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {images.length > 0 ? "Manage photos" : "Upload photos"}
          </Link>
          {images.length > 0 && (
            <Link
              href={`/projects/${project.id}/requirements`}
              className="text-sm font-medium text-primary hover:underline"
            >
              Design requirements &rarr;
            </Link>
          )}
          {project.status === "completed" && (
            <Link
              href={`/projects/${project.id}/variants`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View design variants &rarr;
            </Link>
          )}
        </div>
      </div>

      {/* Uploaded images preview */}
      {images.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            Photos ({images.length}/5)
          </h2>
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img) => (
              <div
                key={img.id}
                className={`shrink-0 overflow-hidden rounded-lg border-2 ${
                  img.is_primary ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={img.image_url}
                  alt="Room"
                  className="h-24 w-32 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirements summary */}
      {requirements && (
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-medium text-muted-foreground">
            Design Requirements
          </h2>
          <Card>
            <CardContent className="space-y-3 py-4">
              {requirements.preferred_styles.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Styles</p>
                  <div className="flex flex-wrap gap-1">
                    {requirements.preferred_styles.map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {requirements.target_goals.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Goals</p>
                  <div className="flex flex-wrap gap-1">
                    {requirements.target_goals.map((g) => (
                      <Badge key={g} variant="secondary" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {requirements.free_text && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm">{requirements.free_text}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

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
