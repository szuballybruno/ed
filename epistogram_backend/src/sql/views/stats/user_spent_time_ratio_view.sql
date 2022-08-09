SELECT
    u.id user_id,
    COALESCE(SUM(cstv.total_exam_session_elapsed_time)::int, 0) total_exam_session_elapsed_time,
    COALESCE(SUM(cstv.total_video_watch_elapsed_time)::int, 0) total_video_watch_elapsed_time,
    COALESCE(SUM(cstv.total_practise_question_elapsed_time)::int + SUM(cstv.total_video_question_elapsed_time)::int, 0) total_question_elapsed_time,
    COALESCE(SUM(usv.length_seconds)::int - SUM(cstv.total_spent_seconds)::int, 0) other_total_spent_seconds
FROM public.user u

LEFT JOIN public.course_spent_time_view cstv
ON u.id = cstv.user_id

LEFT JOIN user_session_view usv
ON cstv.user_id = usv.user_id

GROUP BY
    u.id