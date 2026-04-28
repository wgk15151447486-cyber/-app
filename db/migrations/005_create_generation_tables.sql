-- 005_create_generation_tables
-- Run this in Supabase SQL Editor after 004_create_design_requirements.
--
-- Creates 4 tables for the AI generation pipeline:
--   generation_jobs  — track async AI job status
--   room_analyses    — AI analysis of uploaded room photos
--   design_variants  — AI-generated furnishing plans
--   shopping_items   — items to purchase per variant

-- ============================================================
-- generation_jobs
-- ============================================================

create table if not exists public.generation_jobs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  job_type text not null,
  status text not null default 'queued',
  progress integer not null default 0,
  input_payload jsonb not null default '{}',
  output_payload jsonb,
  error_message text,
  ai_model text,
  cost_estimate numeric,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.generation_jobs enable row level security;

create policy "Users can view own generation jobs"
  on public.generation_jobs for select using (auth.uid() = user_id);

create policy "Users can insert own generation jobs"
  on public.generation_jobs for insert with check (auth.uid() = user_id);

create policy "Users can update own generation jobs"
  on public.generation_jobs for update using (auth.uid() = user_id);

create policy "Users can delete own generation jobs"
  on public.generation_jobs for delete using (auth.uid() = user_id);

create index if not exists idx_generation_jobs_project_id
  on public.generation_jobs(project_id);

create index if not exists idx_generation_jobs_user_id
  on public.generation_jobs(user_id);

-- ============================================================
-- room_analyses
-- ============================================================

create table if not exists public.room_analyses (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  room_summary text,
  detected_room_type text,
  detected_existing_items jsonb not null default '[]',
  detected_problems jsonb not null default '[]',
  lighting_analysis text,
  color_analysis text,
  layout_analysis text,
  improvement_opportunities jsonb not null default '[]',
  raw_ai_response jsonb,
  created_at timestamptz not null default now()
);

alter table public.room_analyses enable row level security;

create policy "Users can view own room analyses"
  on public.room_analyses for select using (auth.uid() = user_id);

create policy "Users can insert own room analyses"
  on public.room_analyses for insert with check (auth.uid() = user_id);

create policy "Users can update own room analyses"
  on public.room_analyses for update using (auth.uid() = user_id);

create policy "Users can delete own room analyses"
  on public.room_analyses for delete using (auth.uid() = user_id);

create index if not exists idx_room_analyses_project_id
  on public.room_analyses(project_id);

-- ============================================================
-- design_variants
-- ============================================================

create table if not exists public.design_variants (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  variant_type text not null,
  title text not null,
  subtitle text,
  design_summary text,
  why_it_works text,
  style_tags text[] not null default '{}',
  estimated_budget_min numeric,
  estimated_budget_max numeric,
  currency text not null default 'USD',
  difficulty_level text not null default 'easy',
  maintenance_level text,
  best_for text[] not null default '{}',
  image_url text,
  image_storage_path text,
  prompt_used text,
  ai_model text,
  generation_status text not null default 'pending',
  is_locked boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.design_variants enable row level security;

create policy "Users can view own design variants"
  on public.design_variants for select using (auth.uid() = user_id);

create policy "Users can insert own design variants"
  on public.design_variants for insert with check (auth.uid() = user_id);

create policy "Users can update own design variants"
  on public.design_variants for update using (auth.uid() = user_id);

create policy "Users can delete own design variants"
  on public.design_variants for delete using (auth.uid() = user_id);

create index if not exists idx_design_variants_project_id
  on public.design_variants(project_id);

-- ============================================================
-- shopping_items
-- ============================================================

create table if not exists public.shopping_items (
  id uuid primary key default gen_random_uuid(),
  design_variant_id uuid not null references public.design_variants(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  category text not null,
  name text not null,
  description text,
  reason text,
  recommended_size text,
  recommended_color text,
  material text,
  quantity integer not null default 1,
  price_min numeric,
  price_max numeric,
  currency text not null default 'USD',
  priority text not null default 'recommended',
  product_url text,
  supplier_name text,
  affiliate_code text,
  image_url text,
  is_locked boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.shopping_items enable row level security;

create policy "Users can view own shopping items"
  on public.shopping_items for select using (auth.uid() = user_id);

create policy "Users can insert own shopping items"
  on public.shopping_items for insert with check (auth.uid() = user_id);

create policy "Users can update own shopping items"
  on public.shopping_items for update using (auth.uid() = user_id);

create policy "Users can delete own shopping items"
  on public.shopping_items for delete using (auth.uid() = user_id);

create index if not exists idx_shopping_items_design_variant_id
  on public.shopping_items(design_variant_id);

create index if not exists idx_shopping_items_project_id
  on public.shopping_items(project_id);
