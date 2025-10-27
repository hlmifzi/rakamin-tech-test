-- Upsert JOB_TYPE_OPTIONS into public.configurations
insert into public.configurations (id, type, form_options, created_at, updated_at)
values (
  'config_job_type_options',
  'JOB_TYPE_OPTIONS',
  '{
    "job_type_options": [
      { "value": "full_time",   "label": "Full-time" },
      { "value": "contract",    "label": "Contract" },
      { "value": "part_time",   "label": "Part-time" },
      { "value": "internship",  "label": "Internship" },
      { "value": "freelance",   "label": "Freelance" }
    ]
  }'::jsonb,
  now(),
  now()
)
on conflict (type) do update
set form_options = excluded.form_options,
    updated_at = now();