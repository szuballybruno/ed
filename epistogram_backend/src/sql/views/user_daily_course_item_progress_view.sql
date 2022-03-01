SELECT 
	sq2.*,
	sq2.completed_item_count * (100 / cicv.item_count::int) completed_percentage,
	sq2.completion_date::date - uccev.start_date::date offset_days_from_start,
	sq2.completion_date = DATE_TRUNC('day', now()) is_current
FROM 
(
	SELECT 
		sq.user_id,
		sq.course_id,
		sq.completion_date,
		COUNT(sq.completion_date)::int completed_item_count
	FROM 
	(
		SELECT 
			cicv.user_id,
			cicv.course_id,
			DATE_TRUNC('day', cicv.completion_date) completion_date
		FROM public.course_item_completed_view cicv
	) sq

	GROUP BY 
		sq.user_id,
		sq.course_id,
		sq.completion_date
) sq2

LEFT JOIN public.user_course_completion_estimation_view uccev
ON uccev.course_id = sq2.course_id AND uccev.user_id = sq2.user_id

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = sq2.course_id