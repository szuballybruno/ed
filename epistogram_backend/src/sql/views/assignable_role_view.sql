WITH 
user_roles_view AS 
(
	SELECT 
		u.id assignee_user_id,
		rab.role_id,
		rab.context_company_id
	FROM public.user u
	
	INNER JOIN public.role_assignment_bridge rab
	ON rab.assignee_user_id = u.id 
),
assignable_role_ids AS 
(
	SELECT 
		u.id assigner_user_id,
		co.id context_company_id,
		ro.id role_id,
		ro.name role_name,
		ro.scope role_scope
	FROM public.user u
	
	CROSS JOIN public.company co
	
	INNER JOIN public.user_permission_view upv
	ON upv.assignee_user_id = u.id
	AND upv.context_company_id = co.id
	AND (upv.permission_code = 'ASSIGN_GLOBAL_ROLES' 
		OR upv.permission_code = 'ASSIGN_COMPANY_ROLES')
	
	INNER JOIN public.role ro
	ON (ro.scope = 'USER' AND upv.permission_code = 'ASSIGN_GLOBAL_ROLES') 
		OR (ro.scope = 'COMPANY' AND upv.permission_code = 'ASSIGN_COMPANY_ROLES' AND ro.company_id = co.id)
	
	ORDER BY 
		u.id,
		co.id,
		ro.id
),
roles AS
(
	SELECT 
		assigner_u.id assigner_user_id,
		assignee_u.id assignee_user_id,
		co.id context_company_id,
		ro.id role_id,
		ro.name role_name,
		ro.scope role_scope,
		urv.role_id IS NOT NULL is_assigned,
		ari.role_id IS NOT NULL can_assign 
	FROM public.user assigner_u
	
	CROSS JOIN public.user assignee_u
	
	CROSS JOIN public.company co

	LEFT JOIN public.role ro
	ON ro.company_id IS NULL OR ro.company_id = co.id
	
	LEFT JOIN user_roles_view urv
	ON urv.assignee_user_id = assignee_u.id
	AND urv.role_id = ro.id 
	AND (urv.context_company_id IS NULL OR urv.context_company_id = co.id) 
	
	LEFT JOIN assignable_role_ids ari
	ON ari.assigner_user_id = assigner_u.id
		AND ari.role_id = ro.id
		AND ari.context_company_id = co.id
	
	ORDER BY 
		assigner_user_id,
		assignee_user_id,
		context_company_id,
		role_id
)
SELECT 
	ro.*,
	rpb.permission_id
FROM roles ro

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = ro.role_id

ORDER BY 
	ro.assigner_user_id,
	ro.assignee_user_id,
	ro.context_company_id,
	ro.role_id,
	rpb.permission_id

-- WHERE assigner_user_id = 1 AND context_company_id = 2 AND assignee_user_id = 2


