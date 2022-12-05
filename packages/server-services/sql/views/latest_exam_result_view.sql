SELECT
    erv.*
FROM public.latest_answer_session_view lasv

INNER JOIN public.exam_result_view erv
ON erv.answer_session_id = lasv.answer_session_id