SELECT 
	co.id course_id,
	COUNT(*)::int item_count
FROM public.course co 

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.course_item_view civ
ON civ.course_version_id = cv.id 
	AND civ.item_type != 'pretest'

GROUP BY
	co.id
	
ORDER BY
	co.id