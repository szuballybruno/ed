SELECT 
	u.id user_id,
	e.id exam_id,
	e.course_id course_id,
	e.is_final_exam is_final_exam,
	e.order_index order_index,
	SUM (asv.is_completed::int) completed_session_count,
	SUM (asv.is_completed::int) > 0 has_completed_session,
	
	SUM (asv.is_successful::int) successful_session_count,
	SUM (asv.is_successful::int) > 0 has_successful_session,
	
	SUM (asv.is_successful::int) = 1 single_successful_session
FROM public.exam e

LEFT JOIN public.user u
ON 1 = 1

LEFT JOIN public.answer_session_view asv
ON asv.exam_id = e.id
	AND asv.user_id = u.id

GROUP BY
	e.id,
	u.id,
	e.course_id,
	e.order_index,
	e.is_final_exam
	
ORDER BY 
	u.id,
	e.id