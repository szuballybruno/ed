SELECT  
	lasv.user_id,
	lasv.answer_session_id,
	lasv.exam_version_id,
	cv.course_id,
	esv.score_percentage,
	cic.completion_date
FROM public.latest_answer_session_view lasv

INNER JOIN public.exam_version ev
ON ev.id = lasv.exam_version_id

INNER JOIN public.exam e
ON e.id = ev.exam_id
AND e.is_pretest = true

INNER JOIN public.exam_score_view esv
ON esv.answer_session_id = lasv.answer_session_id

INNER JOIN public.course_item_completion_view cic
ON cic.answer_session_id = lasv.answer_session_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id