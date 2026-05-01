import { createClient } from "@/lib/supabase/server";
import { AdminUserTable } from "@/components/admin/admin-user-table";
import type { Profile } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const supabase = await createClient();

  const { data: users } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Users</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        All registered users.
      </p>

      <div className="mt-6">
        <AdminUserTable users={(users ?? []) as Profile[]} />
      </div>
    </div>
  );
}
