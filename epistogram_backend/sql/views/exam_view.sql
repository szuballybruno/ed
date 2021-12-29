WITH 
successful_answer_sessions AS (
	SELECT * FROM public.answer_session_view asev
	WHERE asev.total_question_count = asev.correct_answer_count
		AND asev.is_completed
)
SELECT 
	u.id user_id,
	e.id exam_id,
	e.title title,
	e.subtitle subtitle,
	e.description description,
	e.thumbnail_url thumbnail_url,
	e.order_index order_index,
	e.is_final_exam is_final_exam,
	e.course_id course_id,
	e.module_id module_id,
	e.retake_limit retake_limit,
	(
		SELECT COUNT(1)::int
		FROM successful_answer_sessions sav
		WHERE sav.exam_id = e.id AND sav.user_id = u.id
	) successful_completion_count,
	(
		SELECT COUNT(1) < e.retake_limit OR e.retake_limit IS NULL
		FROM successful_answer_sessions sav
		WHERE sav.exam_id = e.id AND sav.user_id = u.id
	) can_retake
	-- (
	-- 	SELECT 
	-- 		erv.* 
	-- 	FROM
	-- 	(
	-- 		SELECT MAX(sav.answer_session_id)
	-- 		FROM successful_answer_sessions sav
	-- 		WHERE sav.exam_id = e.id AND sav.user_id = u.id
	-- 	) sq
		
	-- 	LEFT JOIN public.exam_result_view erv
	-- 	ON erv.exam_id = e.id AND erv.user_id = u.id
		
	-- 	GROUP BY 
	-- ) asd
FROM public.exam e

CROSS JOIN public.user u

ORDER BY 
	u.id,
	e.id