SELECT 
    vv.video_id,
    MAX(vv.id) video_version_id,
    cv.course_id
FROM public.video_version vv

LEFT JOIN public.video vi
ON vi.id = vv.video_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

GROUP BY 
	vv.video_id,
	cv.course_id