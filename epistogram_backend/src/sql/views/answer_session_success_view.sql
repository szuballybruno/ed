SELECT 
	sq.*,
	CASE WHEN sq.question_count > 0
		THEN sq.correct_given_answer_count / sq.question_count * 100
		ELSE 0
	END correct_answer_rate
FROM 
(
	SELECT 
		u.id user_id,
		e.id exam_id,
		e.type type,
		ase.id answer_session_id,
		ase.type answer_session_type, 
		SUM ((ga.is_correct IS NOT DISTINCT FROM true)::INT) correct_given_answer_count,
		COUNT (ga.id) given_answer_count,
		COUNT (q.id) question_count,
		COUNT (ga.id) = COUNT (q.id)
			AND COUNT (q.id) > 0 is_completed_session,
		SUM ((ga.is_correct IS NOT DISTINCT FROM true)::INT) = COUNT (q.id) 
			AND COUNT (q.id) > 0 is_successful_session
	FROM public.exam e

	LEFT JOIN public.user u
	ON 1 = 1

	LEFT JOIN public.question q
	ON q.exam_id = e.id

	LEFT JOIN public.answer_session ase
	ON ase.exam_id = e.id
		AND ase.user_id = u.id

	LEFT JOIN public.given_answer ga
	ON ga.answer_session_id = ase.id
		AND ga.question_id = q.id

	GROUP BY
		e.id,
		e.type,
		ase.id,
		u.id

	ORDER BY
		u.id,
		e.id,
		ase.id
) sq