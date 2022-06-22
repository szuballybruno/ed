SELECT 
	sq.*,
	asev.total_question_count,
	asev.correct_answer_count,
	ROUND((asev.correct_answer_count::double precision / asev.total_question_count * 100)::numeric, 1) success_rate 
FROM 
(
	SELECT 
		u.id user_id,
		co.id course_id,
		ex.id exam_id,
		MAX(asev.answer_session_id) answer_session_id
	FROM public.course co
	
	LEFT JOIN public.course_version cv
	ON cv.course_id = co.id

	LEFT JOIN public.user u
	ON 1 = 1
	
	LEFT JOIN public.module_version mv
	ON mv.course_version_id = cv.id

	LEFT JOIN public.exam_version ev
	ON ev.module_version_id = mv.id
	
	LEFT JOIN public.exam ex
	ON ex.id = ev.exam_id

	LEFT JOIN public.answer_session_view asev
	ON asev.exam_version_id = ev.id 
		AND asev.user_id = u.id
		AND asev.is_completed = true

	GROUP BY u.id, co.id, ex.id
) sq

LEFT JOIN public.answer_session_view asev
ON asev.answer_session_id = sq.answer_session_id

LEFT JOIN public.exam ex
ON ex.id = sq.exam_id

LEFT JOIN public.exam_version ev
ON ev.exam_id = ex.id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

ORDER BY sq.user_id, sq.course_id, ed.order_index