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
max_score_answer_session AS
(
    SELECT
    asv.user_id,
    asv.exam_version_id,
    asv.answer_session_id,
    MAX(asv.answer_session_success_rate)
    FROM public.answer_session_view asv

    WHERE asv.is_completed = true

    GROUP BY asv.user_id, asv.exam_version_id, asv.answer_session_id
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
	msas.answer_session_id,
	msas.answer_session_id IS NOT NULL is_completed_previously
FROM public.exam ex

LEFT JOIN public.exam_version ev
ON ex.id = ev.exam_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.version_id = mv.course_version_id

CROSS JOIN public.user u

LEFT JOIN max_score_answer_session msas
ON msas.user_id = u.id
AND msas.exam_version_id = ev.id

ORDER BY
	u.id,
	ex.id
