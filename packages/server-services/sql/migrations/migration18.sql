ALTER TABLE public.user_course_bridge 
ADD COLUMN last_interaction_date timestamptz;

ALTER TABLE public.user_course_bridge 
DROP COLUMN is_current;
