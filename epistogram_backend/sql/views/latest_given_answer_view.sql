SELECT 
	sq.user_id,
	ga.*
FROM 
(
	SELECT 
		u.id user_id,
		q.id question_id,
		MAX(ga.id) latest_ga_id
	FROM public.question q

	CROSS JOIN public.user u 

	LEFT JOIN public.answer_session ase
	ON ase.user_id = u.id

	LEFT JOIN public.given_answer ga
	ON ga.question_id = q.id AND ga.answer_session_id = ase.id

	GROUP BY
		u.id,
		q.id

	ORDER BY
		u.id,
		q.id
) sq

LEFT JOIN public.given_answer ga
ON sq.latest_ga_id = ga.id
