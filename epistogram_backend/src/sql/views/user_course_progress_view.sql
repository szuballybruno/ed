SELECT
	sq.*,

	-- Calculate lag behind either from 
	--     start_date to current_date and start_date to previsioned progress 
	--     or required progress
	CASE
		WHEN ucb.required_completion_date IS NOT NULL AND ucb.start_date IS NOT NULL
			THEN sq.required_percent_completed_by_now - sq.completed_percentage
		WHEN ucb.required_completion_date IS NULL AND ucb.start_date IS NOT NULL
			THEN sq.previsioned_percent_completed_by_now - sq.completed_percentage
		ELSE null
	END lag_behind_percentage,

	ucb.tempomat_mode
FROM 
(
	SELECT 
		ucccv.user_id,
		ucccv.course_id,
		ucccv.previsioned_percent_completed_by_now,
		ucccv.required_percent_completed_by_now,
		COALESCE(ucpa.completed_percentage, 0) completed_percentage,
		ucpa.remaining_item_count,
		ucccv.previsioned_length_days,
		ucccv.total_item_count,
		ucccv.remaining_days
	FROM public.user_course_completion_current_view ucccv

	LEFT JOIN public.user_course_progress_actual_view ucpa
	ON ucpa.course_id = ucccv.course_id 
		AND ucpa.user_id = ucccv.user_id
) sq

LEFT JOIN public.user_course_bridge ucb
ON ucb.course_id = sq.course_id AND ucb.user_id = sq.user_id
