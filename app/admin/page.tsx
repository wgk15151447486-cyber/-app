import { getAdminStats } from "@/lib/admin/get-admin-stats";
import { AdminStatsCard } from "@/components/admin/admin-stats-card";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of platform activity.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminStatsCard label="Total Users" value={stats.totalUsers} />
        <AdminStatsCard label="Total Projects" value={stats.totalProjects} />
        <AdminStatsCard label="Paid Projects" value={stats.paidProjects} />
        <AdminStatsCard
          label="Generation Jobs"
          value={stats.generationJobs}
        />
        <AdminStatsCard
          label="Failed Generations"
          value={stats.failedGenerationJobs}
        />
        <AdminStatsCard label="Payment Records" value={stats.paymentRecords} />
      </div>
    </div>
  );
}
