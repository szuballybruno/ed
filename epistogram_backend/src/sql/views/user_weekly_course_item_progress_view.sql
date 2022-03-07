SELECT 
	sq.user_id,
	sq.course_id,
	sq.completion_date_trunc completion_date,
	sq.completion_date_trunc = DATE_TRUNC('week', now()) is_current,
	SUM(sq.completed_item_count)::int completed_item_count
FROM 
(
	SELECT 
		udcipv.*,
		DATE_TRUNC('week', udcipv.completion_date) completion_date_trunc
	FROM user_daily_course_item_progress_view udcipv
) sq

GROUP BY
	sq.user_id,
	sq.course_id,
	sq.completion_date_trunc