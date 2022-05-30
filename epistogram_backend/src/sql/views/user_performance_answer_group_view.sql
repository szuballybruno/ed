-- different answer groups and average reaction time

SELECT
    ua.user_id user_id,
    ua.course_id course_id,
    COUNT(1) total_answer_count,
    SUM((ua.given_answer_type = 'video')::int) video_answer_count,
    SUM((ua.given_answer_type = 'practise')::int) practise_answer_count,
    SUM((ua.given_answer_type = 'exam')::int) exam_answer_count,
    SUM((ua.given_answer_type = 'video' AND ua.given_answer_is_correct)::int) correct_video_answer_count,
    SUM((ua.given_answer_type = 'practise' AND ua.given_answer_is_correct)::int) correct_practise_answer_count,
    SUM((ua.given_answer_type = 'exam' AND ua.given_answer_is_correct)::int) correct_exam_answer_count
FROM public.user_answer_view ua
WHERE
    ua.given_answer_type IS NOT NULL
GROUP BY
    ua.user_id,
    ua.course_id
