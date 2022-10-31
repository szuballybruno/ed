SELECT
    cicv.user_id,
    cicv.course_id,
    COUNT(*) completed_video_count
FROM public.course_item_completion_view cicv

WHERE cicv.video_version_id IS NOT NULL

GROUP BY cicv.user_id, cicv.course_id