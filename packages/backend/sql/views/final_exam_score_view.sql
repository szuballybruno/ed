SELECT 
    lasv.user_id,
    lev.course_id,
    MAX(esv.exam_score) final_exam_score_percentage
FROM public.latest_answer_session_view lasv

INNER JOIN public.latest_exam_view lev
ON lev.exam_version_id = lasv.exam_version_id

INNER JOIN public.exam_version ev
ON ev.id = lev.exam_version_id 

INNER JOIN public.exam_data ed
ON ed.id = ev.exam_data_id
AND ed.is_final = true

LEFT JOIN public.exam_score_view esv
ON esv.exam_version_id = ev.id

GROUP BY lasv.user_id, lev.course_id
