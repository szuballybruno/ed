
SELECT 
	sq.*,
	DATE_TRUNC('days', sq.start_date) + (INTERVAL '1' day * sq.previsioned_duration_days) previsioned_completion_date,
	CEIL(sq.total_item_count::double precision / sq.previsioned_duration_days) previsioned_items_per_day
FROM 
(
	SELECT 
		ucb.user_id user_id,
		ucb.course_id course_id,
		cicv.item_count total_item_count,
		DATE_TRUNC('days', ucb.creation_date) start_date,
		upav.estimated_minutes_per_day,
		CEIL(clev.total_length_seconds / 60.0) course_duration_minutes,
		CEIL(clev.total_length_seconds / 60.0 / upav.estimated_minutes_per_day) previsioned_duration_days
	FROM public.user_course_bridge ucb

	LEFT JOIN public.user_prequiz_answers_view upav
	ON upav.user_id = ucb.user_id 
		AND upav.course_id = ucb.course_id

	LEFT JOIN public.course_length_estimation_view clev
	ON clev.course_id = ucb.course_id

	LEFT JOIN public.course_item_count_view cicv
	ON cicv.course_id = ucb.course_id

	ORDER BY
		ucb.user_id,
		ucb.course_id
) sq