WITH performance_last_month AS
(
 	SELECT
		ase.user_id,
		ROUND(AVG(upv.performance_percentage::int), 0) performance_last_month
	FROM public.activity_session ase

	LEFT JOIN public.user_session_activity AS usa
	ON usa.activity_session_id = ase.id

	LEFT JOIN public.video_version vv
	ON vv.id = usa.video_version_id

	LEFT JOIN public.exam_version ev
	ON ev.id = usa.exam_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id
	OR mv.id = ev.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	LEFT JOIN public.user_performance_view upv
	ON upv.course_id = cv.course_id
	AND upv.user_id = ase.user_id

	WHERE ase.start_date > CURRENT_DATE - 30
	AND upv.course_id IS NOT NULL

	GROUP BY ase.user_id
),
videos_to_be_repeated AS
(
	SELECT 
		uprv.user_id,
		COALESCE(SUM(is_recommended_for_practise::int), 0)::int videos_to_be_repeated_count
	FROM public.user_practise_recommendation_view uprv
	
	GROUP BY uprv.user_id
),
completed_videos_last_month AS
(
	SELECT 
		cicv.user_id,
		COUNT(*)::int completed_videos_last_month
	FROM public.course_item_completion_view cicv

	WHERE cicv.completion_date > CURRENT_DATE - 30 
	AND cicv.video_version_id IS NOT NULL
	AND cicv.is_pretest IS NOT TRUE
	
	GROUP BY cicv.user_id
)
SELECT 
    u.id user_id,

    -- videos to be repeated count
	vtbr.videos_to_be_repeated_count,
    
    -- completed video count in the last 30 days
    COALESCE(cvlm.completed_videos_last_month, 0) completed_videos_last_month,

    -- performance last month
    plm.performance_last_month
FROM public.user u

LEFT JOIN performance_last_month plm
ON plm.user_id = u.id

LEFT JOIN videos_to_be_repeated vtbr
ON vtbr.user_id = u.id

LEFT JOIN completed_videos_last_month cvlm
ON cvlm.user_id = u.id

ORDER BY u.id