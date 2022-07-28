WITH 
latest_answer_session AS 
(
	SELECT 
		cv.course_id,
		asv.user_id,
		MAX(asv.answer_session_id) answer_session_id
	FROM public.answer_session_view asv
	
	LEFT JOIN public.exam_version ev
	ON ev.id = asv.exam_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
		
	WHERE asv.answer_session_type = 'pretest'
	
	GROUP BY 
		cv.course_id, 
		asv.user_id
)
SELECT  
	u.id user_id,
	las.course_id,
	COALESCE(asv.answer_session_success_rate, 0) correct_answer_rate,
	asv.end_date
FROM public.user u

INNER JOIN latest_answer_session las
ON las.user_id = u.id

LEFT JOIN public.answer_session_view asv
ON asv.answer_session_id = las.answer_session_id