-- tempomat calc data
-- only provided for courses that 
-- are connected to the user via the ucb 
SELECT 
	ucb.user_id,
	ucb.course_id,
	u.company_id,
	ucb.required_completion_date,
	ucb.start_date start_date,
    ucb.tempomat_mode tempomat_mode,
	ucb.original_estimated_completion_date,
	cicv.item_count total_item_count,
	COALESCE(ccicv.completed_course_item_count, 0)::int total_completed_item_count
FROM public.user_course_bridge ucb

LEFT JOIN public.user u
ON u.id = ucb.user_id

LEFT JOIN public.completed_course_item_count_view ccicv
ON ccicv.user_id = ucb.user_id
AND ccicv.course_id = ucb.course_id

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = ucb.course_id

ORDER BY
	ucb.user_id,
	ucb.course_id
