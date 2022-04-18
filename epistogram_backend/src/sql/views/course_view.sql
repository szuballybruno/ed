SELECT 
	u.id user_id,
	co.id course_id,
	co.deletion_date IS NOT NULL is_deleted,
	ucab.id IS NOT NULL OR co.visibility = 'public' can_view,
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
FROM public.course co

LEFT JOIN public.user u
ON 1 = 1

LEFT JOIN public.course_item_view first_civ
ON first_civ.course_id = co.id
	AND first_civ.item_order_index = 0
	AND first_civ.module_order_index = 0 
	AND first_civ.item_is_deleted = false
	AND first_civ.item_type != 'pretest'

LEFT JOIN public.course_state_view csv
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
	
LEFT JOIN public.user_course_access_bridge ucab
ON ucab.user_id = u.id 
	AND ucab.course_id = co.id
	
LEFT JOIN public.user teacher
ON teacher.id = co.teacher_id
	
-- where u.id = 1 
	 
ORDER BY 
	u.id,
	co.id
	


