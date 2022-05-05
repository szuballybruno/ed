WITH 
inherited_courses AS
(
	SELECT 
		u.id user_id,
		cab.course_id
	FROM public.user u

	LEFT JOIN public.user_permission_view upv
	ON upv.user_id = u.id 
		AND upv.permission_code = 'VIEW_COMPANY_COURSES'

	INNER JOIN public.course_access_bridge cab
	ON cab.company_id = upv.context_company_id

	GROUP BY
		u.id,
		cab.course_id

	ORDER BY
		u.id,
		cab.course_id
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
FROM public.user u 

INNER JOIN inherited_courses ic
ON ic.user_id = u.id 

LEFT JOIN public.course co
ON co.id = ic.course_id

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
	
LEFT JOIN public.course_access_bridge ucab
ON ucab.user_id = u.id 
	AND ucab.course_id = co.id
	
LEFT JOIN public.user_permission_view upv
ON upv.user_id = u.id 
	AND upv.permission_code = 'VIEW_COMPANY_COURSES'
	AND upv.context_company_id = u.company_id
	
LEFT JOIN public.user teacher
ON teacher.id = co.teacher_id
	
WHERE upv.permission_id IS NOT NULL 
	 
ORDER BY 
	u.id,
	co.id
	


