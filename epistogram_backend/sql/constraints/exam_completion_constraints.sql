-- UNIQUE EXAM
ALTER TABLE public.exam_completion
DROP CONSTRAINT IF EXISTS exam_completion_unique;

ALTER TABLE public.exam_completion
ADD CONSTRAINT exam_completion_unique
UNIQUE (answer_session_id);