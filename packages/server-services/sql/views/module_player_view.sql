WITH
latest_module_version_ids AS 
(
	SELECT MAX(mv.id) version_id, mv.module_id
	FROM public.module_version mv
	GROUP BY mv.module_id
)
SELECT 
	mo.id module_id,
	mv.id module_version_id,
	sf.file_path image_file_path,
	md.order_index,
	md.name,
	md.description
FROM public.module mo

LEFT JOIN latest_module_version_ids lmvi
ON lmvi.module_id = mo.id

LEFT JOIN public.module_version mv
ON mv.id = lmvi.version_id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.storage_file sf
ON sf.id = md.image_file_id

WHERE md.order_index != 0


