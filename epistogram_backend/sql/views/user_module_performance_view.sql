
-- This view returns the performance per user per module
-- calculated from different answers.
-- Later it could replace the user_performance_view.

SELECT
    u.id user_id,
    upagv.course_id,
	upagv.module_id,
	
    -- one module avg per row
    (
        COALESCE(upagv.exam_correct_answer_rate * 2.5, 0) +
        COALESCE(upagv.video_correct_answer_rate * 1.5, 0) +
        COALESCE(upagv.practise_correct_answer_rate, 0)
    )::double precision / 5 performance_percentage
FROM public.user u

LEFT JOIN public.user_module_performance_answer_group_view upagv
ON upagv.user_id = u.id
