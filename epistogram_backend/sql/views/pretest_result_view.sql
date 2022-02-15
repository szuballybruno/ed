WITH pretest_asvs AS 
(
	SELECT 
		e.course_id,
		asv.user_id,
		asv.is_completed,
		asv.correct_answer_rate
	FROM public.answer_session_view asv
	LEFT JOIN public.exam e
	ON e.id = asv.exam_id
	WHERE e.type = 'pretest'
)

SELECT  
	u.id user_id,
	co.id course_id,
	COALESCE(pasvs.is_completed, false) is_completed,
	COALESCE(pasvs.correct_answer_rate, 0) correct_answer_rate
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN pretest_asvs pasvs
ON pasvs.user_id = u.id AND pasvs.course_id = co.id