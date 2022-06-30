SELECT 
    u.id user_id,
    
    -- completed video count in the last 30 days
    (
        SELECT 
            COUNT(uvpb.completion_date)::int
        FROM public.user_video_progress_bridge uvpb
        WHERE uvpb.user_id = u.id
        AND uvpb.completion_date > CURRENT_DATE - 30 
    ) completed_videos_last_month,
    
    -- total watch time in the last 30 days
    (
        SELECT 
            SUM (vpsv.total_playback_duration)::double precision
        FROM public.video_playback_sample_view vpsv
        WHERE vpsv.user_id = u.id 
        AND vpsv.creation_date > CURRENT_DATE - 30 
    ) playback_time_last_month,
    
    -- total given answer count
    SUM(asv.given_answer_count) total_given_answer_count,

    -- correct answer rate    
    AVG(asv.answer_session_success_rate) correct_answer_rate

FROM public.user u

LEFT JOIN public.answer_session_view asv
ON asv.user_id = u.id

LEFT JOIN public.exam_version ev
ON ev.id = asv.exam_version_id

LEFT JOIN public.exam ex
ON ex.id = ev.exam_id

WHERE ex.is_signup IS NOT TRUE
AND ex.is_pretest IS NOT TRUE

GROUP BY u.id