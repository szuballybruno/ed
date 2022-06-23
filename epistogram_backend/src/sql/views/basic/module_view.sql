WITH
latest_module_ids AS 
(
	SELECT MAX(mv.id) version_id, mv.module_id
	FROM public.module_version mv
	GROUP BY mv.module_id
),
item_count AS 
(
	SELECT 
		mv.id module_version_id,
		COUNT(vv.id) + COUNT(ev.id) item_count
	FROM public.module_version mv
	
	LEFT JOIN public.video_version vv
	ON vv.module_version_id = mv.id
	
	LEFT JOIN public.exam_version ev
	ON ev.module_version_id = mv.id
	
	GROUP BY mv.id
)
SELECT 
	mv.module_id,
	mv.id module_version_id,
	md.id module_data_id,
	md.name module_name,
	md.description description,
	md.order_index order_index,
	md.image_file_id image_file_id,
	cv.course_id,
	ic.item_count
FROM latest_module_ids lmi

LEFT JOIN public.module_version mv
ON mv.id = lmi.version_id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

LEFT JOIN item_count ic
ON ic.module_version_id = lmi.version_id

ORDER BY
	cv.course_id,
	md.order_index