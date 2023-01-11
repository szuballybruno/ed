SELECT 
	u.id user_id,
	ev.id exam_version_id,
	mv.course_version_id,
	ed.is_final is_final_exam,
	ed.order_index order_index,
	SUM (asv.is_completed::int)::int completed_session_count,
	SUM (asv.is_completed::int) > 0 has_completed_session,
	
	SUM (asv.is_successful::int)::int successful_session_count,
	SUM (asv.is_successful::int) > 0 has_successful_session,
	
	SUM (asv.is_successful::int) = 1 single_successful_session
FROM public.exam_version ev

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

CROSS JOIN public.user u

LEFT JOIN public.answer_session_evaluation_view asv
ON asv.exam_version_id = ev.id AND asv.user_id = u.id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

GROUP BY
	ev.id,
	u.id,
	mv.course_version_id,
	ed.order_index,
	ed.is_final
	
ORDER BY 
	u.id,
	ev.id