SELECT 
	c.id id,
	c.title title,
	c.deletion_date IS NOT NULL is_deleted,
	cc.id category_id,
	cc.name category_name,
	scc.id sub_category_id,
	scc.name sub_category_name,
	t.id teacher_id,
	t.first_name teacher_first_name,
	t.last_name teacher_last_name,
	sf.file_path cover_file_path,
	(
		SELECT COUNT(sq.*)::int
		FROM (SELECT 
			  DISTINCT video.id 
			  FROM public.video 
			  WHERE video.course_id = c.id) sq
	) video_count,
	(SELECT COUNT(sq.*)::int
		FROM (SELECT 
			  DISTINCT exam.id 
			  FROM public.exam 
			  WHERE exam.course_id = c.id) sq) 
		exam_count
FROM public.course c

LEFT JOIN public.storage_file sf
ON sf.id = c.cover_file_id

LEFT JOIN public.user t
ON t.id = c.teacher_id

LEFT JOIN public.course_category cc
ON cc.id = c.category_id

LEFT JOIN public.course_category scc
ON scc.id = c.sub_category_id
	
ORDER BY
	c.id