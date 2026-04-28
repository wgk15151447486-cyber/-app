import { requireUser } from "@/lib/auth/get-current-user";
import { ProjectCreateForm } from "@/components/projects/project-create-form";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  await requireUser();

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24">
      <ProjectCreateForm />
    </div>
  );
}
