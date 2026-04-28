import Link from "next/link";
import { requireUser } from "@/lib/auth/get-current-user";
import { getUserProjects } from "@/lib/projects/get-user-projects";
import { ProjectList } from "@/components/projects/project-list";
import { LogoutButton } from "@/components/auth/logout-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();
  const projects = await getUserProjects();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back, {user.user_metadata?.full_name || user.email}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/projects/new"
            className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            New Project
          </Link>
          <LogoutButton />
        </div>
      </div>

      <section>
        <h2 className="mb-4 font-semibold text-lg">Your Projects</h2>
        <ProjectList projects={projects} />
      </section>
    </div>
  );
}
