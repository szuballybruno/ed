SELECT
	mo.*,
	sq.item_count item_count
FROM 
(
	SELECT 
		mo.id module_id,
		COUNT(civ.video_id)::int + COUNT(civ.exam_id) item_count
	FROM public.module mo

	LEFT JOIN public.course_item_view civ
	ON civ.module_id = mo.id

	GROUP BY
		mo.id

	ORDER BY
		mo.id
) sq

LEFT JOIN public.module mo
ON mo.id = sq.module_id