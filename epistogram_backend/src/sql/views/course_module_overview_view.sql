SELECT 
	co.id course_id,
	mo.id module_id,
	md.name module_name,
	vd.title video_title,
	vf.length_seconds video_length_seconds
FROM public.course co

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.module mo
ON mo.id = mv.module_id

LEFT JOIN public.video_version vv
ON vv.module_version_id = mv.id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN public.video_file vf
ON vf.id = vd.video_file_id

WHERE md.order_index != 0

ORDER BY
	co.id,
	md.order_index,
	vd.order_index