WITH 
assignable_role_ids AS 
(
	SELECT 
		u.id assigner_user_id,
		upv.context_company_id,
		ro.id role_id,
		ro.name role_name
	FROM public.user u
	
	LEFT JOIN public.user_permission_view upv
	ON upv.assignee_user_id = u.id
	AND (upv.permission_code = 'ASSIGN_PREDEFINED_ROLES' 
		OR upv.permission_code = 'ASSIGN_CUSTOM_ROLES')
	
	INNER JOIN public.role ro
	ON (ro.is_custom = false AND upv.permission_code = 'ASSIGN_PREDEFINED_ROLES') 
	OR (ro.company_id = upv.context_company_id AND upv.permission_code = 'ASSIGN_CUSTOM_ROLES') 
	
	ORDER BY 
		u.id,
		upv.context_company_id,
		ro.id
),
roles AS
(
	SELECT 
		assigner_u.id assigner_user_id,
		assignee_u.id assignee_user_id,
		co.id context_company_id,
		co.name context_company_name,
		ro.id role_id,
		ro.name role_name,
		CASE WHEN ro.is_custom THEN co.name ELSE NULL END owner_company_name,
		urv.role_id IS NOT NULL is_assigned,
		CASE WHEN assignee_u.is_god THEN false ELSE ari.role_id IS NOT NULL END can_assign 
	FROM public.user assigner_u
	
	CROSS JOIN public.user assignee_u
	
	CROSS JOIN public.company co

	LEFT JOIN public.role ro
	ON ro.is_custom = false OR ro.company_id = co.id
	
	LEFT JOIN public.user_roles_view urv
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
),
perm_join AS 
(
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
)
SELECT * FROM perm_join
-- SELECT * FROM assignable_role_ids

-- WHERE assigner_user_id = 1 AND context_company_id = 2 AND assignee_user_id = 2


