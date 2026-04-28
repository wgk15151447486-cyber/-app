-- 002_create_projects
-- Run this in your Supabase SQL Editor after 001_create_profiles.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  room_type text not null,
  purpose text not null,
  budget_type text not null,
  budget_min numeric,
  budget_max numeric,
  currency text not null default 'USD',
  location_country text,
  location_city text,
  status text not null default 'draft',
  is_paid boolean not null default false,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.projects enable row level security;

-- Users can view only their own projects
create policy "Users can view own projects"
  on public.projects for select
  using (auth.uid() = user_id);

-- Users can insert only their own projects
create policy "Users can insert own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

-- Users can update only their own projects
create policy "Users can update own projects"
  on public.projects for update
  using (auth.uid() = user_id);

-- Users can delete only their own projects
create policy "Users can delete own projects"
  on public.projects for delete
  using (auth.uid() = user_id);
