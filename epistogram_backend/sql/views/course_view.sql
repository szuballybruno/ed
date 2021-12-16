SELECT 
	u.id AS user_id,
	ucab.id IS NOT NULL OR course.visibility = 'public' AS can_view,
	sf.file_path AS file_path,
	csv.is_completed AS is_completed,
	csv.is_started AS is_started,
	cc.name AS category_name,
	csc.name AS sub_category_name,
	ucb.current_item_code AS current_item_code,
	teacher.first_name teacher_first_name,
	teacher.last_name teacher_last_name,
	course.*
FROM public.course

LEFT JOIN public.user u
ON 1 = 1

LEFT JOIN public.course_state_view AS csv
ON csv.course_id = course.id 
	AND csv.user_id = u.id 

LEFT JOIN public.storage_file AS sf
ON sf.id = course.cover_file_id

LEFT JOIN public.user_course_bridge AS ucb
ON ucb.user_id = u.id
	AND ucb.course_id = course.id

LEFT JOIN public.course_item_all_view AS ciav
ON ciav.course_id = course.id
	AND ciav.order_index = 0
	
LEFT JOIN public.course_category AS cc
ON cc.id = course.category_id
	
LEFT JOIN public.course_category AS csc
ON csc.id = course.sub_category_id
	
LEFT JOIN public.user_course_access_bridge ucab
ON ucab.user_id = u.id AND ucab.course_id = course.id
	
LEFT JOIN public.user teacher
ON teacher.id = course.teacher_id
	
ORDER BY 
	u.id,
	course.title DESC


