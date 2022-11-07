SELECT
    cicv.user_id,
    cicv.course_id,
    cicv.module_id,
    COUNT(*) completed_course_item_count
FROM public.course_item_completion_view cicv

GROUP BY cicv.user_id, cicv.course_id, cicv.module_id

ORDER BY cicv.user_id, cicv.course_id, cicv.module_id