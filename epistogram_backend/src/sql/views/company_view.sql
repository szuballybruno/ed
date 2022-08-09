SELECT 
	u.id user_id,
	co.id company_id,
	co.deletion_date IS NOT NULL is_deleted,
	co.name company_name,
	upv.assignee_user_id IS NOT NULL can_manage
FROM company co 

CROSS JOIN public.user u

LEFT JOIN public.user_permission_view upv
ON upv.context_company_id = co.id 
	AND upv.assignee_user_id = u.id 
	AND upv.permission_code = 'MANAGE_COMPANY'