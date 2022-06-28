SELECT 
    u.id user_id,
    
    -- completed video count in the last 30 days
    (
        SELECT 
            COUNT(uvpb.completion_date)::int
        FROM public.user_video_progress_bridge uvpb
        WHERE uvpb.user_id = u.id
        AND uvpb.completion_date > CURRENT_DATE - 30 
    ) completed_video_count,
    
    -- total watch time in the last 30 days
    (
        SELECT 
            SUM (vpsv.total_playback_duration)::double precision
        FROM public.video_playback_sample_view vpsv
        WHERE vpsv.user_id = u.id 
        AND vpsv.creation_date > CURRENT_DATE - 30 
    ) total_video_playback_seconds,
    
    -- total given answer count
    SUM(asv.given_answer_count) total_given_answer_count,

    -- correct answer rate    
    SUM(asv.given_answer_count) / SUM(asv.correct_given_answer_count) correct_answer_rate

FROM public.user u

LEFT JOIN public.answer_session_view asv
ON asv.user_id = u.id

GROUP BY u.id