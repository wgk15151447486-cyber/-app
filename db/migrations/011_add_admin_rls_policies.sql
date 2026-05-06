-- 011_add_admin_rls_policies
-- Allow users with role='admin' to read all rows from core tables.
-- Uses a SECURITY DEFINER function to avoid infinite recursion when
-- the profiles table RLS policy references profiles itself.
-- Must be run after 010_create_exports.

create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$;

-- profiles: admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

-- projects: admins can view all projects
create policy "Admins can view all projects"
  on public.projects for select
  using (public.is_admin());

-- generation_jobs: admins can view all jobs
create policy "Admins can view all generation jobs"
  on public.generation_jobs for select
  using (public.is_admin());

-- payments: admins can view all payments
create policy "Admins can view all payments"
  on public.payments for select
  using (public.is_admin());

-- exports: admins can view all exports
create policy "Admins can view all exports"
  on public.exports for select
  using (public.is_admin());
