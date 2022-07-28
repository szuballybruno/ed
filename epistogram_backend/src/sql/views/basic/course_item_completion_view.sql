WITH 
latest_id AS 
(
    SELECT 
        MAX(cic.id) id,
        cic.user_id,
        cic.video_version_id,
        cic.exam_version_id
    FROM public.course_item_completion cic

    GROUP BY
        cic.user_id,
        cic.video_version_id,
        cic.exam_version_id
)
SELECT 
    latest_id.id id,
    cic.user_id,
    cic.video_version_id,
    cic.exam_version_id,
    cic.answer_session_id,
    cic.completion_date,
    cv.id course_version_id,
    cv.course_id
FROM latest_id

LEFT JOIN public.course_item_completion cic
ON cic.id = latest_id.id

LEFT JOIN public.video_version vv
ON vv.id = cic.video_version_id

LEFT JOIN public.exam_version ev
ON ev.id = cic.exam_version_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id 
OR mv.id = ev.module_version_id 

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id