WITH session_view_max AS (
	SELECT
	usev.user_id,
	
	MAX(usa.creation_date) latest_activity_date
	FROM public.user_session_view usev
	
	LEFT JOIN public.user_session_activity usa
	ON usa.activity_session_id = usev.id

	GROUP BY usev.user_id
), 
user_total_session_length AS
(
	SELECT 
		usav.user_id,
		SUM(usav.length_seconds)::int total_session_length_seconds
	FROM public.user_session_view usav

	GROUP BY usav.user_id
)
SELECT
	u.id,
	u.email,
	usl.total_session_length_seconds * interval '1 sec' total_spent_seconds,
	svm.latest_activity_date
FROM public.user u

LEFT JOIN session_view_max svm
ON svm.user_id = u.id

LEFT JOIN user_total_session_length usl
ON usl.user_id = u.id

WHERE u.deletion_date IS NULL

ORDER BY svm.latest_activity_date DESC NULLS LAST