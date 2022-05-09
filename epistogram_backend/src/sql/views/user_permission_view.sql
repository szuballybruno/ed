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
	ON pe.scope = 'COMPANY'
	
	INNER JOIN public.user u
	ON u.is_god = true
	
	ORDER BY
		u.id,
		co.id,
		pe.id
),
permissions AS 
(
	SELECT 
		sq.user_id, 
		sq.context_company_id, 
		sq.permission_id,
		SUM(sq.is_inherited::int) = COUNT(true) is_inherited
	FROM 
	(
		-- permissions assigned to user 
		SELECT uap.user_id, uap.context_company_id, uap.permission_id, false is_inherited
		FROM user_assigned_permissions uap

		UNION

		-- permissions inherited from user's company
		SELECT u.id user_id, cpv.context_company_id, cpv.permission_id, true is_inherited
		FROM public.company_permission_view cpv
		INNER JOIN public.user u
		ON u.company_id = cpv.company_id

		UNION

		-- god permissions only the best of us can have
		SELECT ugp.user_id, ugp.context_company_id, ugp.permission_id, false is_inherited
		FROM user_god_permissions ugp
	) sq
	
	GROUP BY 
		sq.user_id, 
		sq.context_company_id, 
		sq.permission_id
	
	ORDER BY 
		sq.user_id, 
		sq.context_company_id,
		sq.permission_id
)
SELECT
	u.id user_id,
	co.id context_company_id,
	co.name context_company_name,
	pe.id permission_id,
	pe.code permission_code,
	pe.scope permission_scope
FROM public.user u

INNER JOIN permissions
ON permissions.user_id = u.id

INNER JOIN public.permission pe
ON pe.id = permissions.permission_id

LEFT JOIN public.company co
ON co.id = permissions.context_company_id

ORDER BY
	u.id,
	permissions.context_company_id,
	pe.id
