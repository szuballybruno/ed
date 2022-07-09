CREATE UNIQUE INDEX single_current_course_bridge_unique_index
ON public.user_course_bridge (user_id)
WHERE is_current = true