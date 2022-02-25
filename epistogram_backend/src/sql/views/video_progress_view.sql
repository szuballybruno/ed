SELECT
    v.id video_id,
    u.id user_id,
    CASE WHEN MAX(vps.to_seconds) IS NULL
        THEN 0
        ELSE MAX(vps.to_seconds)
    END to_seconds
FROM public.video v

LEFT JOIN public.user u
ON 1 = 1 

LEFT JOIN public.video_playback_sample vps
ON vps.video_id = v.id 
	AND vps.user_id = u.id
    AND vps.from_seconds < 1
    
GROUP BY 
    v.id,
    u.id
	
ORDER BY 
    u.id,
	v.id