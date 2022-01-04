SELECT 
	u.id user_id,
	course.id course_id,
	ucab.id IS NOT NULL OR course.visibility = 'public' can_view,
	sf.file_path file_path,
	csv.is_completed is_completed,
	csv.is_started is_started,
	cc.name category_name,
	csc.name sub_category_name,
	ucb.current_item_code current_item_code,
	(
		SELECT civ.item_code FROM public.course_item_view civ
		LEFT JOIN public.course_module cm
		ON cm.id = civ.module_id
		WHERE civ.course_id = course.id
			AND civ.item_order_index = 0
			AND cm.order_index = 0 
	) first_item_code,
	teacher.first_name teacher_first_name,
	teacher.last_name teacher_last_name,
	course.*
FROM public.course

LEFT JOIN public.user u
ON 1 = 1

LEFT JOIN public.course_state_view csv
ON csv.course_id = course.id 
	AND csv.user_id = u.id 

LEFT JOIN public.storage_file sf
ON sf.id = course.cover_file_id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
	AND ucb.course_id = course.id
	
LEFT JOIN public.course_category cc
ON cc.id = course.category_id
	
LEFT JOIN public.course_category csc
ON csc.id = course.sub_category_id
	
LEFT JOIN public.user_course_access_bridge ucab
ON ucab.user_id = u.id AND ucab.course_id = course.id
	
LEFT JOIN public.user teacher
ON teacher.id = course.teacher_id
	
ORDER BY 
	u.id,
	course.id


