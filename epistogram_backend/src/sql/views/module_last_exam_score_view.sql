
-- Returns the latest score of every modules 
-- last exam for every user.

SELECT 
    asv.user_id,
    asv.answer_session_success_rate exam_score,
    mlev.module_id,
    mlev.course_id
FROM public.module_last_exam_view mlev

INNER JOIN public.latest_answer_session_view lasv
ON lasv.exam_version_id = mlev.exam_version_id

LEFT JOIN public.answer_session_view asv
ON asv.answer_session_id = lasv.answer_session_id