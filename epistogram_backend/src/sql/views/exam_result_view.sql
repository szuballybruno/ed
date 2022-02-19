SELECT 
	u.id user_id,
	e.id exam_id,
	e.type = 'final' is_final_exam,
	q.id question_id,
	q.question_text question_text,
	asv.answer_session_id answer_session_id,
	asv.is_completed is_completed_session,
	asv.correct_answer_count correct_given_answer_count,
	asv.total_question_count question_count,
	asv.is_successful is_successful_session,
	ecv.single_successful_session AND asv.is_successful only_successful_session,
	ga.id given_answer_id,
	ga.is_correct is_correct,
	agab.id answer_bridge_id,
	agab.answer_id user_answer_id,
	a.id answer_id,
	a.is_correct IS NOT DISTINCT FROM true is_answer_correct,
	agab.answer_id = a.id IS NOT DISTINCT FROM true is_given_answer,
	a.text answer_text
FROM public.exam e

LEFT JOIN public.user u
ON 1 = 1

LEFT JOIN public.question q
ON q.exam_id = e.id
	
LEFT JOIN public.answer_session_view asv
ON asv.exam_id = e.id
	AND asv.user_id = u.id
	
LEFT JOIN public.exam_completed_view ecv
ON ecv.exam_id = e.id
	AND ecv.user_id = u.id

LEFT JOIN public.given_answer ga
ON ga.answer_session_id = asv.answer_session_id
	AND ga.question_id = q.id

LEFT JOIN public.answer a
ON a.question_id = q.id

LEFT JOIN public.answer_given_answer_bridge agab
ON agab.given_answer_id = ga.id
	AND agab.answer_id = a.id

WHERE e.id != 1

ORDER BY 
	u.id,
	e.id,
	asv.answer_session_id,
	q.id,
	agab.id