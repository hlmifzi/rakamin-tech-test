-- Seed new jobs: Frontend (active), Data Scientist (inactive), Backend (draft)
insert into public.jobs (id, slug, title, status, salary_range, list_card, created_at, updated_at)
values
  (
    'job_20251001_0001',
    'frontend-developer',
    'Frontend Developer',
    'active',
    '{"min":7000000,"max":8000000,"currency":"IDR","display_text":"Rp7.000.000 - Rp8.000.000"}'::jsonb,
    '{"badge":"Active","started_on_text":"started on 1 Oct 2025","cta":"Manage Job"}'::jsonb,
    now(), now()
  ),
  (
    'job_20251001_0002',
    'data-scientist',
    'Data Scientist',
    'inactive',
    '{"min":7000000,"max":8000000,"currency":"IDR","display_text":"Rp7.000.000 - Rp8.000.000"}'::jsonb,
    '{"badge":"Inactive","started_on_text":"created on 1 Oct 2025","cta":"Manage Job"}'::jsonb,
    now(), now()
  ),
  (
    'job_20251001_0003',
    'backend-developer',
    'Backend Developer',
    'draft',
    '{"min":7000000,"max":8000000,"currency":"IDR","display_text":"Rp7.000.000 - Rp8.000.000"}'::jsonb,
    '{"badge":"Draft","started_on_text":"draft saved on 3 Oct 2025","cta":"Manage Job"}'::jsonb,
    now(), now()
  )
on conflict do nothing;