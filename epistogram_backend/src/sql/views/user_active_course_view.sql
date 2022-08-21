SELECT
	cosv.course_id,
	cosv.user_id,
	cd.title,
	sf.file_path cover_file_path
FROM public.course_state_view cosv

LEFT JOIN public.course co
ON co.id = cosv.course_id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

WHERE cosv.in_progress
