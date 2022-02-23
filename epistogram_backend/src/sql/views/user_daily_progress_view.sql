WITH

-- practise question spent time calculation 
practise_question_spent_time AS 
(
	SELECT 
		u.id user_id,
		ga.course_id,
		ga.creation_date,
		(COUNT(ga.id) * 15)::integer spent_seconds 
	FROM public.user u

	LEFT JOIN public.answer_session ase
	ON ase.user_id = u.id AND ase.type = 'practise'

	LEFT JOIN 
	(
		SELECT 
			ga.id,
			v.course_id,
			ga.answer_session_id,
			DATE_TRUNC('day', ga.creation_date) creation_date
		FROM public.given_answer ga
	
		LEFT JOIN public.question q
		ON q.id = ga.question_id

		LEFT JOIN public.video v
		ON v.id = q.video_id
	) ga
	ON ga.answer_session_id = ase.id

	WHERE ga.id IS NOT NULL
	
	GROUP BY 
		u.id,
		ga.course_id,
		ga.creation_date

	ORDER BY
		u.id,
		ga.course_id,
		ga.creation_date
),

-- exam spent time
exam_spent_time AS 
(
	SELECT 
		u.id user_id,
		e.course_id,
		ase.creation_date,
		SUM(ase.elapsed_seconds) spent_seconds
	FROM public.user u

	LEFT JOIN 
	(
		SELECT 
			ase.id,
			ase.user_id,
			ase.exam_id,
			DATE_TRUNC('day', ase.end_date) creation_date,
			EXTRACT(EPOCH FROM ase.end_date - start_date) elapsed_seconds	
		FROM public.answer_session ase

		WHERE ase.start_date IS NOT NULL AND ase.end_date IS NOT NULL 
	) ase
	ON ase.user_id = u.id

	LEFT JOIN public.exam e
	ON e.id = ase.exam_id

	WHERE e.id <> 1 AND e.id IS NOT NULL

	GROUP BY
		u.id,
		e.course_id,
		ase.creation_date

	ORDER BY
		u.id,
		e.course_id,
		ase.creation_date
),

-- video watch spent time 
video_watch_spent_time AS
(
	SELECT 
		u.id user_id,
		v.course_id,
		vps.creation_date,
		COALESCE(SUM(vps.elapsed_seconds), 0) spent_seconds
	FROM public.user u

	LEFT JOIN 
	(
		SELECT 
			vps.id,
			DATE_TRUNC('day', vps.creation_date) creation_date,
			vps.user_id,
			vps.video_id,
			vps.to_seconds - vps.from_seconds elapsed_seconds
		FROM public.video_playback_sample vps
	) vps
	ON vps.user_id = u.id
	
	LEFT JOIN public.video v
	ON vps.video_id = v.id

	WHERE v.id IS NOT NULL
	
	GROUP BY
		u.id,
		v.course_id,
		vps.creation_date

	ORDER BY
		u.id,
		v.course_id,
		vps.creation_date
),

-- video question spent time 
video_question_spent_time AS 
(
	SELECT 
		u.id user_id,
		v.course_id course_id,
		ga.creation_date,
		COALESCE(SUM(ga.elapsed_seconds), 0) spent_seconds
	FROM public.user u

	LEFT JOIN public.answer_session ase
	ON ase.video_id IS NOT NULL 
		AND ase.user_id = u.id

	LEFT JOIN 
	(
		SELECT
			ga.id,
			ga.answer_session_id,
			ga.elapsed_seconds,
			DATE_TRUNC('day', ga.creation_date) creation_date
		FROM public.given_answer ga
	) ga
	ON ga.answer_session_id = ase.id

	LEFT JOIN public.video v
	ON v.id = ase.video_id

	WHERE ga.creation_date IS NOT NULL

	GROUP BY
		u.id,
		v.course_id,
		ga.creation_date

	ORDER BY
		u.id,
		v.course_id,
		ga.creation_date
)

-- main query 
SELECT 
	u.id user_id,
	co.id course_id,
	asd.creation_date,
	SUM (asd.spent_seconds) spent_seconds
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN 
(
	SELECT 
		pqst.user_id,
		NULL::int course_id,
		pqst.creation_date,
		pqst.spent_seconds,
		'practise_question' tag
	FROM practise_question_spent_time pqst
	UNION 
	SELECT 
		est.user_id,
		est.course_id,
		est.creation_date,
		est.spent_seconds,
		'exam' tag
	FROM exam_spent_time est
	UNION 
	SELECT 
		vwst.user_id,
		vwst.course_id,
		vwst.creation_date,
		vwst.spent_seconds,
		'video_watch' tag
	FROM video_watch_spent_time vwst
	UNION 
	SELECT 
		vqst.user_id,
		vqst.course_id,
		vqst.creation_date,
		vqst.spent_seconds,
		'video_question' tag
	FROM video_question_spent_time vqst
) asd
ON asd.user_id = u.id AND asd.course_id = co.id

GROUP BY
	u.id,
	co.id,
	asd.creation_date

ORDER BY
	u.id,
	co.id
