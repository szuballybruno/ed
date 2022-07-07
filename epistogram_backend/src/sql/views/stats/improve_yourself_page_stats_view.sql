SELECT
    u.id user_id,

    -- time range with the most performance
    (
        SELECT
            (array_agg(mptrv.session_block ORDER BY mptrv.performance_percentage DESC))[1]
        FROM public.most_productive_time_range_view mptrv
        WHERE mptrv.user_id = u.id
    ) most_productive_time_range,

    -- day of the week with the most session time on avg
    (
		SELECT 
			udacv.day_of_the_week
		FROM public.user_daily_activity_chart_view udacv
		WHERE udacv.user_id = u.id
		AND udacv.total_session_length_seconds = 
			(
				SELECT 
					MAX(udacv2.total_session_length_seconds) 
				FROM public.user_daily_activity_chart_view udacv2
				WHERE udacv2.user_id = u.id
			)
    ) most_active_day
FROM public.user u