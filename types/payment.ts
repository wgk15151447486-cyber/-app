export const PAYMENT_STATUSES = [
  "pending",
  "paid",
  "failed",
  "refunded",
] as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export const PRODUCT_TYPES = ["single_project_unlock"] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number];

export interface Payment {
  id: string;
  user_id: string;
  project_id: string | null;
  provider: string;
  provider_payment_id: string | null;
  product_type: ProductType;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
}

export interface PaymentInsert {
  user_id: string;
  project_id?: string | null;
  provider?: string;
  provider_payment_id?: string | null;
  product_type: ProductType;
  amount: number;
  currency?: string;
  status?: PaymentStatus;
  paid_at?: string | null;
}
