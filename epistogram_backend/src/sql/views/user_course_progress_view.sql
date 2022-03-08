SELECT
	sq.*,
	GREATEST(0, sq.previsioned_percent_completed_by_now - sq.completed_percentage) lag_behind_percentage,
	ucb.tempomat_mode
FROM 
(
	SELECT 
		ucccv.user_id,
		ucccv.course_id,
		ucccv.previsioned_percent_completed_by_now,
		COALESCE(ucpa.completed_percentage, 0) completed_percentage,
		ucpa.remaining_item_count,
		ucccv.previsioned_length_days,
		ucccv.total_item_count,
		ucccv.remaining_days
	FROM public.user_course_completion_current_view ucccv

	LEFT JOIN public.user_course_progress_actual ucpa
	ON ucpa.course_id = ucccv.course_id 
		AND ucpa.user_id = ucccv.user_id
) sq

LEFT JOIN public.user_course_bridge ucb
ON ucb.course_id = sq.course_id AND ucb.user_id = sq.user_id
