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
	OR (upv.permission_code = 'ASSIGN_GLOBAL_PERMISSIONS' AND pe.scope = 'USER')
	
	ORDER BY 
		upv.user_id,
		upv.context_company_id NULLS FIRST,
		pe.id
)
SELECT * FROM permissions

ORDER BY
	user_id,
	context_company_id,
	permission_id