CREATE TABLE IF NOT EXISTS public.migration_version
(
	version_name varchar,
	creation_date timestamptz
);

ALTER TABLE public.migration_version 
DROP CONSTRAINT IF EXISTS unique_mig_ver;

ALTER TABLE public.migration_version
ADD CONSTRAINT unique_mig_ver 
UNIQUE (version_name);