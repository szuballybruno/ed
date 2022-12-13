SELECT 
    ucb.user_id,
    ucb.course_id,
    cicv.item_count total_item_count,
    upav.estimated_minutes_per_day,
    CEIL(clev.total_length_seconds / 60.0) course_duration_minutes
FROM public.user_course_bridge ucb

LEFT JOIN public.user_prequiz_answers_view upav
ON upav.user_id = ucb.user_id 
AND upav.course_id = ucb.course_id

LEFT JOIN public.course_length_estimation_view clev
ON clev.course_id = ucb.course_id

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = ucb.course_id

ORDER BY
    ucb.user_id,
    ucb.course_id