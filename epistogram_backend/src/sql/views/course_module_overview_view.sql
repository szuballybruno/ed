SELECT 
	co.id course_id,
	mo.id module_id,
	mo.name module_name,
	v.title video_title,
	v.length_seconds video_length_seconds
FROM public.course co

LEFT JOIN public.course_module mo
ON mo.course_id = co.id

LEFT JOIN public.video v
ON v.module_id = mo.id

ORDER BY
	co.id,
	mo.order_index,
	v.order_index