-- 010_create_exports
-- Export records for PDF generation. Only paid users can create exports.

create table if not exists public.exports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  export_type text not null,
  file_url text,
  storage_path text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

alter table public.exports enable row level security;

-- Users can view their own exports
create policy "Users can view own exports"
  on public.exports for select
  using (auth.uid() = user_id);

-- Users can insert their own exports
create policy "Users can insert own exports"
  on public.exports for insert
  with check (auth.uid() = user_id);
