SELECT 
	uvpb.user_id,
	cv.course_id,
	uvpb.completion_date
FROM public.user_video_progress_bridge uvpb

LEFT JOIN public.video_version vv
ON vv.id = uvpb.video_version_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

WHERE uvpb.completion_date IS NOT NULL

UNION ALL
SELECT 
	uepb.user_id,
	cv.course_id,
	uepb.completion_date
FROM public.user_exam_progress_bridge uepb

LEFT JOIN public.exam_version ev
ON ev.id = uepb.exam_version_id

LEFT JOIN public.exam ex
ON ex.id = ev.exam_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

WHERE ex.is_pretest IS NOT TRUE
AND ex.is_signup IS NOT TRUE
AND uepb.completion_date IS NOT NULL