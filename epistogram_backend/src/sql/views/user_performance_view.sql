SELECT
    u.id user_id,
    upagv.course_id,

    -- all courses average in every row
    /*(
		WITH user_answer_totals AS
		(
			SELECT
				SUM(upagv2.exam_correct_answer_rate) exam_correct_answer_rate,
				SUM(upagv2.video_correct_answer_rate) video_correct_answer_rate,
				SUM(upagv2.practise_correct_answer_rate) practise_correct_answer_rate
			FROM public.user_performance_answer_group_view upagv2
			WHERE upagv2.user_id = u.id
			GROUP BY upagv2.user_id
		)
		SELECT
			(
				COALESCE(uat.exam_correct_answer_rate * 2.5, 0) +
				COALESCE(uat.video_correct_answer_rate * 1.5, 0) +
				COALESCE(uat.practise_correct_answer_rate, 0)
			) / 5 total_performance_percentage
		FROM user_answer_totals uat
	) total_performance_percentage,*/
    -- one course avg per row
    (
        COALESCE(upagv.exam_correct_answer_rate * 2.5, 0) +
        COALESCE(upagv.video_correct_answer_rate * 1.5, 0) +
        COALESCE(upagv.practise_correct_answer_rate, 0)
    )::int / 5 performance_percentage
FROM public.user u

LEFT JOIN public.user_performance_answer_group_view upagv
ON upagv.user_id = u.id
