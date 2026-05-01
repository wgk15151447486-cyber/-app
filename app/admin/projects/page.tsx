import { createClient } from "@/lib/supabase/server";
import { AdminProjectTable } from "@/components/admin/admin-project-table";
import type { Project } from "@/types/project";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        All projects on the platform.
      </p>

      <div className="mt-6">
        <AdminProjectTable projects={(projects ?? []) as Project[]} />
      </div>
    </div>
  );
}
