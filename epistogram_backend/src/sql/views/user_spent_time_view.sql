SELECT 
	sq.*,
	sq.total_spent_seconds / sq.elapsed_weeks_since_creation spent_seconds_per_week
FROM 
(
	SELECT 
		u.id user_id,
		co.id course_id,
		ucb.creation_date,
		now() - ucb.creation_date elapsed_interval_since_creation,
		CEIL(EXTRACT(EPOCH FROM now() - ucb.creation_date) / 604800) elapsed_weeks_since_creation,
		cstv.total_spent_seconds
	FROM public.user u
	CROSS JOIN public.course co

	LEFT JOIN public.course_spent_time_view cstv
	ON cstv.user_id = u.id AND cstv.course_id = co.id

	LEFT JOIN public.user_course_bridge ucb
	ON ucb.user_id = u.id AND ucb.course_id = co.id
) sq