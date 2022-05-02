WITH 
roles AS 
(
	SELECT company_upv.user_id, r.id role_id, company_upv.context_company_id
	FROM public.user_permission_view company_upv

	INNER JOIN public.role r
	ON r.owner_company_id = company_upv.context_company_id

	WHERE company_upv.permission_code = 'VIEW_COMPANY_ROLES'

	UNION

	SELECT global_upv.user_id, r.id role_id, NULL context_company_id
	FROM public.user_permission_view global_upv 

	INNER JOIN public.role r
	ON r.owner_user_id IS NULL 
		AND r.owner_company_id IS NULL

	WHERE global_upv.permission_code = 'MANAGE_GLOBAL_ROLES'
)
SELECT
	sq.*,
	CASE WHEN sq.is_company_owned 
		THEN sq.context_company_name 
		ELSE u.email 
	END owner_name,
	pe.id permission_id,
	pe.code permission_code
FROM
(
	SELECT 
		u.id user_id,
		u.email user_email,
		context_co.id context_company_id,
		context_co.name context_company_name,
		r.id role_id,
		r.name role_name,
		r.owner_user_id,
		r.owner_company_id IS NOT NULL is_company_owned
	FROM roles
	
	LEFT JOIN public.user u
	ON u.id = roles.user_id
	
	LEFT JOIN public.company context_co
	ON context_co.id = roles.context_company_id
	
	LEFT JOIN public.role r
	ON r.id = roles.role_id
) sq
	
LEFT JOIN public.role_permission_bridge rpb
ON rpb.role_id = sq.role_id

LEFT JOIN public.permission pe
ON pe.id = rpb.permission_id

LEFT JOIN public.user u
ON u.id = sq.owner_user_id

ORDER BY
	sq.user_id,
	sq.context_company_id,
	sq.role_id,
	pe.id
