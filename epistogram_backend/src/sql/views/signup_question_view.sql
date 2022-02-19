SELECT 
	u.id user_id,
	q.id question_id,
	q.question_text question_text,
	q.image_url image_url,
	q.type_id type_id,
	a.id answer_id,
	a.text answer_text,
	ga.id given_answer_id,
	ga.is_correct is_correct,
	agab.answer_id user_answer_id,
	agab.answer_id = a.id IS NOT DISTINCT FROM true is_given_answer 
FROM public.exam e

LEFT JOIN public.user u
ON 1 = 1

LEFT JOIN public.question q
ON q.exam_id = e.id

LEFT JOIN public.answer a
ON a.question_id = q.id

LEFT JOIN public.answer_session ase
ON ase.user_id = u.id
	AND ase.type = 'signup'
	
LEFT JOIN 
(
	SELECT 
		ga.*,
		ROW_NUMBER() OVER (PARTITION BY ga.answer_session_id, ga.question_id ORDER BY ga.creation_date DESC) order_index
	FROM public.given_answer ga
) ga
ON ga.question_id = q.id
	AND ga.answer_session_id = ase.id
	AND ga.order_index = 1
	
LEFT JOIN public.answer_given_answer_bridge agab
ON agab.given_answer_id = ga.id

WHERE e.id = 1

ORDER BY
	 u.id,
	 md5(q.id || '1'),
	 a.id
	 
	