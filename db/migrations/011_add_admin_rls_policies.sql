-- 011_add_admin_rls_policies
-- Allow users with role='admin' to read all rows from core tables.
-- Must be run after 010_create_exports.

-- profiles: admins can view all profiles
create policy "Admins can view all profiles"
  on public.profiles for select
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- projects: admins can view all projects
create policy "Admins can view all projects"
  on public.projects for select
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- generation_jobs: admins can view all jobs
create policy "Admins can view all generation jobs"
  on public.generation_jobs for select
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- payments: admins can view all payments
create policy "Admins can view all payments"
  on public.payments for select
  using ((select role from public.profiles where id = auth.uid()) = 'admin');

-- exports: admins can view all exports
create policy "Admins can view all exports"
  on public.exports for select
  using ((select role from public.profiles where id = auth.uid()) = 'admin');
