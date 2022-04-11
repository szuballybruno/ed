WITH 
successful_answer_sessions AS (
	SELECT * FROM public.answer_session_view asev
	WHERE asev.is_successful
)
SELECT 
	u.id user_id,
	e.id exam_id,
	e.deletion_date IS NOT NULL is_deleted,
	e.title title,
	e.subtitle subtitle,
	e.description description,
	e.thumbnail_url thumbnail_url,
	e.order_index order_index,
	e.type = 'final' is_final_exam,
	e.course_id course_id,
	e.module_id module_id,
	e.retake_limit retake_limit,
	(
		SELECT COUNT(1)::int
		FROM successful_answer_sessions sav
		WHERE sav.exam_id = e.id AND sav.user_id = u.id
	) successful_completion_count,
	(
		SELECT COUNT(1) <= e.retake_limit OR e.retake_limit IS NULL
		FROM successful_answer_sessions sav
		WHERE sav.exam_id = e.id AND sav.user_id = u.id
	) can_retake,
	lasv.correct_answer_count,
	lasv.total_question_count,
	lasv.correct_answer_rate,
	lasv.total_question_count IS NOT NULL is_completed_previously
FROM public.exam e

CROSS JOIN public.user u

LEFT JOIN
(
	SELECT asv.*
	FROM
	(
		SELECT sav.user_id, sav.exam_id, MAX(sav.answer_session_id) asid
		FROM public.answer_session_view sav
		WHERE sav.is_successful
		GROUP BY sav.exam_id, sav.user_id
		ORDER BY sav.user_id, sav.exam_id
	) sq

	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = sq.asid
) lasv
ON lasv.user_id = u.id AND lasv.exam_id = e.id

ORDER BY 
	u.id,
	e.id