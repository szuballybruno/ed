ALTER TABLE public.user_course_bridge
ADD CONSTRAINT ucb_unique_constraint
UNIQUE (user_id, course_id);

ALTER TABLE public.user_course_bridge
ADD CONSTRAINT ucb_check_constraint
CHECK (stage_name = 'assigned' OR stage_name = 'prequiz' IS NOT NULL);