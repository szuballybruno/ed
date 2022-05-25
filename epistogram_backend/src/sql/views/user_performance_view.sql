SELECT
    u.id user_id,
    upagv.course_id,
    (
        SELECT
            (
                COALESCE(user_answer_totals.correct_exam_answer_count::double precision / NULLIF(user_answer_totals.exam_answer_count, 0) * 100 * 2.5, 0) +
                COALESCE(user_answer_totals.correct_video_answer_count::double precision / NULLIF(user_answer_totals.video_answer_count, 0) * 100 * 1.5, 0) +
                COALESCE(user_answer_totals.correct_practise_answer_count, 0::double precision / NULLIF(user_answer_totals.practise_answer_count, 0) * 100, 0)
            ) / 5 total_performance_percentage
        FROM
            (
                SELECT
                    SUM(exam_answer_count) exam_answer_count,
                    SUM(video_answer_count) video_answer_count,
                    SUM(practise_answer_count) practise_answer_count,
                    SUM(correct_exam_answer_count) correct_exam_answer_count,
                    SUM(correct_video_answer_count) correct_video_answer_count,
                    SUM(correct_practise_answer_count) correct_practise_answer_count
                FROM user_performance_answer_group_view upagv2
                WHERE upagv2.user_id = u.id
                GROUP BY upagv2.user_id
            ) user_answer_totals
        ) total_performance_percentage,
    (
        COALESCE(upagv.correct_exam_answer_count::double precision / NULLIF(upagv.exam_answer_count, 0) * 100 * 2.5, 0) +
        COALESCE(upagv.correct_video_answer_count::double precision / NULLIF(upagv.video_answer_count, 0) * 100 * 1.5, 0) +
        COALESCE(upagv.correct_practise_answer_count, 0::double precision / NULLIF(upagv.practise_answer_count, 0) * 100, 0)
    ) / 5 performance_percentage
FROM public.user u

LEFT JOIN user_performance_answer_group_view upagv
ON upagv.user_id = u.id