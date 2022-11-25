WITH
latest_exam_version_cte AS (
    SELECT
        ev.exam_id,
        MAX(ev.id) version_id
    FROM public.exam_version ev
    GROUP BY
        ev.exam_id
),
successful_answer_sessions AS (
	SELECT
		*
	FROM public.answer_session_view asev

 	WHERE asev.is_successful
),
latest_answer_session_data AS (
	SELECT
		lasv.user_id,
		lasv.exam_version_id,
		lasv.answer_session_id,
		asv.correct_given_answer_count correct_answer_count,
		asv.answered_question_count total_question_count,
		asv.answer_session_success_rate correct_answer_rate,
		asv.is_successful
	FROM public.latest_answer_session_view lasv

	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = lasv.answer_session_id
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
	lcvv.course_id course_id,
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
	lasd.answer_session_id,
	lasd.correct_answer_count,
	lasd.total_question_count,
	lasd.correct_answer_rate,
	lasd.total_question_count IS NOT NULL is_completed_previously
FROM public.exam ex

LEFT JOIN latest_exam_version_cte levc
ON levc.exam_id = ex.id

LEFT JOIN public.exam_version ev
ON ev.id = levc.version_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.version_id = mv.course_version_id

CROSS JOIN public.user u

LEFT JOIN latest_answer_session_data lasd
ON lasd.user_id = u.id
AND lasd.exam_version_id = levc.version_id

ORDER BY
	u.id,
	ex.id
