-- Add new fields to jobs: type (enum), description (text), candidate_needed (integer)
-- Create enum type job_type if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'job_type'
  ) THEN
    CREATE TYPE job_type AS ENUM ('full_time', 'part_time', 'internship', 'contract', 'freelance');
  END IF;
END$$;

-- Add columns to public.jobs if they don't already exist
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS type job_type;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS candidate_needed integer;

-- Optional: you can set defaults if desired (commented out)
-- ALTER TABLE public.jobs ALTER COLUMN candidate_needed SET DEFAULT 0;
-- UPDATE public.jobs SET candidate_needed = 0 WHERE candidate_needed IS NULL;

-- Note: To add more enum values later, use:
-- ALTER TYPE job_type ADD VALUE IF NOT EXISTS 'temporary';