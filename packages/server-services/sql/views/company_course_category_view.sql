SELECT
	cc.name AS name,
    cc.id AS course_category_id,
    co.id AS company_id,
    ccab.company_id IS NOT NULL AS is_enabled
FROM public.course_category cc

CROSS JOIN public.company co

LEFT JOIN public.course_category_assignment_bridge ccab
ON ccab.course_category_id = cc.id
AND ccab.company_id = co.id

WHERE cc.parent_category_id IS NULL

ORDER BY cc.id, co.id