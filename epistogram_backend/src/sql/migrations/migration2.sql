ALTER TABLE job_title
RENAME TO department;

ALTER TABLE public.user
RENAME COLUMN job_title_id TO department_id;