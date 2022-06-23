SELECT 
	mv.id module_version_id,
	mv.course_version_id,
	md.name,
	md.order_index
FROM public.module_version mv 

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

-- FILTER SIGNUP MODULE
WHERE mv.course_version_id IS NOT NULL