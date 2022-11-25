WITH 
latest_version AS
(
	SELECT MAX(id) id, video_id
	FROM public.video_version
	GROUP BY video_id
)
SELECT 
	v.id video_id,
	vv.id video_version_id,
	vd.id video_data_id,
	mv.id module_version_id,
	mv.course_version_id
FROM latest_version lv

LEFT JOIN public.video v
ON v.id = lv.video_id

LEFT JOIN public.video_version vv
ON vv.id = lv.id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id
