SELECT 
    COUNT(vv.id)::int video_count, 
    mv.course_version_id
FROM public.video_version vv

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

GROUP BY mv.course_version_id