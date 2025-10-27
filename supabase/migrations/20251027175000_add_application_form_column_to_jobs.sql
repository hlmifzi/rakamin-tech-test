-- Add application_form jsonb column to jobs table
-- Ensures the column exists and has valid JSON object type when not null

alter table public.jobs
  add column if not exists application_form jsonb;

-- Constraint: application_form must be a JSON object when provided
alter table public.jobs
  drop constraint if exists jobs_application_form_is_object;

alter table public.jobs
  add constraint jobs_application_form_is_object
  check (
    application_form is null
    or jsonb_typeof(application_form) = 'object'
  );

comment on column public.jobs.application_form is 'JSON object storing dynamic application form configuration per job';