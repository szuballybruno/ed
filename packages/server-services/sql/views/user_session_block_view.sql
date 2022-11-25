WITH
session_average AS
(
	SELECT
		usv.user_id user_id,
		(AVG(start_date::time) + AVG(end_date::time)) / 2 average_time_center
	FROM public.user_session_view usv
	GROUP BY usv.user_id
)

SELECT
	u.id user_id,
	CASE 
		WHEN sa.average_time_center >= '0:00:00.0'::time AND sa.average_time_center <= '3:00:00.0'::time
			THEN '0:00-3:00' 
		WHEN sa.average_time_center > '3:00:00.0'::time AND sa.average_time_center <= '6:00:00.0'::time
			THEN '3:00-6:00'
		WHEN sa.average_time_center > '6:00:00.0'::time AND sa.average_time_center <= '9:00:00.0'::time
			THEN '6:00-9:00'
		WHEN sa.average_time_center > '9:00:00.0'::time AND sa.average_time_center <= '12:00:00.0'::time
			THEN '9:00-12:00' 
		WHEN sa.average_time_center > '12:00:00.0'::time AND sa.average_time_center <= '15:00:00.0'::time
			THEN '12:00-15:00' 
		WHEN sa.average_time_center > '15:00:00.0'::time AND sa.average_time_center <= '18:00:00.0'::time
			THEN '15:00-18:00' 
		WHEN sa.average_time_center > '18:00:00.0'::time AND sa.average_time_center <= '21:00:00.0'::time
			THEN '18:00-21:00' 
		WHEN sa.average_time_center > '21:00:00.0'::time AND sa.average_time_center <= '24:00:00.0'::time
			THEN '21:00-0:00'
	END average_session_block
FROM public.user u

LEFT JOIN session_average sa
ON sa.user_id = u.id