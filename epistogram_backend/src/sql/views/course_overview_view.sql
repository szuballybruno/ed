SELECT 
	u.id user_id,
	co.id course_id,
	clsv.total_spent_seconds,
	clsv.completed_video_count,
	clsv.answered_video_question_count,
	clsv.question_success_rate,
	clsv.exam_success_rate_average,
	clsv.final_exam_success_rate,
	(
		SELECT COALESCE(SUM (coapcv.amount), 0) 
		FROM public.coin_acquire_per_course_view coapcv

		WHERE coapcv.course_id = co.id AND coapcv.user_id = u.id 
	) coins_acquired
FROM public.course co

CROSS JOIN public.user u

LEFT JOIN public.course_learning_stats_view clsv
ON clsv.course_id = co.id AND clsv.user_id = u.id