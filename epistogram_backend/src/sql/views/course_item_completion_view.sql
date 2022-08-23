SELECT
    cic.id course_item_completion_id,
    cic.user_id,
    cic.video_version_id,
    vv.video_id,
    cic.exam_version_id,
    ev.exam_id,
    cic.answer_session_id,
    cic.completion_date,
    cv.id course_version_id,
    cv.course_id,
    ex.is_pretest
FROM public.course_item_completion cic

LEFT JOIN public.video_version vv
ON vv.id = cic.video_version_id

LEFT JOIN public.exam_version ev
ON ev.id = cic.exam_version_id

LEFT JOIN public.exam ex
ON ex.id = ev.exam_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id
OR mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id
