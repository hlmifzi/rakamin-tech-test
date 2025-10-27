-- Ensure status constraint allows all required statuses
alter table public.jobs drop constraint if exists jobs_status_check;
alter table public.jobs add constraint jobs_status_check check (status in ('active','inactive','draft'));

-- Upsert Frontend Developer
update public.jobs
set title = 'Frontend Developer',
    status = 'active',
    salary_range = '{"min":7000000,"max":8000000,"currency":"IDR","display_text":"Rp7.000.000 - Rp8.000.000"}'::jsonb,
    list_card = '{"badge":"Active","started_on_text":"started on 1 Oct 2025","cta":"Manage Job"}'::jsonb,
    updated_at = now()
where slug = 'frontend-developer';

insert into public.jobs (id, slug, title, status, salary_range, list_card, created_at, updated_at)
select 'job_20251001_0001', 'frontend-developer', 'Frontend Developer', 'active',
       '{"min":7000000,"max":8000000,"currency":"IDR","display_text":"Rp7.000.000 - Rp8.000.000"}'::jsonb,
       '{"badge":"Active","started_on_text":"started on 1 Oct 2025","cta":"Manage Job"}'::jsonb,
       now(), now()
where not exists (select 1 from public.jobs where slug = 'frontend-developer');

-- Upsert Data Scientist
update public.jobs
set title = 'Data Scientist',
    status = 'inactive',
    salary_range = '{"min":7000000,"max":8000000,"currency":"IDR","display_text":"Rp7.000.000 - Rp8.000.000"}'::jsonb,
    list_card = '{"badge":"Inactive","started_on_text":"created on 1 Oct 2025","cta":"Manage Job"}'::jsonb,
    updated_at = now()
where slug = 'data-scientist';

insert into public.jobs (id, slug, title, status, salary_range, list_card, created_at, updated_at)
select 'job_20251001_0002', 'data-scientist', 'Data Scientist', 'inactive',
       '{"min":7000000,"max":8000000,"currency":"IDR","display_text":"Rp7.000.000 - Rp8.000.000"}'::jsonb,
       '{"badge":"Inactive","started_on_text":"created on 1 Oct 2025","cta":"Manage Job"}'::jsonb,
       now(), now()
where not exists (select 1 from public.jobs where slug = 'data-scientist');

-- Upsert Backend Developer
update public.jobs
set title = 'Backend Developer',
    status = 'draft',
    salary_range = '{"min":7000000,"max":8000000,"currency":"IDR","display_text":"Rp7.000.000 - Rp8.000.000"}'::jsonb,
    list_card = '{"badge":"Draft","started_on_text":"draft saved on 3 Oct 2025","cta":"Manage Job"}'::jsonb,
    updated_at = now()
where slug = 'backend-developer';

insert into public.jobs (id, slug, title, status, salary_range, list_card, created_at, updated_at)
select 'job_20251001_0003', 'backend-developer', 'Backend Developer', 'draft',
       '{"min":7000000,"max":8000000,"currency":"IDR","display_text":"Rp7.000.000 - Rp8.000.000"}'::jsonb,
       '{"badge":"Draft","started_on_text":"draft saved on 3 Oct 2025","cta":"Manage Job"}'::jsonb,
       now(), now()
where not exists (select 1 from public.jobs where slug = 'backend-developer');