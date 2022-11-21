ALTER TABLE public.user_course_bridge
ADD CONSTRAINT ucb_unique_constraint
UNIQUE (user_id, course_id);