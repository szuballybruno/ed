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
	uccoev.previsioned_completion_date original_previsioned_completion_date,
	cicv.item_count total_item_count,
	COALESCE(ccicv.completed_course_item_count, 0)::int total_completed_item_count,
	CASE WHEN ucb.tempomat_mode = 'light'
		THEN 1
		ELSE CASE WHEN ucb.tempomat_mode = 'strict'
			THEN 0
			ELSE ((tav.min_value::int + ((tav.max_value::int - tav.min_value::int) / 10 * upav.experience::int)) * 0.01)::double precision
		END 
	END tempomat_adjustment_value
FROM public.user_course_bridge ucb

LEFT JOIN public.user u
ON u.id = ucb.user_id

LEFT JOIN public.completed_course_item_count_view ccicv
ON ccicv.user_id = ucb.user_id
AND ccicv.course_id = ucb.course_id

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = ucb.course_id

LEFT JOIN public.user_course_completion_original_estimation_view uccoev
ON uccoev.course_id = ucb.course_id
AND uccoev.user_id = ucb.user_id

LEFT JOIN public.user_prequiz_answers_view upav
ON upav.user_id = ucb.user_id
	AND upav.course_id = ucb.course_id

LEFT JOIN public.tempomat_adjustment_value tav
ON tav.prequiz_answer_id = upav.planned_usage_answer_id 
	AND tav.tempomat_mode = ucb.tempomat_mode

WHERE ucb.start_date IS NOT NULL

ORDER BY
	ucb.user_id,
	ucb.course_id
