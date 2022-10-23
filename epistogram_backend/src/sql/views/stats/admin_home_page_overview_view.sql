WITH
latest_course_activity_cte AS
(
	SELECT 
		cic.user_id,
		cv.course_id,
		MAX(cic.completion_date) latest_course_item_completion_date
	FROM public.course_item_completion_view cic

	LEFT JOIN public.video_version vv
	ON vv.id = cic.video_version_id

	LEFT JOIN public.exam_version ev
	ON ev.id = cic.exam_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id
	OR mv.id = ev.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	GROUP BY cic.user_id, cv.course_id
),

is_final_exam_completed_cte AS 
(
    SELECT
        cv.course_id,
        cic.user_id,
        (COUNT(*) > 0) is_final_exam_completed
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
active_user_count_cte AS
(
	SELECT
		lcac.course_id,
		u.company_id,
		COUNT(*) active_user_count
	FROM latest_course_activity_cte lcac

	LEFT JOIN is_final_exam_completed_cte ifecc
	ON ifecc.user_id = lcac.user_id
	AND ifecc.course_id = lcac.course_id
	AND ifecc.is_final_exam_completed IS NOT TRUE
	
	LEFT JOIN public.user u
	ON u.id = lcac.user_id
	
	WHERE lcac.latest_course_item_completion_date > CURRENT_DATE - 14	
	
	GROUP BY lcac.course_id, u.company_id
),
suspended_user_count_cte AS
(
	SELECT
		lcac.course_id,
		u.company_id,
		COUNT(*) suspended_user_count
	FROM latest_course_activity_cte lcac

	LEFT JOIN is_final_exam_completed_cte ifecc
	ON ifecc.user_id = lcac.user_id
	AND ifecc.course_id = lcac.course_id
	AND ifecc.is_final_exam_completed IS NOT TRUE
	
	LEFT JOIN public.user u
	ON u.id = lcac.user_id
	
	WHERE lcac.latest_course_item_completion_date < CURRENT_DATE - 14	
	
	GROUP BY lcac.course_id, u.company_id
),
completed_user_count_cte AS
(
	SELECT
		lcac.course_id,
		u.company_id,
		COUNT(*) completed_user_count
	FROM latest_course_activity_cte lcac

	INNER JOIN is_final_exam_completed_cte ifecc
	ON ifecc.user_id = lcac.user_id
	AND ifecc.course_id = lcac.course_id
	AND ifecc.is_final_exam_completed IS TRUE
	
	LEFT JOIN public.user u
	ON u.id = lcac.user_id
		
	GROUP BY lcac.course_id, u.company_id
),
course_avg_performance_cte AS
(
	SELECT
		upv.course_id,
		u.company_id,
		AVG(upv.performance_percentage) avg_performance_percentage
	FROM public.user_performance_view upv
	
	LEFT JOIN public.user u
	ON u.id = upv.user_id
	
	WHERE upv.performance_percentage != 0
	
	GROUP BY upv.course_id, u.company_id
),
course_difficulty_count_cte AS
(
	SELECT
		cv.course_id,
		u.company_id,
		COUNT(*) difficult_videos_count
	FROM public.video_rating vr
	
	LEFT JOIN public.video_version vv
	ON vv.id = vr.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	LEFT JOIN public.user u
	ON vr.user_id = u.id
	
	WHERE vr.difficulty > 4
	
	GROUP BY cv.course_id, u.company_id
),
questions_to_be_answered_count_cte AS
(
	SELECT
		u.company_id,
		cv.course_id,
		COUNT(*) questions_to_be_answered_count
	FROM public.comment com
	
	LEFT JOIN public.user u
	ON com.user_id = u.id
	
	LEFT JOIN public.video_version vv
	ON vv.id = com.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id
	
	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE 
	com.id NOT IN 
	(
		SELECT
			comp.id
		FROM public.comment comp

		INNER JOIN public.comment comc
		ON comc.parent_comment_id = comp.id
	)
	AND com.parent_comment_id IS NULL
	
	GROUP BY u.company_id, cv.course_id
)

SELECT
	co.id course_id,
	comp.id company_id,
	COALESCE(aucc.active_user_count, 0) active_users_count,
	COALESCE(succ.suspended_user_count, 0) suspended_users_count,
	COALESCE(cucc.completed_user_count, 0) completed_users_count,
	capc.avg_performance_percentage avg_course_performance_percentage,
	COALESCE(cdcc.difficult_videos_count, 0) difficult_videos_count,
	COALESCE(qtbacc.questions_to_be_answered_count, 0) questions_waiting_to_be_answered
FROM public.course co

CROSS JOIN public.company comp

LEFT JOIN active_user_count_cte aucc
ON aucc.course_id = co.id
AND aucc.company_id = comp.id

LEFT JOIN suspended_user_count_cte succ
ON succ.course_id = co.id
AND succ.company_id = comp.id

LEFT JOIN completed_user_count_cte cucc
ON cucc.course_id = co.id
AND cucc.company_id = comp.id

LEFT JOIN course_avg_performance_cte capc
ON capc.course_id = co.id
AND capc.company_id = comp.id

LEFT JOIN course_difficulty_count_cte cdcc
ON cdcc.course_id = co.id
AND cdcc.company_id = comp.id

LEFT JOIN questions_to_be_answered_count_cte qtbacc
ON qtbacc.course_id = co.id
AND qtbacc.company_id = comp.id
