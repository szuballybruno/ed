WITH 
user_assigned_permissions AS 
(
	SELECT 
		u.id user_id,
		pab.permission_id,
		pab.context_company_id
	FROM public.user u

	INNER JOIN public.permission_assignment_bridge pab
	ON pab.user_id = u.id
	
	UNION
	
	SELECT 
		u.id user_id,
		rpb.permission_id,
		rab.context_company_id
	FROM public.user u

	INNER JOIN public.role_assignment_bridge rab
	ON rab.user_id = u.id
	
	LEFT JOIN public.role_permission_bridge rpb
	ON rpb.role_id = rab.role_id
),
user_god_permissions AS (
	SELECT 
		u.id user_id,
		co.id context_company_id,
		pe.id permission_id
	FROM public.permission pe

	LEFT JOIN public.company co
	ON pe.is_global = false
	
	INNER JOIN public.user u
	ON u.is_god = true
	
	ORDER BY
		u.id,
		co.id,
		pe.id
)
SELECT
	u.id user_id,
	co.id context_company_id,
	co.name context_company_name,
	pe.id permission_id,
	pe.code permission_code,
	pe.is_global permission_is_global
FROM public.user u

LEFT JOIN 
(
	-- permissions assigned to user 
	SELECT uap.user_id, uap.permission_id, NULL company_id, uap.context_company_id
	FROM user_assigned_permissions uap

	UNION

	-- permissions inherited from user's company
	SELECT NULL user_id, cpv.permission_id, cpv.company_id, cpv.context_company_id
	FROM public.company_permission_view cpv

	UNION

	-- god permissions only the best of us can have
	SELECT ugp.user_id, ugp.permission_id, NULL company_id, ugp.context_company_id
	FROM user_god_permissions ugp
) permissions
ON permissions.user_id = u.id 
	OR permissions.company_id = u.company_id

INNER JOIN public.permission pe
ON pe.id = permissions.permission_id

LEFT JOIN public.company co
ON co.id = permissions.context_company_id

ORDER BY
	u.id,
	permissions.context_company_id,
	pe.id
