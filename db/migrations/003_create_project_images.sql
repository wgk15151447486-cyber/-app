-- 003_create_project_images
-- Run this in Supabase SQL Editor after 002_create_projects.
--
-- IMPORTANT: Before running the Storage RLS section below, create the bucket
-- via Supabase Dashboard:
--   1. Go to Storage > New Bucket
--   2. Name: project-images
--   3. Public bucket: OFF
--   4. Then run the full SQL below

-- ============================================================
-- project_images table
-- ============================================================

create table if not exists public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  image_url text not null,
  storage_path text not null,
  image_role text not null default 'room_photo',
  is_primary boolean not null default false,
  width integer,
  height integer,
  file_size integer,
  mime_type text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.project_images enable row level security;

-- Users can view only their own project images
create policy "Users can view own project images"
  on public.project_images for select
  using (auth.uid() = user_id);

-- Users can insert only their own project images
create policy "Users can insert own project images"
  on public.project_images for insert
  with check (auth.uid() = user_id);

-- Users can update only their own project images (for setting is_primary)
create policy "Users can update own project images"
  on public.project_images for update
  using (auth.uid() = user_id);

-- Users can delete only their own project images
create policy "Users can delete own project images"
  on public.project_images for delete
  using (auth.uid() = user_id);

-- ============================================================
-- Storage RLS policies for project-images bucket
-- (Only effective after the bucket has been created manually)
-- ============================================================

-- Allow users to upload to their own folder
create policy "Users can upload to own project folder"
  on storage.objects for insert
  with check (
    bucket_id = 'project-images'
    and auth.uid()::text = (storage.foldername(name))[2]
  );

-- Allow users to view their own project images
create policy "Users can view own project images in storage"
  on storage.objects for select
  using (
    bucket_id = 'project-images'
    and auth.uid()::text = (storage.foldername(name))[2]
  );

-- Allow users to delete their own project images
create policy "Users can delete own project images from storage"
  on storage.objects for delete
  using (
    bucket_id = 'project-images'
    and auth.uid()::text = (storage.foldername(name))[2]
  );
