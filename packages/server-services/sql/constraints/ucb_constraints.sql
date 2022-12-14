ALTER TABLE public.user_course_bridge
ADD CONSTRAINT ucb_unique_constraint
UNIQUE (user_id, course_id);

ALTER TABLE public.user_course_bridge
ADD CONSTRAINT ucb_check_constraint
CHECK ((stage_name = 'assigned' OR stage_name = 'prequiz') OR original_estimated_completion_date IS NOT NULL);