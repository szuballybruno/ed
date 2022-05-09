SELECT
	co.id company_id,
	rab.context_company_id,
	rpb.permission_id permission_id
FROM public.company co

INNER JOIN public.role_assignment_bridge rab
	ON rab.company_id = co.id

LEFT JOIN public.role r
	ON r.id = rab.role_id

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = r.id

UNION 

SELECT
	co.id company_id,
	pab.context_company_id,
	pab.permission_id permission_id
FROM public.company co

INNER JOIN public.permission_assignment_bridge pab
	ON pab.company_id = co.id

ORDER BY 
	company_id,
	context_company_id,
	permission_id