-- Seed initial candidates with attribute keys & labels

insert into public.candidates (id, apply_jobs_id, attributes, created_at, updated_at)
values
  (
    'cand_20251008_0001',
    'job_20251001_0001',
    '[
      {"key":"full_name","label":"Full Name","value":"Andi Wijaya","order":1},
      {"key":"email","label":"Email","value":"andi@example.com","order":2},
      {"key":"phone","label":"Phone","value":"+62 812 3456 7890","order":3},
      {"key":"dob","label":"Date of Birth","value":"1995-02-12","order":4},
      {"key":"domicile","label":"Domicile","value":"Jakarta","order":5},
      {"key":"gender","label":"Gender","value":"Male","order":6},
      {"key":"linkedin_link","label":"LinkedIn","value":"https://linkedin.com/in/andi","order":7}
    ]'::jsonb,
    now(), now()
  ),
  (
    'cand_20251008_0002',
    'job_20251001_0001',
    '[
      {"key":"full_name","label":"Full Name","value":"Siti Rahma","order":1},
      {"key":"email","label":"Email","value":"siti@example.com","order":2},
      {"key":"phone","label":"Phone","value":"+62 813 2345 6789","order":3},
      {"key":"dob","label":"Date of Birth","value":"30 January 2001","order":4},
      {"key":"domicile","label":"Domicile","value":"Bandung","order":5},
      {"key":"gender","label":"Gender","value":"Female","order":6},
      {"key":"linkedin_link","label":"LinkedIn","value":"https://linkedin.com/in/siti","order":7}
    ]'::jsonb,
    now(), now()
  ),
  (
    'cand_20251008_0003',
    'job_20251001_0001',
    '[
      {"key":"full_name","label":"Full Name","value":"Siti Rahma","order":1},
      {"key":"email","label":"Email","value":"siti@example.com","order":2},
      {"key":"phone","label":"Phone","value":"+62 813 2345 6789","order":3},
      {"key":"dob","label":"Date of Birth","value":"30 January 2001","order":4},
      {"key":"domicile","label":"Domicile","value":"Bandung","order":5},
      {"key":"gender","label":"Gender","value":"Female","order":6},
      {"key":"linkedin_link","label":"LinkedIn","value":"https://linkedin.com/in/siti","order":7}
    ]'::jsonb,
    now(), now()
  ),
  (
    'cand_20251008_0004',
    'job_20251001_0002',
    '[
      {"key":"full_name","label":"Full Name","value":"Siti Rahma","order":1},
      {"key":"email","label":"Email","value":"siti@example.com","order":2},
      {"key":"phone","label":"Phone","value":"+62 813 2345 6789","order":3},
      {"key":"dob","label":"Date of Birth","value":"30 January 2001","order":4},
      {"key":"domicile","label":"Domicile","value":"Bandung","order":5},
      {"key":"gender","label":"Gender","value":"Female","order":6},
      {"key":"linkedin_link","label":"LinkedIn","value":"https://linkedin.com/in/siti","order":7}
    ]'::jsonb,
    now(), now()
  ),
  (
    'cand_20251008_0005',
    'job_20251001_0003',
    '[
      {"key":"full_name","label":"Full Name","value":"Siti Rahma","order":1},
      {"key":"email","label":"Email","value":"siti@example.com","order":2},
      {"key":"phone","label":"Phone","value":"+62 813 2345 6789","order":3},
      {"key":"dob","label":"Date of Birth","value":"30 January 2001","order":4},
      {"key":"domicile","label":"Domicile","value":"Bandung","order":5},
      {"key":"gender","label":"Gender","value":"Female","order":6},
      {"key":"linkedin_link","label":"LinkedIn","value":"https://linkedin.com/in/siti","order":7}
    ]'::jsonb,
    now(), now()
  ),
  (
    'cand_20251008_0006',
    'job_20251001_0003',
    '[
      {"key":"full_name","label":"Full Name","value":"Budi Santoso","order":1},
      {"key":"email","label":"Email","value":"budi@example.com","order":2},
      {"key":"phone","label":"Phone","value":"+62 811 9876 5432","order":3},
      {"key":"dob","label":"Date of Birth","value":"1994-05-30","order":4},
      {"key":"domicile","label":"Domicile","value":"Surabaya","order":5},
      {"key":"gender","label":"Gender","value":"Male","order":6},
      {"key":"linkedin_link","label":"LinkedIn","value":"https://linkedin.com/in/budi/asdasdasdasd/asdasdasdasdsadasdasd/","order":7}
    ]'::jsonb,
    now(), now()
  )
on conflict (id) do nothing;