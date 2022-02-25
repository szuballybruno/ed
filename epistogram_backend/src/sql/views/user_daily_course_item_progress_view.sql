SELECT 
	sq2.*,
	sq2.completed_item_count * (100 / cicv.item_count::int) completed_percentage,
	sq2.completion_date::date - uccev.start_date::date offset_days_from_start
FROM 
(
	SELECT 
		sq.user_id,
		sq.course_id,
		sq.completion_date,
		COUNT(sq.completion_date)::int completed_item_count
	FROM 
	(
		SELECT 
			itms.user_id,
			itms.course_id,
			DATE_TRUNC('day', itms.completion_date) completion_date
		FROM 
		(
			SELECT 
				uvpb.user_id,
				v.course_id,
				uvpb.completion_date
			FROM public.user_video_progress_bridge uvpb

			LEFT JOIN public.video v
			ON v.id = uvpb.video_id
			UNION ALL
			SELECT 
				uepb.user_id,
				e.course_id,
				uepb.completion_date
			FROM public.user_exam_progress_bridge uepb

			LEFT JOIN public.exam e
			ON e.id = uepb.exam_id 
		) itms

		WHERE itms.completion_date IS NOT NULL
	) sq

	GROUP BY 
		sq.user_id,
		sq.course_id,
		sq.completion_date
) sq2

LEFT JOIN public.user_course_completion_estimation_view uccev
ON uccev.course_id = sq2.course_id AND uccev.user_id = sq2.user_id

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = sq2.course_id