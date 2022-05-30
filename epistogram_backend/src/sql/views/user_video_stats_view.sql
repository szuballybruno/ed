SELECT
    u.id user_id,
    cisv.video_id,
    cisv.course_id,
    v.length_seconds,
    v.title video_title,
    
    -- How much time the user spent with the video
    (
        SELECT
            SUM(uvppv.playback_duration)
        FROM public.user_video_practise_progress_view uvppv
        WHERE uvppv.user_id = u.id
        AND uvppv.video_id = cisv.video_id
    ) total_spent_time_seconds,
    
    -- How many times the user replayed the video, 
    -- when the video is at least 20% watched
    (
        SELECT
            CASE
                WHEN COUNT(*) - 1 > 0
                THEN COUNT(*) - 1
                ELSE 0
            END video_repetition_count
        FROM public.user_video_practise_progress_view uvppv
        WHERE uvppv.user_id = u.id
        AND uvppv.video_id = cisv.video_id
        AND uvppv.watch_percentage > 20
    ) video_replays_count,
    
    -- Is the video currently recommended for retry
    -- (When the video quiz questions has less than 66 percent success rate, 
    -- then it is recommended to watch again)
    (
        SELECT
            CASE
                WHEN COUNT(*) > 0
                THEN TRUE
                ELSE FALSE
            END
        FROM public.user_practise_recommendation_view uprv
        WHERE uprv.user_id = u.id
        AND uprv.video_id = cisv.video_id
        AND uprv.last_three_answer_average < 0.66
    ) is_recommended_for_retry,

    -- The average of the last 3 video quiz answers
    (
        SELECT
            AVG(uprv.last_three_answer_average)
        FROM public.user_practise_recommendation_view uprv
        WHERE uprv.user_id = u.id
        AND uprv.video_id = cisv.video_id
    ) last_three_answer_average,

    -- The average reaction time for the video quiz questions
    (
        SELECT
            AVG(uav.elapsed_seconds)
        FROM user_answer_view uav
        WHERE uav.elapsed_seconds IS NOT NULL
        AND uav.user_id = u.id
        AND uav.video_id = cisv.video_id
    ) average_reaction_time,

    -- When was the last time the user watched the video
    (
        SELECT
            MAX(uvppv.creation_date)
        FROM public.user_video_practise_progress_view uvppv
        WHERE uvppv.user_id = u.id
        AND uvppv.video_id = cisv.video_id
    ) last_watch_time
    
FROM public.user u

LEFT JOIN course_item_state_view cisv
ON cisv.user_id = u.id

LEFT JOIN public.video v
ON v.id = cisv.video_id

LEFT JOIN public.video_playback_sample_view vpsv
ON vpsv.video_id = v.id
AND vpsv.user_id = u.id

WHERE
    is_completed IS TRUE

GROUP BY
    u.id,
    cisv.video_id,
    cisv.course_id,
    v.length_seconds,
    v.title