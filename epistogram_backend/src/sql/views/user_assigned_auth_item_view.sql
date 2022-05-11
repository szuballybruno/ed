SELECT * FROM 
(
	SELECT user_id, permission_id, null role_id, context_company_id, false is_role
	FROM permission_assignment_bridge
	UNION 
	SELECT user_id, null permission_id, role_id, context_company_id, true is_role
	FROM role_assignment_bridge
) sq

WHERE sq.user_id IS NOT NULL -- get user assigned only 