SELECT
	ucb.course_id,
	ucb.user_id,
	cd.title,
	sf.file_path cover_file_path
FROM public.user_course_bridge ucb

LEFT JOIN public.course co
ON co.id = ucb.course_id

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

WHERE ucb.start_date IS NOT NULL
AND ucb.stage_name != 'created'
