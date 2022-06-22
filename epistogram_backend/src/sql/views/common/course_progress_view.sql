SELECT 
	clsv.user_id,
	clsv.course_id course_id,
	clsv.title course_title,
	clsv.total_course_item_count,
	clsv.completed_course_item_count,
	(clsv.completed_course_item_count::double precision / clsv.total_course_item_count * 100)::int progress_percentage,
	clsv.continue_item_code
FROM public.course_learning_stats_view clsv

WHERE clsv.is_started = true 