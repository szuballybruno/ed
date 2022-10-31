
-- UNIQUE
ALTER TABLE public.prequiz_completion
DROP CONSTRAINT IF EXISTS prequiz_completion_unique;

ALTER TABLE public.prequiz_completion
ADD CONSTRAINT prequiz_completion_unique
UNIQUE (user_id, course_id);