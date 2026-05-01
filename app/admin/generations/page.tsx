import { createClient } from "@/lib/supabase/server";
import { AdminGenerationTable } from "@/components/admin/admin-generation-table";
import type { GenerationJob } from "@/types/generation";

export const dynamic = "force-dynamic";

export default async function AdminGenerationsPage() {
  const supabase = await createClient();

  const { data: jobs } = await supabase
    .from("generation_jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Generation Jobs</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        AI generation job history.
      </p>

      <div className="mt-6">
        <AdminGenerationTable jobs={(jobs ?? []) as GenerationJob[]} />
      </div>
    </div>
  );
}
