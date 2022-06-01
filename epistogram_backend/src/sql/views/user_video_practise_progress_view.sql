SELECT sq2.*,
       playback_duration / length_seconds * 100 watch_percentage
FROM
    (SELECT sq.user_id,
            sq.video_id,
            MIN(sq.creation_date) creation_date,
            SUM(sq.total_playback_duration) playback_duration,
            sq.length_seconds
     FROM

        -- squash
         (SELECT vpsv.user_id,
                 vpsv.video_id,
                 vpsv.creation_date,
                 MIN(from_seconds),
                 MAX(to_seconds),
                 v.length_seconds,
                 vpsv.total_playback_duration,
                 ROW_NUMBER() OVER (ORDER BY vpsv.creation_date) - ROW_NUMBER() OVER (PARTITION BY vpsv.video_id,
                                                                                                   vpsv.user_id
                                                                                      ORDER BY vpsv.creation_date) grp
          FROM video_playback_sample_view vpsv
          LEFT JOIN public.video v ON v.id = vpsv.video_id
          GROUP BY v.length_seconds,
                   vpsv.user_id,
                   vpsv.video_id,
                   vpsv.creation_date,
                   vpsv.total_playback_duration) sq
     GROUP BY sq.grp,
              sq.video_id,
              sq.user_id,
              sq.length_seconds) sq2