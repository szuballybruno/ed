WITH 
latest_given_answers AS 
(
	SELECT 
		ase.user_id user_id,
		co.id course_id,
		vv.id video_version_id,
		qv.id question_version_id,
		MAX(ga.id) latest_given_answer_id
	FROM public.course co
	
	LEFT JOIN public.course_version cv
	ON cv.course_id = co.id
	
	LEFT JOIN public.module_version mv
	ON mv.course_version_id = cv.id

	LEFT JOIN public.video_version vv
	ON vv.module_version_id = mv.id

	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id

	LEFT JOIN public.answer_session ase
	ON ase.video_version_id = vv.id 

	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
		AND ga.answer_session_id = ase.id

	GROUP BY ase.user_id, vv.id, qv.id, co.id
)

SELECT 
	u.id user_id,
	co.id course_id,
	COUNT(lga.latest_given_answer_id)::int total_answer_count,
	SUM((ga.state = 'CORRECT')::int)::int correct_answer_count
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN latest_given_answers lga
ON lga.user_id = u.id
AND lga.course_id = co.id

LEFT JOIN public.given_answer ga
ON ga.id = lga.latest_given_answer_id

GROUP BY u.id, co.id

ORDER BY u.id, co.id