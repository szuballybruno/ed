SELECT 
    mv.course_version_id,
    COALESCE(SUM(vf.length_seconds), 0)::int sum_length_seconds
FROM public.video v

LEFT JOIN public.video_version vv
ON vv.video_id = v.id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN public.video_file vf
ON vf.id = vd.video_file_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id

-- filter signup exam
WHERE mv.course_version_id IS NOT NULL

GROUP BY
    mv.course_version_id