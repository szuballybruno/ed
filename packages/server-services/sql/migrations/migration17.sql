ALTER TABLE public.company 
ADD COLUMN production_domain_prefix varchar;

UPDATE public.company 
SET production_domain_prefix = '';

ALTER TABLE public.company 
ALTER COLUMN production_domain_prefix SET NOT NULL;
