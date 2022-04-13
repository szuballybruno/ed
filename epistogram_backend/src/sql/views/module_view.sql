SELECT
	cm.*,
	sq.item_count item_count
FROM 
(
	SELECT 
		cm.id module_id,
		COUNT(civ.item_id)::int item_count
	FROM public.course_module cm

	LEFT JOIN public.course_item_view civ
	ON civ.module_id = cm.id

	GROUP BY
		cm.id

	ORDER BY
		cm.id
) sq

LEFT JOIN public.course_module cm
ON cm.id = sq.module_id