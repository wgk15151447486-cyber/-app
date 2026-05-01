-- 009_create_payments
-- Payment records for Stripe single-project unlock.

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  provider text not null default 'stripe',
  provider_payment_id text,
  product_type text not null,
  amount numeric not null,
  currency text not null default 'USD',
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- Idempotency: prevent duplicate Stripe payment IDs
create unique index if not exists idx_payments_provider_payment_id
  on public.payments(provider_payment_id)
  where provider_payment_id is not null;

alter table public.payments enable row level security;

create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);
