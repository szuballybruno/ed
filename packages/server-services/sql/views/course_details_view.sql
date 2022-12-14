
WITH 
course_question_count_cte AS
(
	SELECT 
		cv.id course_version_id,
		COALESCE(COUNT(qv.id), 0)::int question_count
	FROM public.course_version cv

	LEFT JOIN public.module_version mv
	ON mv.course_version_id = cv.id
	
	LEFT JOIN public.video_version vv
	ON vv.module_version_id = mv.id

	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id
	
	GROUP BY
		cv.id
	
	ORDER BY
		cv.id
),
course_module_count_cte AS
(
	SELECT 
		cv.id course_version_id,
		COALESCE(COUNT(mv.id), 0)::int module_count
	FROM public.course_version cv

	LEFT JOIN public.module_version mv
	ON mv.course_version_id = cv.id
	
	GROUP BY
		cv.id
	
	ORDER BY
		cv.id
),
course_completion_count_cte AS
(
	SELECT 
		cv.id course_version_id,
		cv.course_id,
		COALESCE(COUNT(cvcv.user_id), 0)::int completion_count
	FROM public.course_version cv
	
	LEFT JOIN public.course_completion_view cvcv
	ON cvcv.course_id = cv.course_id
	
	GROUP BY
		cv.id,
		cv.course_id
	
	ORDER BY
		cv.course_id,
		cv.id
)
SELECT 
	lcvv.course_id,
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
	cc.id category_id,
	cc.name category_name,
	scc.id sub_category_id,
	scc.name sub_category_name,
	tuser.id teacher_id,
	tuser.first_name teacher_first_name,
	tuser.last_name teacher_last_name,
	tinfo.skills teacher_skills,
	tinfo.course_count teacher_course_count,
	tinfo.student_count teacher_student_count,
	tinfo.video_count teacher_video_count,
	tinfo.rating teacher_rating,
	tinfo.description teacher_description,
	tinfo.badges teacher_badges,
	tavatarsf.file_path teacher_avatar_file_path,
	sf.file_path cover_file_path,
	cvcv.video_count total_video_count,
	COALESCE(cvlv.sum_length_seconds, 0) total_video_sum_length_seconds,
	cmcc.module_count total_module_count,
	cqcc.question_count total_video_question_count,
	cccc.completion_count total_completion_count,
	true can_start_course
FROM public.latest_course_version_view lcvv

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN course_question_count_cte cqcc
ON cqcc.course_version_id = cv.id

LEFT JOIN course_module_count_cte cmcc
ON cmcc.course_version_id = cv.id

LEFT JOIN public.course_video_length_view cvlv
ON cvlv.course_version_id = cv.id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

CROSS JOIN public.user u

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user tuser
ON tuser.id = cd.teacher_id

LEFT JOIN public.teacher_info tinfo
ON tinfo.user_id = tuser.id

LEFT JOIN public.storage_file tavatarsf
ON tavatarsf.id = tuser.avatar_file_id

LEFT JOIN public.course_category cc
ON cc.id = cd.category_id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
AND ucb.course_id = cv.course_id

LEFT JOIN public.course_category scc
ON scc.id = cd.sub_category_id

LEFT JOIN public.course_video_count_view cvcv
ON cvcv.course_id = cv.course_id

LEFT JOIN course_completion_count_cte cccc
ON cccc.course_version_id = cv.id
	
ORDER BY
	lcvv.course_id,
	u.id