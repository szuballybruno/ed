WITH 
successful_answer_sessions AS (
	SELECT 
		* 
	FROM public.answer_session_view asev
 
 	WHERE asev.is_successful
),
latest_answer_session_view AS (
	SELECT 
		sq.*,
		asv.correct_given_answer_count correct_answer_count,
		asv.answered_question_count total_question_count,
		asv.answer_session_success_rate correct_answer_rate,
		asv.is_successful
	FROM
	(
		SELECT 
			asv.user_id, 
			ex.id exam_id, 
			MAX(asv.answer_session_id) asid
		FROM public.answer_session_view asv
		
		LEFT JOIN public.exam_version ev
		ON ev.id = asv.exam_version_id
		
		LEFT JOIN public.exam ex
		ON ex.id = ev.exam_id
		
		--WHERE asv.is_successful
		
		GROUP BY 
			ex.id, 
			asv.user_id
		
		ORDER BY asv.user_id, ex.id
	) sq

	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = sq.asid
)
SELECT 
	u.id user_id,
	ex.id exam_id,
	ev.id exam_version_id,
	false is_deleted,
	ex.is_pretest,
	ex.is_signup,
	ed.title title,
	ed.subtitle subtitle,
	ed.description description,
	ed.thumbnail_url thumbnail_url,
	ed.order_index order_index,
	ed.is_final is_final_exam,
	cv.course_id course_id,
	mv.module_id module_id,
	ed.retake_limit retake_limit,
	(
		SELECT 
			COUNT(1)::int
		FROM successful_answer_sessions sas
		WHERE sas.exam_version_id = ev.id AND sas.user_id = u.id
	) successful_completion_count,
	(
		SELECT 
			COUNT(1) <= ed.retake_limit OR ed.retake_limit IS NULL
		FROM successful_answer_sessions sas
		WHERE sas.exam_version_id = ev.id 
		AND sas.user_id = u.id
	) can_retake,
	lasv.asid,
	lasv.correct_answer_count,
	lasv.total_question_count,
	lasv.correct_answer_rate,
	lasv.total_question_count IS NOT NULL is_completed_previously
FROM public.exam ex

LEFT JOIN public.exam_version ev
ON ex.id = ev.exam_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

CROSS JOIN public.user u

LEFT JOIN latest_answer_session_view lasv
ON lasv.user_id = u.id AND lasv.exam_id = ex.id

ORDER BY 
	u.id,
	ex.id