
UPDATE public.user_course_bridge
SET previsioned_completion_date = NOW() + interval '45 days'
WHERE stage_name != 'assigned' 
AND stage_name != 'prequiz' 
AND previsioned_completion_date IS NULL;