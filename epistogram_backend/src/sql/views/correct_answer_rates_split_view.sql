SELECT
    u.id user_id,
    co.id course_id,
    asgv.start_date,
    CASE 
        WHEN asgv.answer_session_type = 'exam'
        THEN asgv.answer_session_success_rate
    END exam_correct_answer_rate,
    CASE 
        WHEN asgv.answer_session_type = 'practise'
        THEN asgv.answer_session_success_rate
    END practise_correct_answer_rate,
    CASE 
        WHEN asgv.answer_session_type = 'video'
        THEN asgv.answer_session_success_rate
    END video_correct_answer_rate
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN public.answer_session_group_view asgv
ON asgv.user_id = u.id
AND asgv.course_id = co.id

ORDER BY u.id