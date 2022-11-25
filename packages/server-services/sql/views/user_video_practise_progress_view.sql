SELECT 
    sq2.*,
    playback_duration / length_seconds * 100 watch_percentage
FROM
(
    SELECT 
		sq.user_id,
		sq.video_id,
		MIN(sq.creation_date) creation_date,
		SUM(sq.total_playback_duration) playback_duration,
		sq.length_seconds
    FROM

	-- squash
 
	(
		SELECT 
			vpsv.user_id,
			vv.video_id,
			vv.id video_version_id,
			vpsv.creation_date,
			MIN(from_seconds),
			MAX(to_seconds),
			vd.video_file_length_seconds length_seconds,
			vpsv.total_playback_duration,
			ROW_NUMBER() OVER 
			(
				ORDER BY vpsv.creation_date
			) - ROW_NUMBER() OVER 
			(
				PARTITION BY vv.video_id
				ORDER BY vpsv.creation_date
			) grp
			FROM public.video_playback_sample_view vpsv
		
		LEFT JOIN public.video_version vv 
		ON vv.id = vpsv.video_version_id
		
		LEFT JOIN public.video_data vd
		ON vd.id = vv.video_data_id
  		
		GROUP BY 
			vd.video_file_length_seconds,
			vpsv.user_id,
			vv.video_id,
			vv.id,
			vpsv.creation_date,
			vpsv.total_playback_duration
	) sq
    
    GROUP BY 
        sq.grp,
        sq.video_id,
        sq.user_id,
        sq.length_seconds
) sq2