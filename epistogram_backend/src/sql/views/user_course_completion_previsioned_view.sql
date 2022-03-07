SELECT 
	sq2.*,
	sq2.previsioned_items_per_day * sq2.days_elapsed_since_start previsioned_items_completed_by_now,
	sq2.previsioned_items_per_day * sq2.days_elapsed_since_start / 11.0 * 100 previsioned_percent_completed_by_now
FROM 
(
	SELECT 
		sq.*,
		DATE_TRUNC('days', sq.start_date) + (INTERVAL '1' day * sq.previsioned_duration_days) previsioned_completion_date,
		GREATEST(0, sq.previsioned_duration_days - sq.days_elapsed_since_start) remaining_days,
		sq.total_item_count::double precision / sq.previsioned_duration_days previsioned_items_per_day
	FROM 
	(
		SELECT 
			ucb.user_id user_id,
			ucb.course_id course_id,
			clev.total_length_seconds course_length_seconds,
			DATE_TRUNC('days', ucb.creation_date) start_date,
			ucspv.estimated_seconds_per_day previsioned_seconds_per_day,
			CEIL(clev.total_length_seconds::numeric / ucspv.estimated_seconds_per_day) previsioned_duration_days,
			now()::date - ucb.creation_date::date + 1 days_elapsed_since_start,
			cicv.item_count total_item_count
		FROM public.user_course_bridge ucb

		LEFT JOIN public.user_course_schedule_previsioned_view ucspv
		ON ucspv.user_id = ucb.user_id AND ucspv.course_id = ucb.course_id

		LEFT JOIN public.course_length_estimation_view clev
		ON clev.course_id = ucb.course_id

		LEFT JOIN public.course_item_count_view cicv
		ON cicv.course_id = ucb.course_id

		ORDER BY
			ucb.user_id,
			ucb.course_id
	) sq
) sq2