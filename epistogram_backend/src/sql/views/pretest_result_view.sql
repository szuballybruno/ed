SELECT  
	u.id user_id,
	cv.course_id,
	COALESCE(asv.answer_session_success_rate, 0) correct_answer_rate,
	asv.end_date
FROM public.user u

INNER JOIN public.latest_answer_session_view lasv
ON lasv.user_id = u.id

LEFT JOIN public.answer_session_view asv
ON asv.answer_session_id = lasv.answer_session_id
AND asv.answer_session_type = 'pretest'

LEFT JOIN public.exam_version ev
ON ev.id = lasv.exam_version_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id