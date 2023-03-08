SELECT
    cicv.user_id,
    cicv.course_id,
    COUNT(*)::int completed_course_item_count
FROM public.course_item_completion_view cicv

WHERE cicv.is_pretest IS NOT TRUE

GROUP BY cicv.user_id, cicv.course_id