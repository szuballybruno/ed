SELECT 
	lcvv.course_id,
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
	cd.requirements_description technical_requirements_description,
	
	-- cat 
	cc.id category_id,
	cc.name category_name,
	
	-- subcat
	scc.id sub_category_id,
	scc.name sub_category_name,
	
	-- teacher 
	tea.id teacher_id,
	tea.first_name teacher_first_name,
	tea.last_name teacher_last_name,
	sf.file_path cover_file_path
FROM public.latest_course_version_view lcvv

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user tea
ON tea.id = cd.teacher_id

LEFT JOIN public.course_category cc
ON cc.id = cd.category_id

LEFT JOIN public.course_category scc
ON scc.id = cd.sub_category_id
	
ORDER BY
	lcvv.course_id