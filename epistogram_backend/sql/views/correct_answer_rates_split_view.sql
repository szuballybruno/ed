SELECT
    u.id user_id,
    co.id course_id,
	mv.module_id module_id,
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

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.answer_session_group_view asgv
ON asgv.user_id = u.id
AND asgv.course_id = co.id
AND asgv.module_id = mv.module_id

ORDER BY u.id