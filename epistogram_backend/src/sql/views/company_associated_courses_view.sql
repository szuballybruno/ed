SELECT 
    com.id company_id,
    co.id course_id,
    cv.id course_version_id,
    cab.id IS NOT NULL is_assigned,
    cover_file.file_path cover_file_path,
    cd.title
FROM public.company com 

CROSS JOIN public.course co 

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id 

LEFT JOIN public.course_access_bridge cab
ON cab.course_id = co.id 
AND cab.company_id = com.id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file cover_file
ON cover_file.id = cd.cover_file_id

ORDER BY 
    com.id,
    cab.id IS NOT NULL DESC,
    co.id