WITH 
latest_answer_session_ids_per_exam_version_cte AS 
(
	SELECT 
		ase.user_id,
		cv.course_id,
		cv.id course_version_id,
		ev.id exam_version_id,
		MAX(ase.id) answer_session_id
	FROM public.answer_session ase
	
	INNER JOIN public.exam_version ev
	ON ev.id = ase.exam_version_id
	
	LEFT JOIN public.module_version mv	
	ON mv.id = ev.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	GROUP BY 
		ase.user_id,
		cv.course_id,
		cv.id,
		ev.id
)
SELECT 
	lasipevc.user_id,
	lasipevc.course_id,
	lasipevc.course_version_id,
	lasipevc.exam_version_id,
	asev.answered_question_count,
	asev.correct_given_answer_count,
	esv.exam_acquired_points,
	ed.is_final,
	ROUND((esv.exam_acquired_points::double precision / esv.exam_maximum_points * 100)::numeric, 1) success_rate
FROM latest_answer_session_ids_per_exam_version_cte lasipevc

INNER JOIN public.answer_session_view asev
ON asev.answer_session_id = lasipevc.answer_session_id

LEFT JOIN public.exam_version ev
ON ev.id = asev.exam_version_id

LEFT JOIN public.exam ex
ON ex.id = ev.exam_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.exam_score_view esv
ON esv.exam_version_id = ev.id

ORDER BY 
	lasipevc.user_id, 
	lasipevc.course_id, 
	ed.order_index