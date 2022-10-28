WITH
completed_course_item_counts AS
(
	SELECT
		cicv.user_id,
		cicv.course_id,
		COUNT(*)::int total_completed_item_count
	FROM public.course_item_completion_view cicv

	GROUP BY cicv.user_id, cicv.course_id
),
days_elapsed_since_start AS
(
	SELECT 
		ucb.user_id user_id,
		ucb.course_id,
		now()::date - ucb.start_date::date + 1 days_elapsed_since_start
	FROM public.user_course_bridge ucb 
)

SELECT 
	ucb.user_id,
	ucb.course_id,
	ccic.total_completed_item_count,
	NULLIF(ccic.total_completed_item_count, 0) / NULLIF(dess.days_elapsed_since_start::double precision, 0) avg_completed_items_per_day,
	ROUND(NULLIF(ccic.total_completed_item_count, 0) / NULLIF(coicv.item_count::double precision, 0) * 100) completed_percentage,
	coicv.item_count - ccic.total_completed_item_count remaining_item_count,
	coicv.item_count total_item_count
FROM public.user_course_bridge ucb

LEFT JOIN days_elapsed_since_start dess
ON dess.user_id = ucb.user_id
AND dess.course_id = ucb.course_id

LEFT JOIN public.course_item_count_view coicv
ON coicv.course_id = ucb.course_id

LEFT JOIN completed_course_item_counts ccic
ON ccic.user_id = ucb.user_id
AND ccic.course_id = ucb.course_id