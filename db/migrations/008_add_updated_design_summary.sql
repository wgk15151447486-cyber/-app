-- 008_add_updated_design_summary
-- Adds text edit result fields to edit_requests for non-destructive edit workflow.

alter table public.edit_requests
  add column if not exists updated_design_summary text,
  add column if not exists image_edit_instruction text;
