SELECT 
	u.id user_id,
	ev.id exam_version_id,
	qv.id question_version_id,
	av.id answer_version_id,
	ase.id answer_session_id,
	ed.is_final is_final_exam,
	qd.question_text question_text,
	gasv.score question_score,
	CASE 
		WHEN gasv.score = 0 THEN 'INCORRECT' 
		WHEN gasv.score = consts.question_max_score THEN 'CORRECT'
		ELSE 'MIXED'
	END given_answer_state,
	consts.question_max_score::int question_max_score,
	asv.is_completed is_completed_session,
	asv.is_successful is_successful_session,
	ecv.single_successful_session AND asv.is_successful only_successful_session,
	ga.id given_answer_id,
	ga.is_correct is_correct,
	agab.id answer_bridge_id,
	agab.answer_version_id user_answer_version_id,
	agab.answer_version_id = av.id IS NOT DISTINCT FROM true is_given_answer,
	ad.is_correct IS NOT DISTINCT FROM true is_answer_correct,
	ad.text answer_text,
	av.answer_id
FROM public.exam_version ev

CROSS JOIN public.user u

INNER JOIN public.latest_answer_session_view lasv
ON lasv.user_id = u.id 
AND lasv.exam_version_id = ev.id

LEFT JOIN public.answer_session ase
ON ase.id = lasv.answer_session_id

INNER JOIN public.exam e
ON e.id = ev.exam_id
AND e.id != 1 

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

INNER JOIN public.given_answer ga
ON ga.question_version_id = qv.id
AND ga.answer_session_id = ase.id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id
	
LEFT JOIN public.answer_session_view asv
ON asv.exam_version_id = ev.id
AND asv.answer_session_id = ase.id
	
LEFT JOIN public.exam_completed_view ecv
ON ecv.exam_version_id = ev.id
AND ecv.user_id = u.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id

LEFT JOIN public.answer_given_answer_bridge agab
ON agab.given_answer_id = ga.id
AND agab.answer_version_id = av.id

LEFT JOIN public.given_answer_score_view gasv
ON gasv.user_id = u.id 
AND gasv.question_version_id = qv.id 
AND gasv.answer_session_id = ase.id

CROSS JOIN public.constant_values_view consts

ORDER BY 
	u.id,
	ev.id,
	qv.id,
	av.id,
	ase.id