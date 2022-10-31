SELECT
    cicv.user_id,
    cicv.course_id,
    COUNT(*) completed_exam_count
FROM public.course_item_completion_view cicv

WHERE cicv.exam_version_id IS NOT NULL

GROUP BY cicv.user_id, cicv.course_id