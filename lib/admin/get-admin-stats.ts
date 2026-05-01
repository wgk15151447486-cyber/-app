import { createClient } from "@/lib/supabase/server";

export interface AdminStats {
  totalUsers: number;
  totalProjects: number;
  paidProjects: number;
  generationJobs: number;
  failedGenerationJobs: number;
  paymentRecords: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient();

  const [
    { count: totalUsers },
    { count: totalProjects },
    { count: paidProjects },
    { count: generationJobs },
    { count: failedGenerationJobs },
    { count: paymentRecords },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("is_paid", true),
    supabase.from("generation_jobs").select("*", { count: "exact", head: true }),
    supabase
      .from("generation_jobs")
      .select("*", { count: "exact", head: true })
      .eq("status", "failed"),
    supabase.from("payments").select("*", { count: "exact", head: true }),
  ]);

  return {
    totalUsers: totalUsers ?? 0,
    totalProjects: totalProjects ?? 0,
    paidProjects: paidProjects ?? 0,
    generationJobs: generationJobs ?? 0,
    failedGenerationJobs: failedGenerationJobs ?? 0,
    paymentRecords: paymentRecords ?? 0,
  };
}
