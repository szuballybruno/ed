SELECT 
	sq.user_id user_id,
	COUNT(sq.date)::int session_count
FROM 
(
	SELECT 
		usv.user_id,
		usv.start_date::date date
	FROM public.user_session_view usv
	
	WHERE usv.start_date::date = now()::date
) sq

GROUP BY 
	sq.user_id,
	sq.date
	
ORDER BY 
	sq.user_id
