SELECT 
	sq.course_id,
	sq.course_version_id,
	sq.user_id
FROM
(
	SELECT 
		cipv.course_id,
		cipv.course_version_id,
		cipv.user_id,
		COUNT(cipv.course_id) all_item_count,
		SUM(CASE WHEN cipv.item_state = 'completed' THEN 1 ELSE 0 END) completed_count
	FROM public.course_item_playlist_view cipv

	GROUP BY 
		cipv.course_id,
		cipv.user_id,
		cipv.course_version_id
) sq

WHERE sq.completed_count = sq.all_item_count