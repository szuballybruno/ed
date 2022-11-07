SELECT 
	u.id user_id,
	co.id company_id,
	co.name company_name,
	upv.assignee_user_id IS NOT NULL can_assign
FROM public.company co

CROSS JOIN public.user u

LEFT JOIN public.user_permission_view upv
ON upv.context_company_id = co.id
AND upv.assignee_user_id = u.id
AND upv.permission_code = 'ASSIGN_ROLES_TO_COMPANY'

ORDER BY
	u.id,
	co.id