SELECT 
	MAX(ga.id) given_answer_id,
	ga.question_version_id,
	ase.user_id
FROM public.given_answer ga

LEFT JOIN public.answer_session ase
ON ase.id = ga.answer_session_id

GROUP BY
	ase.user_id,
	ga.question_version_id