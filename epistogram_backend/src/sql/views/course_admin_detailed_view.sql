SELECT 
	co.id course_id,
    co.title title,
    co.short_description short_description,
    co.description description,
    co.difficulty difficulty,
    co.benchmark benchmark,
    co.previously_completed_count previously_completed_count,
    co.language language_name,
    co.technical_requirements technical_requirements,
	co.skill_benefits skill_benefits,
	co.visibility visibility,
	co.human_skill_benefits human_skill_benefits,
	co.human_skill_benefits_description human_skill_benefits_description,
	co.requirements_description technical_requirements_description,
	
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
FROM public.course co

LEFT JOIN public.storage_file sf
ON sf.id = co.cover_file_id

LEFT JOIN public.user tea
ON tea.id = co.teacher_id

LEFT JOIN public.course_category cc
ON cc.id = co.category_id

LEFT JOIN public.course_category scc
ON scc.id = co.sub_category_id
	
ORDER BY
	co.id