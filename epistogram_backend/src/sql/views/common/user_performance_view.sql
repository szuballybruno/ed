SELECT
    u.id user_id,
    upagv.course_id,

    -- all courses average in every row
    (
		SELECT
			(
				COALESCE(user_answer_totals.exam_correct_answer_rate * 2.5, 0) +
				COALESCE(user_answer_totals.video_correct_answer_rate * 1.5, 0) +
				COALESCE(user_answer_totals.practise_correct_answer_rate, 0)
			) / 5 total_performance_percentage
		FROM
			(
				SELECT
					SUM(exam_correct_answer_rate) exam_correct_answer_rate,
					SUM(video_correct_answer_rate) video_correct_answer_rate,
					SUM(practise_correct_answer_rate) practise_correct_answer_rate
				FROM user_performance_answer_group_view upagv2
				WHERE upagv2.user_id = u.id
				GROUP BY upagv2.user_id
			) user_answer_totals
	) total_performance_percentage,
    -- one course avg per row
    (
        COALESCE(upagv.exam_correct_answer_rate * 2.5, 0) +
        COALESCE(upagv.video_correct_answer_rate * 1.5, 0) +
        COALESCE(upagv.practise_correct_answer_rate, 0)
    ) / 5 performance_percentage
FROM public.user u

LEFT JOIN user_performance_answer_group_view upagv
ON upagv.user_id = u.id