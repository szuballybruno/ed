SELECT 
	co.id course_id,
    co.title title,
    co.short_description short_description,
    co.description description,
    co.difficulty difficulty,
    co.benchmark benchmark,
    co.language language_name,
    co.technical_requirements technical_requirements,
	co.skill_benefits skill_benefits,
	co.visibility visibility,
	co.human_skill_benefits human_skill_benefits,
	co.human_skill_benefits_description human_skill_benefits_description,
	co.modification_date modification_date,
	
	-- cat 
	cc.id category_id,
	cc.name category_name,
	
	-- subcat
	scc.id sub_category_id,
	scc.name sub_category_name,
	
	-- teacher 
	tuser.id teacher_id,
	tuser.first_name teacher_first_name,
	tuser.last_name teacher_last_name,
	
	-- teacher info
	tinfo.skills teacher_skills,
	tinfo.course_count teacher_course_count,
	tinfo.student_count teacher_student_count,
	tinfo.video_count teacher_video_count,
	tinfo.rating teacher_rating,
	tinfo.description teacher_description,
	tinfo.badges teacher_badges,
	
	-- teacher avatar 
	tavatarsf.file_path teacher_avatar_file_path,
	
	-- cover
	sf.file_path cover_file_path,
	
	-- calculated
	(
		SELECT COALESCE(COUNT(v.id), 0)::int
		FROM public.video v 
		LEFT JOIN public.course_module cm
		ON cm.course_id = co.id AND cm.id = v.module_id
		WHERE cm.course_id = co.id
	) total_video_count,
	(
		SELECT COALESCE(SUM(v.length_seconds), 0)::int
		FROM public.video v 
		LEFT JOIN public.course_module cm
		ON cm.course_id = co.id AND cm.id = v.module_id
		WHERE cm.course_id = co.id
	) total_video_sum_length_seconds,
	(
		SELECT COALESCE(COUNT(cm.id), 0)::int
		FROM public.course_module cm
		WHERE cm.course_id = co.id
	) total_module_count,
	(
		SELECT COALESCE(COUNT(q.id), 0)::int
		FROM public.video v 
		LEFT JOIN public.course_module cm
		ON cm.course_id = co.id AND cm.id = v.module_id
		LEFT JOIN public.question q
		ON q.video_id = v.id
		WHERE cm.course_id = co.id
	) total_video_question_count
	
FROM public.course co

LEFT JOIN public.storage_file sf
ON sf.id = co.cover_file_id

LEFT JOIN public.user tuser
ON tuser.id = co.teacher_id

LEFT JOIN public.storage_file tavatarsf
ON tavatarsf.id = tuser.avatar_file_id

LEFT JOIN public.teacher_info tinfo
ON tinfo.user_id = tuser.id

LEFT JOIN public.course_category cc
ON cc.id = co.category_id

LEFT JOIN public.course_category scc
ON scc.id = co.sub_category_id
	
ORDER BY
	co.id