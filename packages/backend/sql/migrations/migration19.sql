ALTER TABLE public.course_data 
DROP COLUMN is_pretest_required;

ALTER TABLE public.course_data
RENAME COLUMN is_prequiz_required TO is_precourse_survey_required;