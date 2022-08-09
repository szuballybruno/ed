SELECT 
    ev.exam_id,
    MAX(ev.id) exam_version_id,
    cv.course_id,
    ex.is_pretest
FROM public.exam_version ev

LEFT JOIN public.exam ex
ON ex.id = ev.exam_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

GROUP BY 
	ev.exam_id,
	cv.course_id,
	ex.is_pretest