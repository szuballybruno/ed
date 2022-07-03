WITH completed_items AS
(
	SELECT 
		cicv.user_id,
		cicv.course_id,
		DATE_TRUNC('day', cicv.completion_date) completion_date
	FROM public.course_item_completed_view cicv
),
completed_item_groups AS
(
	SELECT 
		ci.user_id,
		ci.course_id,
		ci.completion_date,
		COUNT(ci.completion_date)::int completed_item_count
	FROM completed_items ci

	GROUP BY 
		ci.user_id,
		ci.course_id,
		ci.completion_date
)

SELECT 
	cig.user_id,
	cig.course_id,
	cig.completion_date,
	cig.completed_item_count,
	cig.completed_item_count::double precision / cicv.item_count::double precision * 100 completed_percentage,
	cig.completion_date::date - ucb.start_date::date offset_days_from_start,
	cig.completion_date = DATE_TRUNC('day', now()) is_current
FROM completed_item_groups cig

LEFT JOIN public.user_course_bridge ucb
ON ucb.course_id = cig.course_id AND ucb.user_id = cig.user_id

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = cig.course_id 

ORDER BY cig.completion_date