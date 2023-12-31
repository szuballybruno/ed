
-- select permissions from the 
-- roles assinged to companies
SELECT
	co.id assignee_company_id,
	rab.context_company_id,
    NULL context_course_id,
	rpb.role_id,
	rpb.permission_id permission_id
FROM public.company co

INNER JOIN public.role_assignment_bridge rab
	ON rab.assignee_company_id = co.id

LEFT JOIN public.role r
	ON r.id = rab.role_id

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = r.id

UNION 

-- select permissions assigned to companies
SELECT
	co.id assignee_company_id,
	pab.context_company_id,
    pab.context_course_id,
	NULL::int role_id,
	pab.permission_id permission_id
FROM public.company co

INNER JOIN public.permission_assignment_bridge pab
	ON pab.assignee_company_id = co.id

ORDER BY 
	assignee_company_id,
	context_company_id,
	permission_id