SELECT 
    vpsv.user_id,
    vv.id video_id,
    SUM(vpsv.total_playback_duration) total_playback_seconds
FROM public.video_playback_sample_view vpsv

LEFT JOIN public.video_version vv
ON vv.id = vpsv.video_version_id

GROUP BY
    vpsv.user_id,
    vv.id
