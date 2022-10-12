-- alater company 
ALTER TABLE company
ADD COLUMN is_survey_required boolean;

UPDATE company 
SET is_survey_required = true ;

ALTER TABLE company 
ALTER COLUMN is_survey_required SET NOT NULL;

-- alter user 
ALTER TABLE public.user
ADD COLUMN is_survey_required boolean;

UPDATE public.user 
SET is_survey_required = true;

ALTER TABLE public.user 
ALTER COLUMN is_survey_required SET NOT NULL;