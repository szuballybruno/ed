SELECT
	ucb.course_id,
	ucb.user_id,
	co.title,
	sf.file_path cover_file_path
FROM public.user_course_bridge ucb

LEFT JOIN public.course co
ON co.id = ucb.course_id

LEFT JOIN public.storage_file sf
ON sf.id = co.cover_file_id