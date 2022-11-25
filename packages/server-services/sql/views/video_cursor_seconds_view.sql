SELECT
    vv.id video_version_id,
    u.id user_id,
    CASE WHEN MAX(vps.to_seconds) IS NULL
        THEN 0
        ELSE MAX(vps.to_seconds)
    END to_seconds
FROM public.video_version vv

CROSS JOIN public.user u

LEFT JOIN public.video_playback_sample vps
ON vps.video_version_id = vv.id 
AND vps.user_id = u.id
AND vps.from_seconds < 1
    
GROUP BY 
    vv.id,
    u.id
	
ORDER BY 
    u.id,
	vv.id