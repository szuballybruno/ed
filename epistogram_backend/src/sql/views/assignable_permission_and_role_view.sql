WITH 
permissions AS 
(
	SELECT 
		upv.user_id,
		upv.context_company_id,
		pe.id permission_id,
		pe.code permission_code
	FROM public.permission pe
	
	INNER JOIN user_permission_view upv
	ON (upv.permission_code = 'ASSIGN_COMPANY_PERMISSIONS' AND pe.scope = 'COMPANY')
	OR (upv.permission_code = 'ASSIGN_GLOBAL_PERMISSIONS' AND pe.scope = 'GLOBAL')
	
	ORDER BY 
		upv.user_id,
		upv.context_company_id NULLS FIRST,
		pe.id
),
roles AS 
(
	SELECT 
		upv.user_id,
		co.id context_company_id,
		co.name context_company_name,
		r.id role_id,
		r.name role_name
	FROM public.role r
	
	CROSS JOIN public.company co
	
	INNER JOIN user_permission_view upv
	ON (upv.permission_code = 'ASSIGN_GLOBAL_ROLES' 
		AND r.scope = 'GLOBAL' 
		AND upv.context_company_id = co.id)
	OR (upv.permission_code = 'ASSIGN_COMPANY_ROLES' 
		AND r.scope = 'COMPANY' 
		AND upv.context_company_id = co.id
	   	AND r.company_id = co.id)
	
	ORDER BY 
		upv.user_id,
		co.id NULLS FIRST,
		r.id
)
SELECT user_id, context_company_id, permission_id, permission_code, null role_id, null role_name FROM permissions
UNION 
SELECT user_id, context_company_id, NULL permission_id, null permission_code, role_id, role_name FROM roles

ORDER BY
	user_id,
	context_company_id,
	permission_id,
	role_id

-- SELECT * FROM user_permission_view upv WHERE upv.permission_code = 'ASSIGN_GLOBAL_ROLES'

