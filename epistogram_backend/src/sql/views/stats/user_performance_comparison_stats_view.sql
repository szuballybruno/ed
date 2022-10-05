WITH user_performances AS (
    SELECT
        u.id user_id,
        AVG(upv.performance_percentage) user_performance_average
    FROM public.user u

             LEFT JOIN public.user_performance_view upv
                       ON upv.user_id = u.id

    GROUP BY u.id
),
 watched_videos AS (
     SELECT
         cic.user_id,
         SUM((cic.video_version_id IS NOT NULL)::int) watched_videos_count
     FROM public.course_item_completion_view cic
     GROUP BY cic.user_id
 ),
 engagement_points AS (
     SELECT
         uev.user_id,
         uev.engagement_points
     FROM public.user_engagement_view uev
 ),
 required_or_started_courses AS (
    SELECT
        ucb.user_id,
        COUNT(*)::int::boolean is_any_course_required_or_started
    FROM user_course_bridge ucb

    WHERE ucb.start_date IS NOT NULL
    OR ucb.required_completion_date IS NOT NULL

    GROUP BY ucb.user_id
 )

SELECT
    up.user_id,
    u.company_id,
    u.creation_date,
    rosc.is_any_course_required_or_started,
    up.user_performance_average,
    COALESCE(ep.engagement_points, 0) engagement_points,
    COALESCE(wv.watched_videos_count, 0) watched_videos_count
FROM user_performances up

LEFT JOIN watched_videos wv
ON wv.user_id = up.user_id

LEFT JOIN engagement_points ep
ON ep.user_id = up.user_id

LEFT JOIN public.user u
ON u.id = up.user_id

LEFT JOIN required_or_started_courses rosc
ON rosc.user_id = up.user_id
