import { requireUser } from "@/lib/auth/get-current-user";
import { LogoutButton } from "@/components/auth/logout-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-32">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back, {user.user_metadata?.full_name || user.email}.
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="mt-12 rounded-xl border bg-card p-8 text-center">
        <p className="text-muted-foreground">
          Your projects will appear here. Project creation is coming in Task 4.
        </p>
      </div>
    </div>
  );
}
