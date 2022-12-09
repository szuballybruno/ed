WITH 
course_users_cte AS 
(
	SELECT 
		ccbv.company_id,
		co.id course_id,
		
		-- stats now
		COUNT(*)::int user_count_all,
		SUM((ucb.stage_name = 'finished')::int)::int user_count_completed,
		SUM((ucb.stage_name != 'finished')::int)::int user_count_current,
	
		-- stats 7 days ago
		SUM((ucb.creation_date < now() - interval '14 days')::int)::int user_count_all_prev
	FROM public.course co
	
	LEFT JOIN public.course_company_bridge_view ccbv
	ON ccbv.course_id = co.id
	
	LEFT JOIN public.user_course_bridge ucb
	ON ucb.course_id = co.id
	
	INNER JOIN public.user u
	ON u.id = ucb.user_id
	AND u.company_id = ccbv.company_id
	
	GROUP BY 
		ccbv.company_id,
		co.id
),
detailed_cte AS
(
	SELECT 
		lcvv.course_id,
		ccbv.company_id,
		cd.title title,
		cc.id category_id,
		cc.name category_name,
		sf.file_path cover_file_path,
		COALESCE(cuc.user_count_completed, 0) user_count_completed,
		COALESCE(cuc.user_count_current, 0) user_count_current,
		COALESCE(cuc.user_count_current, 0) user_count_all,
		COALESCE(cuc.user_count_all_prev, 0) user_count_all_prev
	FROM public.latest_course_version_view lcvv

	LEFT JOIN public.course_version cv 
	ON cv.id = lcvv.version_id

	LEFT JOIN public.course co
	ON co.id = cv.course_id

	LEFT JOIN public.course_data cd 
	ON cd.id = cv.course_data_id 

	INNER JOIN public.course_company_bridge_view ccbv
	ON ccbv.course_id = co.id

	LEFT JOIN public.storage_file sf
	ON sf.id = cd.cover_file_id

	LEFT JOIN public.course_category cc
	ON cc.id = cd.category_id

	LEFT JOIN public.course_category scc
	ON scc.id = cd.sub_category_id

	LEFT JOIN public.course_video_count_view cvcv
	ON cvcv.course_id = co.id

	LEFT JOIN course_users_cte cuc
	ON cuc.course_id = co.id
	AND cuc.company_id = ccbv.company_id

	WHERE co.deletion_date IS NULL
) 
SELECT 
	*,
	dcte.user_count_all - dcte.user_count_all_prev user_count_all_change
FROM detailed_cte dcte
	
ORDER BY
	dcte.course_id