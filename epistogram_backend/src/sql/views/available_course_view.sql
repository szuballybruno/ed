WITH 
assigned_courses AS 
(
	SELECT 
		u.id user_id,
		co.id course_id,
		co.title
	FROM public.user u
	
	INNER JOIN public.user_permission_view upv
	ON upv.assignee_user_id = u.id 
	AND upv.permission_code = 'WATCH_COURSE'
	
	INNER JOIN public.course co
	ON co.id = upv.context_course_id
),
course_state_view AS
(
	SELECT 
		course.id course_id,
		user.id user_id,
		ucb.id IS NOT NULL is_started,
		ecv.has_successful_session is_completed
	FROM public.course 

	LEFT JOIN public.user
	ON 1 = 1

	LEFT JOIN public.exam_completed_view ecv
	ON ecv.course_id = course.id
		AND ecv.user_id = user.id
		AND ecv.is_final_exam = true
		
	LEFT JOIN public.user_course_bridge ucb
	ON ucb.user_id = user.id
		AND ucb.course_id = course.id
		
	ORDER BY 
		user.id,
		course.id
)
SELECT 
	u.id user_id,
	co.id course_id,
	co.deletion_date IS NOT NULL is_deleted,
-- 	ucab.id IS NOT NULL OR co.visibility = 'public' can_view,
	true can_view,
	sf.file_path file_path,
	csv.is_completed is_completed,
	csv.is_started is_started,
	cc.name category_name,
	csc.name sub_category_name,
	ucb.current_item_code current_item_code,
    first_civ.item_code first_item_code,
	CASE WHEN ucb.current_item_code IS NULL 
		THEN first_civ.item_code 
		ELSE ucb.current_item_code 
	END continue_item_code,
	ucb.stage_name stage_name,
	teacher.first_name teacher_first_name,
	teacher.last_name teacher_last_name,
	co.*
FROM assigned_courses ac 

LEFT JOIN public.user u 
ON u.id = ac.user_id

LEFT JOIN public.course co
ON co.id = ac.course_id

LEFT JOIN public.course_item_view first_civ
ON first_civ.course_id = co.id
	AND first_civ.item_order_index = 0
	AND first_civ.module_order_index = 0 
	AND first_civ.item_is_deleted = false
	AND first_civ.item_type != 'pretest'

LEFT JOIN course_state_view csv
ON csv.course_id = co.id 
	AND csv.user_id = u.id 

LEFT JOIN public.storage_file sf
ON sf.id = co.cover_file_id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
	AND ucb.course_id = co.id
	
LEFT JOIN public.course_category cc
ON cc.id = co.category_id
	
LEFT JOIN public.course_category csc
ON csc.id = co.sub_category_id
	
LEFT JOIN public.user teacher
ON teacher.id = co.teacher_id
	 
ORDER BY 
	u.id,
	co.id
	


