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

	LEFT JOIN public.answer_session_view asv
	ON asv.user_id = u.id AND asv.answer_session_type = 'practise'

	LEFT JOIN 
	(
		SELECT 
			ga.id,
			cv.course_id,
			ga.answer_session_id,
			DATE_TRUNC('day', ga.creation_date) creation_date
		FROM public.given_answer ga
	
		LEFT JOIN public.question_version qv
		ON qv.id = ga.question_version_id

		LEFT JOIN public.video_version vv
		ON vv.id = qv.video_version_id
		
		LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
	) ga
	ON ga.answer_session_id = asv.answer_session_id

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
		asv.course_id,
		asv.creation_date,
		SUM(asv.elapsed_seconds) spent_seconds
	FROM public.user u

	LEFT JOIN 
	(
		SELECT 
			asv.answer_session_id,
			asv.user_id,
			cv.course_id,
			ev.exam_id,
			DATE_TRUNC('day', asv.end_date) creation_date,
			EXTRACT(EPOCH FROM asv.end_date - start_date) elapsed_seconds	
		FROM public.answer_session_view asv
		
		LEFT JOIN public.exam_version ev
		ON ev.id = asv.exam_version_id
		
		LEFT JOIN public.module_version mv
		ON mv.id = ev.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id

		WHERE asv.start_date IS NOT NULL AND asv.end_date IS NOT NULL 
	) asv
	ON asv.user_id = u.id

	LEFT JOIN public.exam e
	ON e.id = asv.exam_id

	WHERE e.id <> 1 AND e.id IS NOT NULL

	GROUP BY
		u.id,
		asv.course_id,
		asv.creation_date

	ORDER BY
		u.id,
		asv.course_id,
		asv.creation_date
),

-- video watch spent time 
video_watch_spent_time AS
(
	SELECT 
		u.id user_id,
		vps.course_id,
		vps.creation_date,
		COALESCE(SUM(vps.elapsed_seconds), 0) spent_seconds
	FROM public.user u

	LEFT JOIN 
	(
		SELECT 
			vps.id,
			DATE_TRUNC('day', vps.creation_date) creation_date,
			vps.user_id,
			vv.video_id,
			cv.course_id,
			vps.to_seconds - vps.from_seconds elapsed_seconds
		FROM public.video_playback_sample vps
		
		LEFT JOIN public.video_version vv
		ON vv.id = vps.video_version_id
		
		LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
	) vps
	ON vps.user_id = u.id
	
	LEFT JOIN public.video v
	ON vps.video_id = v.id

	WHERE v.id IS NOT NULL
	
	GROUP BY
		u.id,
		vps.course_id,
		vps.creation_date

	ORDER BY
		u.id,
		vps.course_id,
		vps.creation_date
),

-- video question spent time 
video_question_spent_time AS 
(
	SELECT 
		u.id user_id,
		cv.course_id course_id,
		ga.creation_date,
		COALESCE(SUM(ga.elapsed_seconds), 0) spent_seconds
	FROM public.user u

	LEFT JOIN public.answer_session_view asv
	ON asv.video_version_id IS NOT NULL 
		AND asv.user_id = u.id

	LEFT JOIN 
	(
		SELECT
			ga.id,
			ga.answer_session_id,
			ga.elapsed_seconds,
			DATE_TRUNC('day', ga.creation_date) creation_date
		FROM public.given_answer ga
	) ga
	ON ga.answer_session_id = asv.answer_session_id

	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	WHERE ga.creation_date IS NOT NULL

	GROUP BY
		u.id,
		cv.course_id,
		ga.creation_date

	ORDER BY
		u.id,
		cv.course_id,
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
