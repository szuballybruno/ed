SELECT 
	u.id user_id,
	co.id course_id,
	clsv.total_spent_time,
	clsv.completed_video_count
FROM public.course co

CROSS JOIN public.user u

LEFT JOIN public.course_learning_stats_view clsv
ON clsv.course_id = co.id AND clsv.user_id = u.id