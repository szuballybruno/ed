SELECT 
	mo.id,
	MAX(md.deletion_date) deletion_date,
	MAX(md.name) name,
	MAX(md.description) description,
	MAX(md.order_index) order_index,
	MAX(md.image_file_id) image_file_id,
	cv.course_id,
	COUNT(civ.video_id)::int + COUNT(civ.exam_id) item_count
FROM public.module mo

LEFT JOIN public.module_version mv
ON mv.module_id = mo.id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

LEFT JOIN public.course_item_view civ
ON civ.module_id = mo.id

GROUP BY
	mo.id,
	cv.course_id

ORDER BY
	mo.id