SELECT
    video.id video_id,
    user.id user_id,
    CASE WHEN MAX(vps.to_seconds) IS NULL
        THEN 0
        ELSE MAX(vps.to_seconds)
    END to_seconds
FROM public.video

LEFT JOIN public.user user
ON 1 = 1 

LEFT JOIN public.video_playback_sample vps
ON vps.video_id = video.id
    AND vps.from_seconds < 1
    
GROUP BY 
    video.id,
    user.id
	
ORDER BY 
    user.id,
	video.id