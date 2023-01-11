WITH 
latest_signup_exam_version AS
(
	SELECT MAX(ev.id) version_id
	FROM public.exam_version ev
	INNER JOIN public.exam e
	ON e.id = ev.exam_id AND e.is_signup
),
latest_given_answer_ids AS
(
	SELECT 
		MAX(ga.id) given_answer_id,
		ase.id answer_session_id,
		ga.question_version_id
	FROM public.given_answer ga
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	GROUP BY
		ase.id,
		ga.question_version_id
)
SELECT 
	u.id user_id,
	qv.question_id,
	qv.id question_version_id,
	qd.question_text question_text,
	qd.image_url image_url,
	qd.type_id question_type_id,
	av.answer_id,
	av.id answer_version_id,
	ad.text answer_text,
	lgai.given_answer_id,
	ga.state = 'CORRECT' is_correct,
	agab.answer_version_id given_answer_version_id,
	agab.answer_version_id = av.id is_given_answer 
FROM latest_signup_exam_version lsev

CROSS JOIN public.user u

LEFT JOIN public.exam_version ev
ON ev.id = lsev.version_id

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_session ase
ON ase.user_id = u.id
AND ase.exam_version_id = ev.id
	
LEFT JOIN latest_given_answer_ids lgai
ON lgai.question_version_id = qv.id
AND lgai.answer_session_id = ase.id

LEFT JOIN public.given_answer ga
ON ga.id = lgai.given_answer_id
	
LEFT JOIN public.answer_given_answer_bridge agab
ON agab.given_answer_id = lgai.given_answer_id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

ORDER BY
	 u.id,
	 md5(qv.id || '1'), -- randomize
	 av.id
	 
	