WITH 
god_roles AS
(
	SELECT 
		u.id assignee_user_id,
		NULL::int assignment_bridge_id,
		co.id context_company_id,
		ro.id role_id,
		false is_inherited
	FROM public.company co
	
	LEFT JOIN public.role ro
	ON ro.is_custom = false OR ro.company_id = co.id
	
	INNER JOIN public.user u
	ON u.is_god
),
assigned_roles AS
(
	SELECT 
		u.id assignee_user_id,
		rab.id assignment_bridge_id,
		rab.context_company_id,
		rab.role_id,
		false is_inherited
	FROM public.user u
	
	INNER JOIN public.role_assignment_bridge rab
	ON rab.assignee_user_id = u.id
),
comp_inherited_roles AS 
(
	SELECT 
		u.id assignee_user_id,
		rab.id assignment_bridge_id,
		rab.context_company_id,
		rab.role_id,
		true is_inherited
	FROM public.user u
	
	INNER JOIN public.role_assignment_bridge rab
	ON rab.assignee_company_id = u.company_id
),
all_roles AS 
(
	SELECT * FROM god_roles
	UNION
	SELECT * FROM assigned_roles 
	UNION
	SELECT * FROM comp_inherited_roles
)
SELECT 
	all_roles.assignment_bridge_id,
	co.id context_company_id,
	co.name context_company_name,
	ro.id role_id,
	ro.name role_name,
	u.id assignee_user_id,
	all_roles.is_inherited,
	pe.id permission_id,
	pe.code permission_code
FROM all_roles

LEFT JOIN public.company co
ON co.id = all_roles.context_company_id 

LEFT JOIN public.role ro
ON ro.id = all_roles.role_id

LEFT JOIN public.user u
ON u.id = all_roles.assignee_user_id

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = all_roles.role_id 

LEFT JOIN public.permission pe 
ON pe.id = rpb.permission_id 

ORDER BY
	u.id,
	co.id,
	ro.id
	
	