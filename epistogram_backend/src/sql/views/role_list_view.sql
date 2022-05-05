WITH 
roles AS 
(
	SELECT upv.user_id, r.id role_id
	FROM public.role r

	INNER JOIN public.user_permission_view upv
	ON upv.context_company_id = r.owner_company_id
		AND upv.permission_code = 'VIEW_COMPANY_ROLES'

	UNION

	SELECT upv.user_id, r.id role_id
	FROM public.user_permission_view upv 

	INNER JOIN public.role r
	ON r.owner_user_id IS NULL 
		AND r.owner_company_id IS NULL

	WHERE upv.permission_code = 'VIEW_GLOBAL_ROLES'
)
SELECT 
	u.id user_id,
	u.email user_email,
	co.id owner_company_id,
	r.deletion_date IS NOT NULL is_deleted,
	r.owner_user_id,
	r.id role_id,
	r.name role_name,
	r.owner_company_id IS NOT NULL is_company_owned,
	CASE WHEN r.owner_company_id IS NOT NULL
		THEN co.name 
		ELSE u.email
	END owner_name,	
	pe.id permission_id,
	pe.code permission_code
FROM roles

LEFT JOIN public.user u
ON u.id = roles.user_id

LEFT JOIN public.role r
ON r.id = roles.role_id

LEFT JOIN public.company co
ON co.id = r.owner_company_id

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = r.id

LEFT JOIN public.permission pe
ON pe.id = rpb.permission_id

ORDER BY
	u.id,
	co.id,
	r.id,
	pe.id
