SELECT 
	sq.*,
	
	-- previsioned progress
	sq.start_date + (INTERVAL '1' day * sq.previsioned_length_days) previsioned_completion_date,
	GREATEST(0, sq.previsioned_length_days - sq.days_elapsed_since_start) remaining_days,
	CEIL(sq.total_item_count::numeric / sq.previsioned_length_days) previsioned_items_per_day,
	CEIL(sq.total_item_count / sq.previsioned_length_days::numeric * sq.days_elapsed_since_start) previsioned_items_completed_by_now,
	CEIL(100.0 / sq.previsioned_length_days * sq.days_elapsed_since_start) previsioned_percent_completed_by_now,

	-- required progress
	GREATEST(0, sq.required_length_days - COALESCE(sq.days_elapsed_since_start, 0)) required_remaining_days,
	CEIL(sq.total_item_count::numeric / sq.required_length_days) required_items_per_day,
	CEIL(sq.total_item_count / sq.required_length_days::numeric * COALESCE(sq.days_elapsed_since_start, 1)) required_items_completed_by_now,
	CEIL(100.0 / sq.required_length_days * COALESCE(sq.days_elapsed_since_start, 1)) required_percent_completed_by_now
FROM 
(
	SELECT 
		ucbv.user_id user_id,
		ucbv.course_id course_id,
		ucbv.start_date,
		ucbv.required_completion_date,
		ucbv.previsioned_length_days,
		ucbv.required_length_days,
		now()::date - ucbv.start_date days_elapsed_since_start,
		cicv.item_count total_item_count
	FROM public.user_course_bridge_view ucbv

	LEFT JOIN public.course_item_count_view cicv
	ON cicv.course_id = ucbv.course_id

	ORDER BY
		ucbv.user_id,
		ucbv.course_id
) sq