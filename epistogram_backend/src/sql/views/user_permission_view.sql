WITH 
user_assigned_permissions AS 
(
	SELECT 
		u.id assignee_user_id,
		pab.context_company_id,
		pab.context_course_id,
		NULL::int role_id,
		pab.permission_id,
		pab.id assignment_bridge_id
	FROM public.user u

	INNER JOIN public.permission_assignment_bridge pab
	ON pab.assignee_user_id = u.id
),
role_inherited_permissions AS 
(
	SELECT
		u.id assignee_user_id,
		rab.context_company_id,
		NULL::int context_course_id,
		rpb.role_id,
		rpb.permission_id,
		NULL::int assignment_bridge_id
	FROM public.user u

	INNER JOIN public.role_assignment_bridge rab
	ON rab.assignee_user_id = u.id
	
	LEFT JOIN public.role_permission_bridge rpb
	ON rpb.role_id = rab.role_id
),
company_inherited_permissions AS 
(
	SELECT 
		u.id assignee_user_id, 
		cpv.context_company_id, 
		NULL::int context_course_id, 
		cpv.role_id,
		cpv.permission_id,
		NULL::int assignment_bridge_id
	FROM public.company_permission_view cpv
	
	INNER JOIN public.user u
	ON u.company_id = cpv.assignee_company_id
),
inherited_or_assigned_permissions AS 
(
	-- permissions assigned to user 
	SELECT uap.*
	FROM user_assigned_permissions uap

	UNION

	-- role inherited permissions 
	SELECT rip.*
	FROM role_inherited_permissions rip

	UNION

	-- permissions inherited from user's company
	SELECT cip.* 
	FROM company_inherited_permissions cip
),
watch_course_permissions AS 
(
	SELECT 
		u.id assignee_user_id,
		NULL::int context_company_id,
		cab.course_id context_course_id,
		NULL::int role_id,
		pe2.id permission_id,
		NULL::int assignment_bridge_id
	FROM public.user u
	
	INNER JOIN inherited_or_assigned_permissions ioap
	ON ioap.assignee_user_id = u.id 
	
	INNER JOIN public.permission pe 
	ON ioap.permission_id = pe.id
		AND pe.code = 'WATCH_COMPANY_COURSES'
	
	INNER JOIN public.course_access_bridge cab
	ON cab.company_id = ioap.context_company_id
	
	LEFT JOIN public.permission pe2 
	ON pe2.code = 'WATCH_COURSE'
),
user_god_permissions AS (
	SELECT 
		u.id assignee_user_id,
		co.id context_company_id,
		cour.id context_course_id,
		NULL::int role_id,
		pe.id permission_id,
		NULL::int assignment_bridge_id
	FROM public.permission pe

	LEFT JOIN public.company co
	ON pe.scope = 'COMPANY'
	
	LEFT JOIN public.course cour
	ON pe.scope = 'COURSE'
	
	INNER JOIN public.user u
	ON u.is_god = true
	
	ORDER BY
		u.id,
		co.id,
		cour.id,
		pe.id
),
all_permissions AS 
(
	-- permissions assigned to user 
	SELECT ioa.*
	FROM inherited_or_assigned_permissions ioa

	UNION

	-- god permissions only the best of us can have
	SELECT ugp.*
	FROM user_god_permissions ugp

	UNION

	-- watch course permissions 
	SELECT wcp.*
	FROM watch_course_permissions wcp
),
v AS 
(
	SELECT
		u.id assignee_user_id,
		co.id context_company_id,
		co.name context_company_name,
		cour.id context_course_id,
		cour.title context_course_name,
		pe.id permission_id,
		pe.code permission_code,
		pe.scope permission_scope,
		parent_ro.id parent_role_id,
		parent_ro.name parent_role_name,
		ap.assignment_bridge_id
	FROM public.user u

	INNER JOIN all_permissions ap
	ON ap.assignee_user_id = u.id

	INNER JOIN public.permission pe
	ON pe.id = ap.permission_id

	LEFT JOIN public.company co
	ON co.id = ap.context_company_id

	LEFT JOIN public.course cour
	ON cour.id = ap.context_course_id

	LEFT JOIN public.role parent_ro
	ON parent_ro.id = ap.role_id

	ORDER BY
		u.id,
		ap.context_company_id,
		ap.context_course_id,
		pe.id
)
SELECT * FROM v --inherited_or_assigned_permissions ioap
