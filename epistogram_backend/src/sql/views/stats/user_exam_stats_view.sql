SELECT DISTINCT ON (e.id)
	e.id exam_id,
	ed.title exam_title,
	u.id user_id,
	cv.course_id,
	asv.answer_session_success_rate correct_answer_rate,
	CASE 
		WHEN asv.answer_session_success_rate < 60
		THEN true
		ELSE false
	END should_practise_exam,
	asv.correct_given_answer_count::text || ' / ' || asv.answered_question_count::text correct_answer_count, -- TODO: Incorrect when multiple correct answers
	EXTRACT(EPOCH FROM (asv.end_date - asv.start_date)::time)::int exam_length_seconds,
	asv.end_date last_completion_date,
	AVG(ga.elapsed_seconds) average_reaction_time
FROM public.exam e

LEFT JOIN public.exam_version ev
ON ev.exam_id = e.id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.answer_session_view asv
ON asv.exam_version_id = ev.id

LEFT JOIN public.given_answer ga
ON ga.answer_session_id = asv.answer_session_id

LEFT JOIN public.user u
ON u.id = asv.user_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

WHERE asv.end_date IS NOT NULL
AND u.id IS NOT NULL
AND e.is_pretest IS FALSE
AND e.is_signup IS FALSE

GROUP BY 
	e.id, 
	u.id, 
	ed.title,
	cv.course_id,
	asv.correct_given_answer_count,
	asv.answered_question_count,
	asv.end_date,
	asv.start_date,
	asv.answer_session_success_rate

ORDER BY e.id, asv.end_date desc