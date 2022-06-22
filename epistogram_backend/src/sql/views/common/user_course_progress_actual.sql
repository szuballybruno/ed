SELECT 
	sq.*,
	sq.total_completed_item_count / sq.days_elapsed_since_start::double precision avg_completed_items_per_day,
	ROUND(sq.total_completed_item_count / sq.total_item_count::double precision * 100) completed_percentage,
	sq.total_item_count - sq.total_completed_item_count remaining_item_count
FROM 
(
	SELECT 
		ucb.user_id user_id,
		ucb.course_id,
		now()::date - ucb.creation_date::date + 1 days_elapsed_since_start,
		COUNT(cicv.completion_date)::int total_completed_item_count,
		coicv.item_count total_item_count
	FROM public.user_course_bridge ucb 

	LEFT JOIN public.course_item_completed_view cicv
	ON cicv.user_id = ucb.user_id

	LEFT JOIN public.course_item_count_view coicv
	ON ucb.course_id = coicv.course_id

-- 	WHERE cicv IS NOT NULL
	
	GROUP BY
		ucb.user_id,
		ucb.course_id,
		ucb.creation_date,
		coicv.item_count
) sq