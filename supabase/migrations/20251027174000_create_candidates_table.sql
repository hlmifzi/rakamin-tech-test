-- Create candidates table to store applicant data with flexible attributes
-- Ids are text to support custom ids like 'cand_20251008_0001'

create table if not exists public.candidates (
  id text primary key,
  apply_jobs_id text, -- optional link to a job posting (can be FK later)
  attributes jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Ensure attributes is an array
  constraint candidates_attributes_is_array check (jsonb_typeof(attributes) = 'array')
);

-- Helpful index for filtering by applied job
create index if not exists idx_candidates_apply_jobs_id on public.candidates (apply_jobs_id);

-- Optional: GIN index if you plan to query inside attributes often
-- create index if not exists idx_candidates_attributes_gin on public.candidates using gin (attributes);

comment on table public.candidates is 'Stores candidate profiles with flexible attribute array payloads';
comment on column public.candidates.attributes is 'Array of objects: { key, label, value, order }';