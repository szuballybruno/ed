SELECT
	sq.*,
	CASE WHEN sq.is_company_owned 
		THEN sq.company_name 
		ELSE u.email 
	END owner_name
FROM
(
	SELECT 
		u.id user_id,
		u.email user_email,
		co.id company_id,
		co.name company_name,
		r.id role_id,
		r.name role_name,
		r.is_global,
		r.owner_user_id,
		r.owner_company_id IS NOT NULL is_company_owned,
		upv.permission_id IS NOT NULL is_company_role_manager
	FROM public.user u

	CROSS JOIN public.company co

	LEFT JOIN public.user_permission_view upv
	ON upv.user_id = u.id 
		AND upv.permission_code = 'VIEW_COMPANY_ROLES'
		AND upv.company_id = co.id

	LEFT JOIN public.role r
	ON r.owner_user_id = u.id
		OR (r.owner_company_id = co.id AND upv.permission_id IS NOT NULL)
		OR r.owner_company_id IS NULL AND u.is_god = true 

	WHERE r.id IS NOT NULL
	
	ORDER BY
		u.id,
		co.id
) sq

LEFT JOIN public.user u
ON u.id = sq.owner_user_id
