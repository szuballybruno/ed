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
		e.id exam_id,
		MAX(asev.answer_session_id) answer_session_id
	FROM public.course co

	LEFT JOIN public.user u
	ON 1 = 1

	LEFT JOIN public.exam e
	ON e.course_id = co.id

	LEFT JOIN public.answer_session_view asev
	ON asev.exam_id = e.id 
		AND asev.user_id = u.id
		AND asev.is_completed = true

	GROUP BY u.id, co.id, e.id
) sq

LEFT JOIN public.answer_session_view asev
ON asev.answer_session_id = sq.answer_session_id

LEFT JOIN public.exam e
ON e.id = sq.exam_id

ORDER BY sq.user_id, sq.course_id, e.order_index