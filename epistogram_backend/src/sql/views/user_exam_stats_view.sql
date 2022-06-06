SELECT DISTINCT ON (e.id)
	e.id exam_id,
	e.title exam_title,
	u.id user_id,
	e.course_id,
	asv.correct_answer_rate::int,
	CASE 
		WHEN asv.correct_answer_rate < 60
		THEN true
		ELSE false
	END should_practise_exam,
	asv.correct_answer_count::text || ' / ' || asv.total_question_count::text correct_answer_count,
	EXTRACT(EPOCH FROM (ase.end_date - ase.start_date)::time)::int exam_length_seconds,
	ase.end_date last_completion_date,
	AVG(ga.elapsed_seconds) average_reaction_time
FROM public.exam e

LEFT JOIN public.answer_session ase
ON ase.exam_id = e.id

LEFT JOIN public.answer_session_view asv
ON asv.answer_session_id = ase.id

LEFT JOIN public.given_answer ga
ON ga.answer_session_id = ase.id

LEFT JOIN public.user u
ON u.id = ase.user_id

WHERE ase.end_date IS NOT NULL
AND u.id IS NOT NULL
AND (e.type = 'normal'
OR e.type = 'final')

GROUP BY 
	e.id, 
	u.id, 
	asv.correct_answer_rate, 
	asv.correct_answer_count,
	asv.total_question_count,
	ase.end_date,
	ase.start_date

ORDER BY e.id, ase.end_date desc