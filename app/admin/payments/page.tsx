import { createClient } from "@/lib/supabase/server";
import { AdminPaymentTable } from "@/components/admin/admin-payment-table";
import type { Payment } from "@/types/payment";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  const supabase = await createClient();

  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .order("paid_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Stripe payment records.
      </p>

      <div className="mt-6">
        <AdminPaymentTable payments={(payments ?? []) as Payment[]} />
      </div>
    </div>
  );
}
