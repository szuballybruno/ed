WITH question_correct_answer_rates AS
(
	SELECT 
		ase.id answer_session_id,
		ase.user_id,
		qv.id question_version_id,
		AVG(ga.is_correct::int)::int * 100 correct_answer_rate
	FROM public.given_answer ga
	
	LEFT JOIN public.question_version qv
	ON qv.id = ga.question_version_id

	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	GROUP BY ase.id, ase.user_id, qv.id
)

SELECT 
	u.id user_id,
	ev.id exam_version_id,
	ed.is_final is_final_exam,
	qv.id question_version_id,
	qd.question_text question_text,
	asv.answer_session_id answer_session_id,
	asv.is_completed is_completed_session,
	asv.is_successful is_successful_session,
	ecv.single_successful_session AND asv.is_successful only_successful_session,
	ga.id given_answer_id,
	ga.is_correct is_correct,
	agab.id answer_bridge_id,
	agab.answer_version_id user_answer_version_id,
	agab.answer_version_id = av.id IS NOT DISTINCT FROM true is_given_answer,
	av.id answer_id,
	ad.is_correct IS NOT DISTINCT FROM true is_answer_correct,
	ad.text answer_text,
	qcar.correct_answer_rate correct_answer_rate_per_question
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
	
LEFT JOIN public.answer_session_view asv
ON asv.exam_version_id = ev.id
AND asv.user_id = u.id
	
LEFT JOIN public.exam_completed_view ecv
ON ecv.exam_version_id = ev.id
AND ecv.user_id = u.id

LEFT JOIN public.given_answer ga
ON ga.answer_session_id = asv.answer_session_id
AND ga.question_version_id = qv.id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id

LEFT JOIN public.answer_given_answer_bridge agab
ON agab.given_answer_id = ga.id
AND agab.answer_version_id = av.id

LEFT JOIN question_correct_answer_rates qcar
ON qcar.user_id = u.id
AND qcar.answer_session_id = asv.answer_session_id
AND qcar.question_version_id = qv.id

WHERE e.id != 1

ORDER BY 
	u.id,
	e.id,
	asv.answer_session_id,
	qv.id,
	agab.id