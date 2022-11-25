SELECT 
    mv.module_id,
    COUNT(*)::int item_count
FROM public.latest_course_version_view lcvv

LEFT JOIN public.module_version mv
ON mv.course_version_id = lcvv.version_id

LEFT JOIN public.course_item_view civ
ON civ.module_id = mv.module_id
AND civ.item_type != 'pretest'

GROUP BY
    mv.module_id