-- 006_create_edit_requests
-- Run this in Supabase SQL Editor after 005_create_generation_tables.
--
-- edit_requests  — user-submitted natural-language edit instructions for a design variant.

create table if not exists public.edit_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  design_variant_id uuid not null references public.design_variants(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  instruction text not null,
  before_image_url text,
  after_image_url text,
  after_image_storage_path text,
  prompt_used text,
  ai_model text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

alter table public.edit_requests enable row level security;

create policy "Users can view own edit requests"
  on public.edit_requests for select using (auth.uid() = user_id);

create policy "Users can insert own edit requests"
  on public.edit_requests for insert with check (auth.uid() = user_id);

create policy "Users can update own edit requests"
  on public.edit_requests for update using (auth.uid() = user_id);

create policy "Users can delete own edit requests"
  on public.edit_requests for delete using (auth.uid() = user_id);

create index if not exists idx_edit_requests_project_id
  on public.edit_requests(project_id);

create index if not exists idx_edit_requests_design_variant_id
  on public.edit_requests(design_variant_id);

create index if not exists idx_edit_requests_user_id
  on public.edit_requests(user_id);
