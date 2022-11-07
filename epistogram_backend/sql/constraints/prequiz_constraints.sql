
-- UNIQUE
ALTER TABLE public.prequiz_user_answer
DROP CONSTRAINT IF EXISTS prequiz_user_answer_unique;

ALTER TABLE public.prequiz_user_answer
ADD CONSTRAINT prequiz_user_answer_unique
UNIQUE (user_id, course_id, question_id);