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
     FROM public.course_item_completion cic
     GROUP BY cic.user_id
 ),
 engagement_points AS (
     SELECT
         uev.user_id,
         uev.engagement_points
     FROM public.user_engagement_view uev
 )

SELECT
    up.user_id,
    u.company_id,
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

WHERE u.company_id = 2
