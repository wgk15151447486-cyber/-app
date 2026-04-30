-- 007_create_product_catalog
-- Run this in Supabase SQL Editor after 006_create_edit_requests.
--
-- product_catalog  — internal product database for matching shopping items.

create table if not exists public.product_catalog (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  description text,
  style_tags text[] not null default '{}',
  suitable_room_types text[] not null default '{}',
  suitable_purposes text[] not null default '{}',
  color text,
  material text,
  size_text text,
  price numeric,
  currency text not null default 'USD',
  supplier_name text,
  product_url text not null,
  affiliate_code text,
  image_url text,
  country text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.product_catalog enable row level security;

-- All authenticated users can view active products
create policy "Anyone can view active products"
  on public.product_catalog for select
  using (is_active = true);

-- Admin users can view all products (including inactive)
create policy "Admins can view all products"
  on public.product_catalog for select
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Admin users can insert products
create policy "Admins can insert products"
  on public.product_catalog for insert
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Admin users can update products
create policy "Admins can update products"
  on public.product_catalog for update
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Admin users can delete products
create policy "Admins can delete products"
  on public.product_catalog for delete
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

create index if not exists idx_product_catalog_category
  on public.product_catalog(category);

create index if not exists idx_product_catalog_is_active
  on public.product_catalog(is_active);
