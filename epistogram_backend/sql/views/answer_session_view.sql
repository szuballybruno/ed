SELECT 
	u.id user_id,
	e.id exam_id,
	e.course_id course_id,
	ase.id answer_session_id,
	COUNT(q.id) = COUNT(ga.id) AND ase.id IS NOT NULL is_completed,
	COUNT(q.id)::int total_question_count,
	COUNT(ga.id)::int answered_question_count,
	SUM((ga.is_correct IS NOT DISTINCT FROM true)::int)::int correct_answer_count,
	COUNT(q.id) = SUM((ga.is_correct IS NOT DISTINCT FROM true)::int) is_successful,
	CASE WHEN COUNT(q.id) > 0 THEN (SUM((ga.is_correct IS NOT DISTINCT FROM true)::int) / COUNT(q.id) * 100)::int ELSE 0 END correct_answer_rate
FROM public.exam e

LEFT JOIN public.user u 
ON 1 = 1

LEFT JOIN public.question q
ON q.exam_id = e.id

LEFT JOIN public.answer_session ase 
ON ase.exam_id = e.id
	AND ase.user_id = u.id
	
LEFT JOIN public.given_answer ga
ON ga.answer_session_id = ase.id
	AND ga.question_id = q.id

GROUP BY 
	u.id,
	e.id,
	e.course_id,
	ase.id