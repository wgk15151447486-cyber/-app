import Link from "next/link";
import { getProject } from "@/lib/projects/get-project";
import { getProjectImages } from "@/lib/projects/get-project-images";
import { requireUser } from "@/lib/auth/get-current-user";
import { ImageUploader } from "@/components/projects/image-uploader";
import { UploadedImageGrid } from "@/components/projects/uploaded-image-grid";
import { ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function UploadPage({ params }: Props) {
  const { projectId } = await params;
  const user = await requireUser();
  const project = await getProject(projectId);
  const images = await getProjectImages(projectId);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Upload Photos</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Project: {project.title} &middot; {images.length}/5 images
          </p>
        </div>
        <Link
          href={`/projects/${project.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          &larr; Back to project
        </Link>
      </div>

      <div className="space-y-8">
        <ImageUploader
          projectId={projectId}
          userId={user.id}
          existingCount={images.length}
          onUploaded={() => {
            // Revalidate is handled by the server action's revalidatePath
          }}
        />

        <UploadedImageGrid images={images} projectId={projectId} />

        {/* Navigate to design requirements after uploading at least 1 image */}
        {images.length > 0 && (
          <Link
            href={`/projects/${projectId}/requirements`}
            className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 p-4 transition-colors hover:bg-primary/10"
          >
            <div>
              <p className="font-medium text-sm">Set Design Requirements</p>
              <p className="text-xs text-muted-foreground">
                Choose styles, goals, and constraints for your room
              </p>
            </div>
            <ArrowRight className="size-5 text-primary" />
          </Link>
        )}
      </div>
    </div>
  );
}
