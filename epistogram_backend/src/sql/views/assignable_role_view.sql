WITH roles AS
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
SELECT 
	ro.*,
	pe.id permission_id
FROM roles ro

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = ro.role_id

LEFT JOIN public.permission pe
ON pe.id = rpb.permission_id