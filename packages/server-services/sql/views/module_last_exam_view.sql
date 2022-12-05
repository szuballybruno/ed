
-- Returns the last exams of the latest modules.
-- Final exams and pretest are excluded.

SELECT
    cv.course_id,
    mv.module_id,
    ev.exam_id,
    ev.id exam_version_id,
    MAX(ed.order_index) item_order_index
FROM public.latest_course_version_view lcvv 

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.exam_version ev
ON ev.module_version_id = mv.id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

WHERE ed.order_index != 0
AND ed.is_final IS NOT TRUE

GROUP BY cv.course_id, mv.module_id, ev.exam_id, ev.id

ORDER BY cv.course_id, mv.module_id, ev.exam_id, ev.id