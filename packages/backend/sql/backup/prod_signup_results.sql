SELECT 
	u.email, 
	u.last_name, 
	u.first_name,
	q.question_text,
	ans.text answer_text
FROM answer_session ase

LEFT JOIN public.user u 
ON u.id = ase.user_id

LEFT JOIN public.exam e 
ON e.id = 1

LEFT JOIN public.question q
ON q.exam_id = e.id

LEFT JOIN public.given_answer ga
ON ga.question_id = q.id AND ga.answer_session_id = ase.id

LEFT JOIN public.answer_given_answer_bridge agab 
ON agab.given_answer_id = ga.id

LEFT JOIN public.answer ans
ON ans.id = agab.answer_id

WHERE ase.exam_id = 1