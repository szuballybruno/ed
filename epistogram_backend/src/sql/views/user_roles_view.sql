SELECT 
	co.id context_company_id,
	ro.id role_id,
	ro.name role_name,
	u.id assignee_user_id
FROM public.role ro

LEFT JOIN public.company co
ON ro.scope = 'COMPANY' 
	AND (ro.company_id IS NULL OR ro.company_id = co.id) 

LEFT JOIN public.role_assignment_bridge rab
ON rab.role_id = ro.id
	AND rab.context_company_id = co.id
	AND rab.assignee_user_id IS NOT NULL

LEFT JOIN public.user u
ON u.id = rab.assignee_user_id
OR u.is_god = true

ORDER BY
	u.id,
	co.id,
	ro.id
	
	