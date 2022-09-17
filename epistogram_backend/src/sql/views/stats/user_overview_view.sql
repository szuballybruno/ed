WITH user_performance_averages AS
(
	SELECT
		upv.user_id,
		AVG(upv.performance_percentage::int)::int average_performance_percentage
	FROM public.user_performance_view upv

	WHERE upv.performance_percentage IS NOT NULL
	AND upv.performance_percentage != 0
	
	GROUP BY upv.user_id

), 
total_user_sessions AS
(	
	SELECT 
		usav.user_id,
		SUM(usav.length_seconds)::int total_session_length_seconds
	FROM public.user_session_view usav

	GROUP BY usav.user_id
),
completed_course_items AS
(
	SELECT
		cic.user_id,
		COUNT(*)::int completed_course_item_count
	FROM public.course_item_completion cic

	GROUP BY cic.user_id
)

SELECT 
	u.id user_id,
	u.first_name,
	u.last_name,
	u.company_id,
	u.email user_email,
	u.creation_date signup_date,
	sf.file_path avatar_file_path,
	upa.average_performance_percentage,
	tus.total_session_length_seconds,
	cci.completed_course_item_count,
	uev.engagement_points
FROM public.user u

LEFT JOIN public.storage_file sf
ON sf.id = u.avatar_file_id

LEFT JOIN user_performance_averages upa
ON upa.user_id = u.id

LEFT JOIN total_user_sessions tus
ON tus.user_id = u.id

LEFT JOIN completed_course_items cci
ON cci.user_id = u.id

LEFT JOIN public.user_engagement_view uev
ON uev.user_id = u.id
