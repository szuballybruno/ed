SELECT 
	ucb.user_id,
	ucb.course_id,
	ucb.tempomat_mode,
	tav.min_value,
	tav.max_value,
	CASE WHEN ucb.tempomat_mode = 'light'
		THEN 100
		ELSE CASE WHEN ucb.tempomat_mode = 'strict'
			THEN 0
			ELSE tav.min_value + ((tav.max_value - tav.min_value) / 10 * upav.experience) 
		END 
	END actual_adjustment_value
FROM public.user_course_bridge ucb

LEFT JOIN public.user_prequiz_answers_view upav
ON upav.user_id = ucb.user_id
	AND upav.course_id = ucb.course_id

LEFT JOIN public.tempomat_adjustment_value tav
ON tav.prequiz_answer_id = upav.planned_usage_answer_id 
	AND tav.tempomat_mode = ucb.tempomat_mode
