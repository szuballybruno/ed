SELECT 
	acse.*,
	EXTRACT(EPOCH FROM (acse.end_date - acse.start_date))::int AS length_seconds 
FROM public.activity_session AS acse
