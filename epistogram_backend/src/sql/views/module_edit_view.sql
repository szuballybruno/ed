SELECT 
	mv.id module_version_id,
	mv.course_version_id,
	md.name,
	md.description,
	md.order_index,
	sf.file_path cover_file_path
FROM public.module_version mv

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.storage_file sf
ON sf.id = md.image_file_id

ORDER BY
	md.order_index