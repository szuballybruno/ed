WITH
video_replays_cte AS
(
    SELECT
        uvppv.video_id,
        uvppv.user_id,
        GREATEST(COUNT(*) - 1, 0)::int video_repetition_count
    FROM public.user_video_practise_progress_view uvppv

    --WHERE uvppv.watch_percentage > 20
    
    GROUP BY
        uvppv.user_id,
        uvppv.video_id
),
summed_video_playbacks_cte AS
(
	SELECT
		uvpsv.user_id,
		uvpsv.video_id,
		SUM(uvpsv.total_playback_seconds) total_playback_seconds
	FROM public.user_video_playback_seconds_view uvpsv
	
	GROUP BY uvpsv.user_id, uvpsv.video_id
),
last_3_quiz_answer_avg_cte AS
(
    SELECT
        asv.user_id,
        vv.video_id, 
        AVG((ga.state = 'CORRECT')::int)::int average_correct_given_answer_count
    FROM public.given_answer ga

    LEFT JOIN public.answer_session_view asv
    ON asv.answer_session_id = ga.answer_session_id

    INNER JOIN public.video_version vv
    ON vv.id = asv.video_version_id
    
    GROUP BY
        vv.video_id, 
        asv.user_id
),
avg_reaction_time_cte AS
(
    SELECT
        uav.user_id,
        uav.video_id,
        AVG(uav.elapsed_seconds) avg_reaction_time
    FROM public.user_answer_view uav
    
    WHERE uav.elapsed_seconds IS NOT NULL 
    AND uav.video_id IS NOT NULL
    
    GROUP BY
        uav.user_id,
        uav.video_id
),
latest_playback_date_cte AS 
(
    SELECT
        uvppv.user_id,
        uvppv.video_id,
        MAX(uvppv.creation_date) latest_playback_date
    FROM public.user_video_practise_progress_view uvppv
    
    GROUP BY
        uvppv.user_id,
        uvppv.video_id
)
SELECT
    u.id user_id,
    vv.video_id,
    cv.course_id,
    vd.video_file_length_seconds length_seconds,
    vd.title video_title,
    
    -- How much time the user spent with the video
    svpc.total_playback_seconds total_spent_time_seconds,
    
    -- How many times the user replayed the video, 
    -- when the video is at least 20% watched
    vrc.video_repetition_count video_replays_count,
    
    -- Is the video currently recommended for retry
    -- (When the video quiz questions has less than 66 percent success rate, 
    -- then it is recommended to watch again)
    uprv.is_recommended_for_practise is_recommended_for_retry,

    -- The average of the last 3 video quiz answers
    l3qaac.average_correct_given_answer_count last_three_answer_average,

    -- The average reaction time for the video quiz questions
    artc.avg_reaction_time average_reaction_time,

    -- When was the last time the user watched the video
    lpdc.latest_playback_date last_watch_time
    
FROM public.latest_course_version_view lcvv 

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.video_version vv
ON vv.module_version_id = mv.id

INNER JOIN summed_video_playbacks_cte svpc
ON vv.video_id = svpc.video_id

LEFT JOIN public.user u
ON u.id = svpc.user_id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN video_replays_cte vrc
ON vrc.user_id = u.id
AND vrc.video_id = vv.video_id

LEFT JOIN public.user_practise_recommendation_view uprv
ON uprv.video_version_id = vv.id
AND uprv.user_id = u.id

LEFT JOIN last_3_quiz_answer_avg_cte l3qaac
ON l3qaac.video_id = vv.video_id
AND l3qaac.user_id = u.id

LEFT JOIN avg_reaction_time_cte artc
ON artc.video_id = vv.video_id
AND artc.user_id = u.id

LEFT JOIN latest_playback_date_cte lpdc
ON lpdc.video_id = vv.video_id
AND lpdc.user_id = u.id

ORDER BY u.id, vv.video_id