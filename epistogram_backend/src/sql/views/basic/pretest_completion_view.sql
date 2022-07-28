SELECT 
    u.id user_id,
    co.id course_id,
    cv.id course_version_id,
    cicv.id IS NOT NULL is_completed
FROM public.course co

CROSS JOIN public.user u

LEFT JOIN public.course_version cv 
ON cv.course_id = co.id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id 

LEFT JOIN public.exam_version ev
ON ev.module_version_id = mv.id

INNER JOIN public.exam ex
ON ex.id = ev.exam_id
AND ex.is_pretest = true

LEFT JOIN public.course_item_completion_view cicv 
ON cicv.exam_version_id = ev.id
AND cicv.user_id = u.id

ORDER BY 
	u.id,
	co.id