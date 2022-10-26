ALTER TABLE public.course_data
ADD COLUMN is_prequiz_required boolean;

ALTER TABLE public.course_data
ADD COLUMN is_pretest_required boolean;

UPDATE public.course_data SET 
	is_prequiz_required = true, 
	is_pretest_required = true;

ALTER TABLE public.course_data
ALTER COLUMN is_prequiz_required SET NOT NULL;

ALTER TABLE public.course_data
ALTER COLUMN is_pretest_required SET NOT NULL;