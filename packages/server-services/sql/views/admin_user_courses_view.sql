WITH
question_answer_cte AS
(
	SELECT
		asv.user_id,
		cv.course_id,
		SUM(asv.answered_question_count) answered_question_count,
        SUM(CASE WHEN asv.answer_session_type = 'practise'
            THEN asv.answered_question_count
            ELSE 0 END) practise_quesiton_answer_count,
        SUM(CASE WHEN asv.answer_session_type = 'video'
            THEN asv.answered_question_count
            ELSE 0 END) video_quesiton_answer_count
	FROM public.given_answer ga

	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id

	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	INNER JOIN public.course_version cv
	ON cv.id = mv.course_version_id

    GROUP BY
		asv.user_id,
		cv.course_id

	ORDER BY
		asv.user_id,
		cv.course_id
),
avg_performance_cte AS
(
    SELECT
        upv.course_id,
        AVG(upv.performance_percentage) avg_performance
    FROM public.user_performance_view upv
    WHERE upv.performance_percentage != 0
    GROUP BY
        upv.course_id
),
completed_video_count AS
(
	SELECT
		cicv.user_id,
		cicv.course_id,
		COUNT(cicv.video_version_id) completed_video_count
	FROM public.course_item_completion_view cicv

	GROUP BY cicv.user_id, cicv.course_id
),
is_final_exam_completed_cte AS 
(
    SELECT
        cv.course_id,
        cic.user_id,
        COUNT(*) > 0 is_final_exam_completed
    FROM public.course_item_completion_view cic

    LEFT JOIN public.exam_version ev
    ON ev.id = cic.exam_version_id

    LEFT JOIN public.exam_data ed
    ON ed.id = ev.exam_data_id

    LEFT JOIN public.module_version mv
    ON mv.id = ev.module_version_id

    LEFT JOIN public.course_version cv
    ON cv.id = mv.course_version_id

    WHERE ed.is_final IS TRUE
    
    GROUP BY 
        cv.course_id,
        cic.user_id
),
correct_answer_rate_cte AS 
(
    SELECT
        cqsv.course_id,
        cqsv.user_id,
        CASE WHEN cqsv.total_answer_count > 0
            THEN (cqsv.correct_answer_count::double precision / cqsv.total_answer_count * 100)::int
            ELSE 0
        END correct_answer_rate
    FROM public.course_questions_success_view cqsv
),
completed_exam_count_cte AS 
(
    SELECT
        cv.course_id,
        cic.user_id,
        COUNT(*)::int completed_exam_count
    FROM public.course_item_completion_view cic

    LEFT JOIN public.exam_version ev
    ON ev.id = cic.exam_version_id

    LEFT JOIN public.exam ex
    ON ex.id = ev.exam_id

    LEFT JOIN public.module_version mv
    ON mv.id = ev.module_version_id

    LEFT JOIN public.course_version cv
    ON cv.id = mv.course_version_id

    WHERE ex.is_pretest = false
    AND ex.is_signup = false
    
    GROUP BY
        cv.course_id,
        cic.user_id
),
recommended_videos_for_practise_cte AS
(
    SELECT
        cv.course_id,
        uprv.user_id,
        COUNT(uprv.total_given_answer_count)::int recommended_videos_for_practise_count
    FROM public.user_practise_recommendation_view uprv

    LEFT JOIN public.course_version cv
    ON cv.id = uprv.course_version_id
    
    LEFT JOIN public.course_state_view cosv
    ON cosv.course_id = cv.course_id
    AND cosv.user_id = uprv.user_id
    
    WHERE uprv.total_given_answer_count = 3
    AND uprv.is_recommended_for_practise IS true
    AND cosv.in_progress IS TRUE
    
    GROUP BY
        cv.course_id,
        uprv.user_id
) 
SELECT
    u.id user_id,
    co.id course_id,
    upev.assignee_user_id IS NOT NULL is_accessible,
    ucb.id IS NOT NULL is_assigned,
    cv.id course_version_id,
    cd.title,
    sf.file_path cover_file_path,
    cosv.start_date,
    ucpav.completed_percentage course_progress_percentage,
    cvc.completed_video_count,
    cstv.total_spent_seconds total_spent_seconds,
    COALESCE(qac.video_quesiton_answer_count, 0) answered_video_question_count,
    COALESCE(qac.practise_quesiton_answer_count, 0) answered_practise_question_count,
    tcdv.required_completion_date,
    tcdv.tempomat_adjustment_value,
    tcdv.tempomat_mode,
    tcdv.original_previsioned_completion_date,
    tcdv.total_item_count,
    tcdv.total_completed_item_count,
    upv.performance_percentage - apc.avg_performance difference_from_average_performance_percentage,
    upv.performance_percentage,
    apc.avg_performance,
    ifecc.is_final_exam_completed,
    carc.correct_answer_rate,
    cecc.completed_exam_count,
    rvfpc.recommended_videos_for_practise_count,
    ucb.stage_name != 'assigned' AND ucb.stage_name IS NOT null is_tempomat_ready
FROM public.user u

-- join all companies available 
-- for user's company
INNER JOIN public.course_access_bridge cab
ON cab.company_id = u.company_id

LEFT JOIN public.course co
ON co.id = cab.course_id

LEFT JOIN public.user_permission_view upev
ON upev.assignee_user_id = u.id
AND upev.context_course_id = co.id
AND upev.permission_code = 'WATCH_COURSE'

LEFT JOIN public.user_course_bridge ucb
ON ucb.course_id = co.id
AND ucb.user_id = u.id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.user_course_progress_actual_view ucpav
ON ucpav.user_id = u.id
AND ucpav.course_id = co.id

LEFT JOIN public.course_state_view cosv
ON cosv.course_id = co.id
AND cosv.user_id = u.id

LEFT JOIN public.course_spent_time_view cstv
ON cstv.user_id = u.id
AND cstv.course_id = co.id

LEFT JOIN public.tempomat_calculation_data_view tcdv
ON tcdv.user_id = u.id
AND tcdv.course_id = co.id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN question_answer_cte qac
ON qac.course_id = co.id
AND qac.user_id = u.id

LEFT JOIN public.user_performance_view upv
ON upv.user_id = u.id
AND upv.course_id = co.id

-- CTE joins

LEFT JOIN completed_video_count cvc
ON cvc.user_id = u.id
AND cvc.course_id = co.id

LEFT JOIN avg_performance_cte apc
ON apc.course_id = co.id

LEFT JOIN is_final_exam_completed_cte ifecc
ON ifecc.course_id = co.id 
AND ifecc.user_id = u.id 

LEFT JOIN correct_answer_rate_cte carc
ON carc.course_id = co.id
AND carc.user_id = u.id

LEFT JOIN completed_exam_count_cte cecc
ON cecc.course_id = co.id
AND cecc.user_id = u.id

LEFT JOIN recommended_videos_for_practise_cte rvfpc
ON rvfpc.course_id = co.id
AND rvfpc.user_id = u.id

ORDER BY
    u.id,
    ucb.id IS NULL,
    co.id
