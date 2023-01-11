ALTER TABLE public.company
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.given_answer
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.question_data
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.comment
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.course
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.answer_given_answer_bridge
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.like
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.user_comment_bridge
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.role
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.user
ALTER COLUMN deletion_date TYPE timestamptz;

ALTER TABLE public.task
ALTER COLUMN due_data TYPE timestamptz;