WITH 
latest_version AS
(
	SELECT MAX(id) id, exam_id
	FROM public.exam_version
	GROUP BY exam_id
)
SELECT 
	v.id exam_id,
	vv.id exam_version_id,
	vd.id exam_data_id,
	mv.id module_version_id,
	mv.course_version_id
FROM latest_version lv

LEFT JOIN public.exam v
ON v.id = lv.exam_id

LEFT JOIN public.exam_version vv
ON vv.id = lv.id

LEFT JOIN public.exam_data vd
ON vd.id = vv.exam_data_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id
