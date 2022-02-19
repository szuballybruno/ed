SELECT 
	--sq.*,
	sq.user_id,
	sq.course_id,
	COUNT(sq.latest_given_answer_id)::int total_answer_count,
	SUM((ga.is_correct IS NOT DISTINCT FROM true)::int)::int correct_answer_count
FROM 
(
	SELECT 
		u.id user_id,
		co.id course_id,
		v.id video_id,
		q.id question_id,
		MAX(ga.id) latest_given_answer_id
	FROM public.course co

	LEFT JOIN public.user u
	ON true

	LEFT JOIN public.video v 
	ON v.course_id = co.id

	LEFT JOIN public.question q
	ON q.video_id = v.id

	LEFT JOIN public.answer_session ase
	ON ase.user_id = u.id AND ase.video_id = v.id 

	LEFT JOIN public.given_answer ga
	ON ga.question_id = q.id
		AND ga.answer_session_id = ase.id

	GROUP BY u.id, co.id, v.id, q.id
) sq

LEFT JOIN public.given_answer ga
ON ga.id = sq.latest_given_answer_id

GROUP BY sq.user_id, sq.course_id

ORDER BY sq.user_id, sq.course_id