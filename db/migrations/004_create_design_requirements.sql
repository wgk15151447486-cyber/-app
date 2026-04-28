-- 004_create_design_requirements
-- Run this in Supabase SQL Editor after 003_create_project_images.

create table if not exists public.design_requirements (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  preferred_styles text[] not null default '{}',
  target_goals text[] not null default '{}',
  constraints text[] not null default '{}',
  keep_items text[] not null default '{}',
  avoid_items text[] not null default '{}',
  free_text text,
  allow_wall_paint boolean default false,
  allow_drilling boolean default false,
  allow_floor_change boolean default false,
  pet_friendly boolean default false,
  child_friendly boolean default false,
  easy_to_clean boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id)
);

-- Enable RLS
alter table public.design_requirements enable row level security;

-- Users can view only their own requirements
create policy "Users can view own requirements"
  on public.design_requirements for select
  using (auth.uid() = user_id);

-- Users can insert only their own requirements
create policy "Users can insert own requirements"
  on public.design_requirements for insert
  with check (auth.uid() = user_id);

-- Users can update only their own requirements
create policy "Users can update own requirements"
  on public.design_requirements for update
  using (auth.uid() = user_id);

-- Users can delete only their own requirements
create policy "Users can delete own requirements"
  on public.design_requirements for delete
  using (auth.uid() = user_id);
