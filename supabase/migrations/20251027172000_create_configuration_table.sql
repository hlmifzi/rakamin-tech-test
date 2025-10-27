-- Create configuration table for storing job-related form options
create table if not exists public.configurations (
  id text primary key,
  type text not null,
  form_options jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Ensure type is unique so we can upsert by type
create unique index if not exists configurations_type_key on public.configurations (type);

-- Seed default Job Configuration (upsert by type)
insert into public.configurations (id, type, form_options, created_at, updated_at)
values (
  'config_job_default',
  'Job Configuration',
  '{
    "application_form": {
      "sections": [
        {
          "title": "Minimum Profile Information Required",
          "fields": [
            { "key": "full_name", "validation": { "required": true } },
            { "key": "photo_profile", "validation": { "required": true } },
            { "key": "gender", "validation": { "required": true } },
            { "key": "domicile", "validation": { "required": false } },
            { "key": "email", "validation": { "required": true } },
            { "key": "phone_number", "validation": { "required": true } },
            { "key": "linkedin_link", "validation": { "required": true } },
            { "key": "date_of_birth", "validation": { "required": false } }
          ]
        }
      ]
    }
  }'::jsonb,
  now(),
  now()
)
on conflict (type) do update
set form_options = excluded.form_options,
    updated_at = now();