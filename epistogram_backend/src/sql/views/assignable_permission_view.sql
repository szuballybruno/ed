-- Assignable permission view for a user in a company
-- ther's intentionally no context_course_id present since we 
-- are assigning course level permissions in a course level admin page as well.

WITH 
permissions AS 
(
	SELECT 
		upv.assignee_user_id,
		upv.context_company_id,
		pe.id permission_id,
		pe.code permission_code,
		pe.scope permission_scope
	FROM public.permission pe
	
	INNER JOIN user_permission_view upv
	ON (upv.permission_code = 'ASSIGN_COMPANY_PERMISSIONS' AND pe.scope = 'COMPANY')
	OR (upv.permission_code = 'ASSIGN_GLOBAL_PERMISSIONS' AND pe.scope = 'USER')
	OR (upv.permission_code = 'ASSIGN_COURSE_PERMISSIONS' AND pe.scope = 'COURSE')
)
SELECT * FROM permissions

ORDER BY
	assignee_user_id,
	permission_scope,
	context_company_id,
	permission_id	