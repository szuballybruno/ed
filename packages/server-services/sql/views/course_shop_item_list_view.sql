SELECT
    cv.course_id,
    cd.title,
    sf.file_path cover_file_path
FROM public.course_version cv

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

WHERE cd.visibility = 'private'