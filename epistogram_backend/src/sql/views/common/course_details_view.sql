SELECT 
	co.id course_id,
	u.id user_id,
    cd.title title,
    cd.short_description short_description,
    cd.description description,
    cd.difficulty difficulty,
    cd.benchmark benchmark,
    cd.previously_completed_count previously_completed_count,
    cd.language language_name,
    cd.technical_requirements technical_requirements,
	cd.skill_benefits skill_benefits,
	cd.visibility visibility,
	cd.human_skill_benefits human_skill_benefits,
	cd.human_skill_benefits_description human_skill_benefits_description,
	cd.modification_date modification_date,
	ucb.current_item_code,
	ucb.stage_name,
	
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
		SELECT 
			COALESCE(COUNT(v.id), 0)::int
		FROM public.video v 
		
		LEFT JOIN public.video_version vv
		ON vv.video_id = v.id
		
		LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
		
		LEFT JOIN public.course lco
		ON lco.id = cv.course_id
		
		WHERE lco.id = co.id
	) total_video_count,
	(
		SELECT 
			COALESCE(SUM(vf.length_seconds), 0)::int
		FROM public.video v
		
		LEFT JOIN public.video_version vv
		ON vv.video_id = v.id
		
		LEFT JOIN public.video_data vd
		ON vd.id = vv.video_data_id
		
		LEFT JOIN public.video_file vf
		ON vf.id = vd.video_file_id
		
		LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
		
		LEFT JOIN public.course lco
		ON lco.id = cv.course_id
		
		WHERE lco.id = co.id
	) total_video_sum_length_seconds,
	(
		SELECT 
			COALESCE(COUNT(mo.id), 0)::int
		FROM public.module mo
		
		LEFT JOIN public.module_version mv
		ON mv.id = mo.id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
		
		LEFT JOIN public.course lco
		ON lco.id = cv.course_id
		
		WHERE lco.id = co.id
	) total_module_count,
	(
		SELECT 
			COALESCE(COUNT(qv.id), 0)::int
		FROM public.video v 
		
		LEFT JOIN public.video_version vv
		ON vv.video_id = v.id
		
			LEFT JOIN public.module_version mv
		ON mv.id = vv.module_version_id
		
		LEFT JOIN public.course_version cv
		ON cv.id = mv.course_version_id
		
		LEFT JOIN public.course lco
		ON lco.id = cv.course_id
		
		LEFT JOIN public.question_version qv
		ON qv.video_version_id = vv.id
		
		WHERE lco.id = co.id
	) total_video_question_count,
	true can_start_course
FROM public.course co

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

CROSS JOIN public.user u

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user tuser
ON tuser.id = cd.teacher_id

LEFT JOIN public.storage_file tavatarsf
ON tavatarsf.id = tuser.avatar_file_id

LEFT JOIN public.teacher_info tinfo
ON tinfo.user_id = tuser.id

LEFT JOIN public.course_category cc
ON cc.id = cd.category_id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
AND ucb.course_id = co.id

LEFT JOIN public.course_category scc
ON scc.id = cd.sub_category_id
	
ORDER BY
	u.id,
	co.id