
-- UNIQUE
ALTER TABLE public.course_completion 
DROP CONSTRAINT IF EXISTS course_completion_unique;

ALTER TABLE public.course_completion
ADD CONSTRAINT course_completion_unique
UNIQUE (course_version_id, user_id);