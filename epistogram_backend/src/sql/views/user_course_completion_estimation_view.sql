SELECT 
	sq5.*,
	sq5.item_count / sq5.estimated_length_in_weeks recommended_items_per_week
FROM 
(
	SELECT 
		sq4.*,
		CEIL(sq4.item_count / sq4.estimated_length_in_days::double precision)::int recommended_items_per_day,
		CASE WHEN sq4.estimated_length_in_days < 7
			THEN 1
			ELSE ROUND(sq4.estimated_length_in_days / 7::double precision)::int 
		END estimated_length_in_weeks
	FROM 
	(
		SELECT 
			sq3.*,
			sq3.estimated_completion_date::date - sq3.start_date::date estimated_length_in_days,
			cicv.item_count
		FROM 
		(
			SELECT 
				sq2.*,
				DATE_TRUNC('days', ucb.creation_date) start_date,
				DATE_TRUNC('days', ucb.creation_date) + (INTERVAL '1' day * CEIL(sq2.original_completion_days_estimation)) estimated_completion_date 
			FROM
			(
				SELECT 
					sq.*,
					sq.course_length_seconds / sq.estimated_seconds_per_day original_completion_days_estimation
				FROM 
				(
					SELECT 
						u.id user_id,
						co.id course_id,
						det.total_video_sum_length_seconds * 1.15 course_length_seconds,
						ucetf.estimated_seconds_per_week / 7 estimated_seconds_per_day,
						ucetf.estimated_seconds_per_week
					FROM public.course co

					CROSS JOIN public.user u 

					LEFT JOIN public.course_details_view det
					ON det.course_id = co.id AND det.user_id = u.id

					LEFT JOIN public.user_course_schedule_previsioned_view ucetf
					ON ucetf.user_id = u.id AND ucetf.course_id = co.id

					ORDER BY
						u.id,
						co.id
				) sq
			) sq2

			LEFT JOIN public.user_course_bridge ucb
			ON ucb.user_id = sq2.user_id AND ucb.course_id = sq2.course_id
		) sq3

		LEFT JOIN public.course_item_count_view cicv
		ON cicv.course_id = sq3.course_id
	) sq4
) sq5