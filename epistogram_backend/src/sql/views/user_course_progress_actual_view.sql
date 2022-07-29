SELECT 
	sq.*,
	NULLIF(sq.total_completed_item_count, 0) / NULLIF(sq.days_elapsed_since_start::double precision, 0) avg_completed_items_per_day,
	ROUND(NULLIF(sq.total_completed_item_count, 0) / NULLIF(sq.total_item_count::double precision, 0) * 100) completed_percentage,
	sq.total_item_count - sq.total_completed_item_count remaining_item_count
FROM 
(
	SELECT 
		ucb.user_id user_id,
		ucb.course_id,
		now()::date - ucb.start_date::date + 1 days_elapsed_since_start,
		COUNT(cicv.course_item_completion_id)::int total_completed_item_count,
		coicv.item_count total_item_count
	FROM public.user_course_bridge ucb 

	LEFT JOIN public.course_item_completion_view cicv
	ON cicv.user_id = ucb.user_id
	AND cicv.course_id = ucb.course_id

	LEFT JOIN public.course_item_count_view coicv
	ON ucb.course_id = coicv.course_id

-- 	WHERE cicv IS NOT NULL
	
	GROUP BY
		ucb.user_id,
		ucb.course_id,
		ucb.start_date,
		coicv.item_count
) sq