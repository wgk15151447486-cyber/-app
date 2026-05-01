import { Badge } from "@/components/ui/badge";
import type { Payment } from "@/types/payment";

interface PaymentRow extends Payment {
  user_email?: string;
  project_title?: string;
}

interface Props {
  payments: PaymentRow[];
}

export function AdminPaymentTable({ payments }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              User
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Project
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
              Amount
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 text-xs text-muted-foreground">
                {payment.user_email ?? payment.user_id.slice(0, 8)}
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground max-w-[150px] truncate">
                {payment.project_title ?? (payment.project_id?.slice(0, 8) ?? "—")}
              </td>
              <td className="px-4 py-3 text-right tabular-nums font-medium">
                ${payment.amount.toFixed(2)} {payment.currency}
              </td>
              <td className="px-4 py-3">
                <Badge
                  variant={payment.status === "paid" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {payment.status}
                </Badge>
              </td>
              <td className="px-4 py-3 text-right text-muted-foreground text-xs tabular-nums">
                {payment.paid_at
                  ? new Date(payment.paid_at).toLocaleDateString()
                  : "—"}
              </td>
            </tr>
          ))}
          {payments.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                No payments yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
