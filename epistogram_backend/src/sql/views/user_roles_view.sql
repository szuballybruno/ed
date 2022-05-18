SELECT 
	u.id assignee_user_id,
	rab.role_id,
	rab.context_company_id
FROM public.user u

INNER JOIN public.role_assignment_bridge rab
ON rab.assignee_user_id = u.id 