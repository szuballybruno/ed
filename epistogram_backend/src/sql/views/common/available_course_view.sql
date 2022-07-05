WITH 
assigned_courses AS 
(
	SELECT 
		u.id user_id,
		co.id course_id
	FROM public.user u
	
	INNER JOIN public.user_permission_view upv
	ON upv.assignee_user_id = u.id 
	AND upv.permission_code = 'WATCH_COURSE'
	
	INNER JOIN public.course co
	ON co.id = upv.context_course_id
),
any_final_exam_completion AS
(
	SELECT SUM(ecv.has_successful_session::int) > 0 is_completed_final_exam, cv.course_id, ecv.user_id
	FROM public.course_version cv
	
	LEFT JOIN public.exam_completed_view ecv
	ON ecv.course_version_id = cv.id
	AND ecv.is_final_exam
	
	GROUP BY cv.course_id, ecv.user_id
),
course_state_view AS
(
	SELECT 
		co.id course_id,
		u.id user_id,
		ucb.id IS NOT NULL is_started,
		afec.is_completed_final_exam is_completed
	FROM public.course co

	CROSS JOIN public.user u

	LEFT JOIN any_final_exam_completion afec
	ON afec.course_id = co.id
	AND afec.user_id = u.id
		
	LEFT JOIN public.user_course_bridge ucb
	ON ucb.user_id = u.id
	AND ucb.course_id = co.id
		
	ORDER BY 
		u.id,
		co.id
)
SELECT 
	u.id user_id,
	co.id course_id,
	cd.title,
	true can_view,
	sf.file_path file_path,
	csv.is_completed is_completed,
	csv.is_started is_started,
	csc.id sub_category_id,
	cd.is_featured,
	false is_recommended,
	cc.name category_name,
	csc.name sub_category_name,
	ucb.current_item_code current_item_code,
	CASE WHEN first_civ.video_id IS NOT NULL
		THEN (SELECT encode((first_civ.video_id || '@video')::bytea, 'base64')) 
		ELSE (SELECT encode((first_civ.exam_id || '@exam')::bytea, 'base64'))
	END first_item_code,
	CASE WHEN ucb.current_item_code IS NULL 
		THEN NULL --first_civ.item_code 
		ELSE ucb.current_item_code 
	END continue_item_code,
	ucb.stage_name stage_name,
	teacher.id teacher_id,
	teacher.first_name teacher_first_name,
	teacher.last_name teacher_last_name
FROM assigned_courses ac 

LEFT JOIN public.course co
ON co.id = ac.course_id

LEFT JOIN public.latest_course_version_view lcv
ON lcv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.user u 
ON u.id = ac.user_id

LEFT JOIN public.course_item_view first_civ
ON first_civ.course_version_id = cv.id
AND first_civ.item_order_index = 0
AND first_civ.module_order_index = 1 
AND first_civ.item_type != 'pretest'

LEFT JOIN course_state_view csv
ON csv.course_id = co.id 
AND csv.user_id = u.id 

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
AND ucb.course_id = co.id
	
LEFT JOIN public.course_category cc
ON cc.id = cd.category_id
	
LEFT JOIN public.course_category csc
ON csc.id = cd.sub_category_id
	
LEFT JOIN public.user teacher
ON teacher.id = cd.teacher_id
	 
WHERE co.deletion_date IS NULL 
	 
ORDER BY 
	u.id,
	co.id
	


