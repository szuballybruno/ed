SELECT 
	co.id course_id,
	COUNT(civ.item_code)::int item_count
FROM public.course co 

LEFT JOIN public.course_item_view civ
ON civ.course_id = co.id 
	AND civ.item_type != 'pretest'

GROUP BY
	co.id
	
ORDER BY
	co.id