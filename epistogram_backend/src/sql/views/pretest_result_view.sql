WITH pretest_asvs AS 
(
	SELECT 
		cv.course_id,
		asv.user_id,
		asv.is_completed,
		0 correct_answer_rate,
		MAX(asv.end_date) end_date
	FROM public.answer_session_view asv
	
	LEFT JOIN public.exam_version ev
	ON ev.id = asv.exam_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
		
	WHERE asv.answer_session_type = 'pretest'
	
	GROUP BY cv.course_id, asv.user_id, asv.is_completed
)

SELECT  
	u.id user_id,
	co.id course_id,
	COALESCE(pasvs.is_completed, false) is_completed,
	COALESCE(pasvs.correct_answer_rate, 0) correct_answer_rate,
	pasvs.end_date
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN pretest_asvs pasvs
ON pasvs.user_id = u.id AND pasvs.course_id = co.id