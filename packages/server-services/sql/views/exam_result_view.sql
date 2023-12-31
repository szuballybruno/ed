SELECT 
	u.id user_id,
	ev.id exam_version_id,
	qv.id question_version_id,
	av.id answer_version_id,
	ase.id answer_session_id,
	ga.id given_answer_id,
	ga.state IS NOT DISTINCT FROM 'CORRECT' is_correct,
	CASE WHEN ga.state IS NULL 
		THEN 'INCORRECT' 
		ELSE ga.state 
	END given_answer_state,
	COALESCE(ga.score, 0) question_score,
	ed.is_final is_final_exam,
	qd.question_text question_text,
	qd.max_score::int question_max_score,
	asv.is_completed is_completed_session,
	asv.is_successful is_successful_session,
	ecv.single_successful_session AND asv.is_successful only_successful_session,
	agab.id answer_bridge_id,
	agab.answer_version_id user_answer_version_id,
	agab.answer_version_id = av.id IS NOT DISTINCT FROM true is_given_answer,
	ad.is_correct IS NOT DISTINCT FROM true is_answer_correct,
	ad.text answer_text,
	av.answer_id
FROM public.answer_session ase

INNER JOIN public.exam_version ev
ON ev.id = ase.exam_version_id

LEFT JOIN public.user u
ON u.id = ase.user_id

INNER JOIN public.exam e
ON e.id = ev.exam_id
AND e.id != 1 

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.given_answer ga
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

CROSS JOIN public.constant_values_view consts

ORDER BY 
	u.id,
	ev.id,
	ga.id DESC NULLS LAST,
	qv.id,
	av.id,
	ase.id