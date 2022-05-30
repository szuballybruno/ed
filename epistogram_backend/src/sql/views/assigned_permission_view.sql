WITH 
-- role_inherited_permissions AS
-- (
-- 	SELECT 
-- 		u.id assignee_user_id,
-- 		urv.role_id role_id,
-- 		rpb.permission_id,
-- 		urv.context_company_id
-- 	FROM public.user u 

-- 	INNER JOIN user_role_view urv
-- 	ON urv.assignee_user_id = u.id

-- 	INNER JOIN public.role_permission_bridge rpb
-- 	ON rpb.role_id = urv.role_id
-- ),
-- bridged_permissions AS 
-- (
-- 	SELECT 
-- 		pab.assignee_user_id,
-- 		NULL::int role_id,
-- 		pab.permission_id,
-- 		pab.context_company_id
-- 	FROM permission_assignment_bridge pab
	
-- 	WHERE pab.assignee_user_id IS NOT NULL
-- ),
all_assigned_permissions AS
(
	SELECT * FROM user_permission_view
)
SELECT 
	aap.*,
	ro.name role_name,
	co.name context_company_name,
	pe.code permission_code
FROM all_assigned_permissions aap

LEFT JOIN public.company co
ON co.id = aap.context_company_id

LEFT JOIN public.permission pe
ON pe.id = aap.permission_id

LEFT JOIN public.role ro 
ON ro.id = aap.role_id

ORDER BY
	aap.assignee_user_id,
	aap.context_company_id,
	aap.permission_id
