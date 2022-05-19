WITH 
roles AS 
(
	SELECT 
		upv.assignee_user_id, 
		r.id role_id
	FROM public.role r

	INNER JOIN public.user_permission_view upv
	ON (upv.context_company_id = r.company_id AND upv.permission_code = 'VIEW_CUSTOM_ROLES')
	OR (r.company_id IS NULL AND upv.permission_code = 'VIEW_PREDEFINED_ROLES')
)
SELECT 
	u.id user_id,
	u.email user_email,
	co.id owner_company_id,
	r.deletion_date IS NOT NULL is_deleted,
	r.id role_id,
	r.name role_name,
	co.name owner_name,
	pe.id permission_id,
	pe.code permission_code
FROM roles

LEFT JOIN public.user u
ON u.id = roles.assignee_user_id

LEFT JOIN public.role r
ON r.id = roles.role_id

LEFT JOIN public.company co
ON co.id = r.company_id

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = r.id

LEFT JOIN public.permission pe
ON pe.id = rpb.permission_id

ORDER BY
	u.id,
	co.id,
	r.id,
	pe.id
