WITH 
exam_count AS 
(
	SELECT COUNT(ev.id) exam_count, mv.course_version_id
	FROM public.exam_version ev
	
	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id
	
	GROUP BY mv.course_version_id
)
SELECT 
	lcvv.course_id,
	cd.title title,
	co.deletion_date IS NOT NULL is_deleted,
	cc.id category_id,
	cc.name category_name,
	scc.id sub_category_id,
	scc.name sub_category_name,
	u.id teacher_id,
	u.first_name teacher_first_name,
	u.last_name teacher_last_name,
	sf.file_path cover_file_path,
	cvcv.video_count,
	ec.exam_count
FROM public.latest_course_version_view lcvv

LEFT JOIN public.course_version cv 
ON cv.id = lcvv.version_id

LEFT JOIN public.course co
ON co.id = cv.course_id

LEFT JOIN public.course_data cd 
ON cd.id = cv.course_data_id 

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user u
ON u.id = cd.teacher_id

LEFT JOIN public.course_category cc
ON cc.id = cd.category_id

LEFT JOIN public.course_category scc
ON scc.id = cd.sub_category_id

LEFT JOIN public.course_video_count_view cvcv
ON cvcv.course_version_id = lcvv.version_id

LEFT JOIN exam_count ec
ON ec.course_version_id = lcvv.version_id
	
ORDER BY
	lcvv.course_id