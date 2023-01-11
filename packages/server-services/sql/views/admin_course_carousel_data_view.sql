WITH 
permissions_flat AS 
(
	SELECT 
		upv.assignee_user_id user_id,
		upv.context_company_id company_id,
		SUM((upv.permission_code = 'EDIT_COMPANY')::int)::int::bool can_edit_company,
		SUM((upv.permission_code = 'DELETE_COMPANY')::int)::int::bool can_delete_company
	FROM public.user_permission_view upv
	GROUP BY 
		upv.assignee_user_id,
		upv.context_company_id
),
course_completion_count_cte AS 
(
	SELECT 
		ccv.course_id,
		u.company_id,
		COUNT(*)::int completion_count
	FROM public.course_completion_view ccv
	LEFT JOIN public.user u
	ON u.id = ccv.user_id 
	GROUP BY 
		ccv.course_id,
		u.company_id
),
course_active_user_count AS 
(
	SELECT
		sq.course_id,
		sq.company_id,
		SUM(CASE WHEN sq.is_completed THEN 0 ELSE 1 END)::int active_user_count
	FROM 
	(
		SELECT 
			ucb.user_id,
			ucb.course_id,
			u.company_id,
			ccv.user_id IS NOT NULL is_completed
		FROM public.user_course_bridge ucb
		
		LEFT JOIN public.course_completion_view ccv
		ON ccv.course_id = ucb.course_id
		
		LEFT JOIN public.user u 
		ON u.id = ucb.user_id
	) sq
	GROUP BY 
		sq.course_id,
		sq.company_id
)
SELECT 
	co.id course_id,
	cab.company_id,
	pf.user_id,
	cd.title course_title,
	coversf.file_path cover_file_path,
	COALESCE(cccc.completion_count, 0) course_completion_count,
	COALESCE(cauc.active_user_count, 0) active_user_count
FROM public.course co

INNER JOIN public.course_access_bridge cab
ON cab.course_id = co.id

LEFT JOIN public.company com
ON com.id = cab.company_id

INNER JOIN permissions_flat pf
ON pf.company_id = com.id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv 
ON cv.id = lcvv.version_id 

LEFT JOIN public.course_data cd 
ON cd.id = cv.course_data_id

LEFT JOIN public.storage_file coversf 
ON coversf.id = cd.cover_file_id

LEFT JOIN course_completion_count_cte cccc
ON cccc.company_id = com.id
AND cccc.course_id = co.id

LEFT JOIN course_active_user_count cauc
ON cauc.company_id = com.id
AND cauc.course_id = co.id

ORDER BY 
	pf.user_id,
	cab.company_id,
	co.id
