SELECT 
	u.id user_id,
	ev.id exam_version_id,
	ed.is_final is_final_exam,
	qv.id question_version_id,
	qd.question_text question_text,
	asev.answer_session_id answer_session_id,
	asev.is_completed is_completed_session,
	asev.correct_answer_count correct_given_answer_count,
	asev.question_count,
	asev.is_successful is_successful_session,
	ecv.single_successful_session AND asev.is_successful only_successful_session,
	ga.id given_answer_id,
	ga.is_correct is_correct,
	agab.id answer_bridge_id,
	agab.answer_version_id user_answer_version_id,
	av.id answer_id,
	ad.is_correct IS NOT DISTINCT FROM true is_answer_correct,
	agab.answer_version_id = av.id IS NOT DISTINCT FROM true is_given_answer,
	ad.text answer_text
FROM public.exam_version ev

LEFT JOIN public.exam e
ON e.id = ev.exam_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

CROSS JOIN public.user u

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id
	
LEFT JOIN public.answer_session_evaluation_view asev
ON asev.exam_version_id = ev.id
AND asev.user_id = u.id
	
LEFT JOIN public.exam_completed_view ecv
ON ecv.exam_version_id = ev.id
AND ecv.user_id = u.id

LEFT JOIN public.given_answer ga
ON ga.answer_session_id = asev.answer_session_id
AND ga.question_version_id = qv.id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id

LEFT JOIN public.answer_given_answer_bridge agab
ON agab.given_answer_id = ga.id
AND agab.answer_version_id = av.id

WHERE e.id != 1

ORDER BY 
	u.id,
	e.id,
	asev.answer_session_id,
	qv.id,
	agab.id