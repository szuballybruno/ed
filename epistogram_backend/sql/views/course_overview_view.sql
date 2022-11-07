WITH
episto_coin_sum_cte AS
(
	SELECT
		coapcv.user_id,
		coapcv.course_id,
		SUM(coapcv.amount) episto_coin_amount
	FROM public.coin_acquire_per_course_view coapcv
	
	GROUP BY coapcv.user_id, coapcv.course_id
)

SELECT 
	clsv.user_id,
	clsv.course_id,
	clsv.total_spent_seconds,
	clsv.completed_video_count,
	clsv.answered_video_question_count,
	clsv.question_success_rate,
	clsv.avg_exam_score_percentage exam_success_rate_average,
	fesv.final_exam_score_percentage final_exam_success_rate,
	COALESCE(ecsc.episto_coin_amount) coins_acquired
FROM public.course_learning_stats_view clsv

LEFT JOIN episto_coin_sum_cte ecsc
ON ecsc.course_id = clsv.course_id
AND ecsc.user_id = clsv.user_id

LEFT JOIN public.final_exam_score_view fesv
ON fesv.course_id = clsv.course_id
AND fesv.user_id = clsv.user_id