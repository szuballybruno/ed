SELECT 
	--sq.*,
	sq.user_id,
	sq.course_id,
	COUNT(sq.latest_given_answer_id)::int total_answer_count,
	SUM((ga.state = 'CORRECT')::int)::int correct_answer_count
FROM 
(
	SELECT 
		u.id user_id,
		c.id course_id,
		vv.id video_version_id,
		qv.id question_version_id,
		MAX(ga.id) latest_given_answer_id
	FROM public.course c
	
	LEFT JOIN public.course_version cv
	ON cv.course_id = c.id

	LEFT JOIN public.user u
	ON true
	
	LEFT JOIN public.module_version mv
	ON mv.course_version_id = cv.id

	LEFT JOIN public.video_version vv
	ON vv.module_version_id = mv.id

	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id

	LEFT JOIN public.answer_session ase
	ON ase.user_id = u.id AND ase.video_version_id = vv.id 

	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
		AND ga.answer_session_id = ase.id

	GROUP BY u.id, vv.id, qv.id, c.id
) sq

LEFT JOIN public.given_answer ga
ON ga.id = sq.latest_given_answer_id

GROUP BY sq.user_id, sq.course_id

ORDER BY sq.user_id, sq.course_id