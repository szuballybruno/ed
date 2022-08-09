-- This view only provides data for the
-- learning insights page daily activity
-- chart

WITH generated_days_of_the_week AS
(
	SELECT generate_series(0, 6) day_of_the_week
),
generated_days_with_users AS
(
	SELECT
		u.id user_id,
		gdotw.day_of_the_week
	FROM generated_days_of_the_week gdotw
	
	CROSS JOIN public.user u
),
user_session_activity_groups AS
(
	SELECT 
		usv.user_id,
		EXTRACT(isodow FROM usv.start_date) day_of_the_week,
		SUM(usv.length_seconds) total_session_length_seconds
	FROM public.user_session_view usv
	
	GROUP BY usv.user_id, day_of_the_week
)

SELECT 
	gdwu.user_id,
	usag.total_session_length_seconds,
	gdwu.day_of_the_week
FROM generated_days_with_users gdwu

LEFT JOIN user_session_activity_groups usag
ON usag.day_of_the_week = gdwu.day_of_the_week
AND usag.user_id = gdwu.user_id

ORDER BY gdwu.day_of_the_week