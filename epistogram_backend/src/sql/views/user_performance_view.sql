SELECT
    u.id user_id,
    upagv.course_id,
	
    -- one course avg per row
    (
        COALESCE(upagv.exam_correct_answer_rate * 2.5, 0) +
        COALESCE(upagv.video_correct_answer_rate * 1.5, 0) +
        COALESCE(upagv.practise_correct_answer_rate, 0)
    )::int / 5 performance_percentage
FROM public.user u

LEFT JOIN public.user_performance_answer_group_view upagv
ON upagv.user_id = u.id
