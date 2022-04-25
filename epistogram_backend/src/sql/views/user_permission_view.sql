WITH 
company_inherited_roles AS 
(
	SELECT
		u.id user_id,
		r.id role_id,
		r.name role_name,
		u.company_id
	FROM public.user u

	LEFT JOIN public.role_assignment_bridge rab
		ON rab.company_id = u.company_id

	LEFT JOIN public.role r
		ON r.id = rab.role_id
	
	WHERE r.id IS NOT NULL
),
assigned_roled AS 
(
	SELECT 
		u.id user_id,
		rab.role_id,
		rab.company_id
	FROM public.user u

	LEFT JOIN public.role_assignment_bridge rab
		ON rab.user_id = u.id
	
	WHERE rab.role_id IS NOT NULL
),
god_roles AS (
	SELECT 
		u.id user_id,
		r.id role_id,
		co.id company_id
	FROM public.role r
	CROSS JOIN public.company co
	CROSS JOIN public.user u 
	WHERE u.is_god = true
)
SELECT 
	u.id user_id,
	roles.company_id,
-- 	roles.role_id,
	pe.id permission_id,
	pe.code permission_code
FROM public.user u

LEFT JOIN 
(
	-- roles assigned to user itself 
	SELECT ar.user_id, ar.role_id, ar.company_id
	FROM assigned_roled ar

	UNION

	-- roles inherited from user's company
	SELECT cir.user_id, cir.role_id, cir.company_id
	FROM company_inherited_roles cir

	UNION

	-- god roles only the best of us have
	SELECT gr.user_id, gr.role_id, gr.company_id
	FROM god_roles gr
) roles
ON roles.user_id = u.id

LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = roles.role_id

LEFT JOIN public.permission pe
ON pe.id = rpb.permission_id

WHERE pe.id IS NOT NULL

GROUP BY
	u.id,
	roles.company_id,
-- 	roles.role_id,
	pe.id

ORDER BY
	u.id,
	roles.company_id,
	pe.id
