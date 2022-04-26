SELECT 
	u.id user_id,
	co.*
FROM company co 

CROSS JOIN public.user u

INNER JOIN public.user_permission_view upv
ON upv.company_id = co.id 
	AND upv.user_id = u.id 
	AND upv.permission_code = 'MANAGE_COMPANY'