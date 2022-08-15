-- user progress view
-- provides user course insights

SELECT
	u.id user_id,
	co.id course_id,
	cd.title course_title,
	ucpav.total_item_count total_course_item_count,
	ucpav.total_completed_item_count completed_course_item_count,
	(ucpav.total_completed_item_count::double precision / ucpav.total_item_count * 100)::int progress_percentage,
	CASE WHEN ucb.current_item_code IS NULL
		THEN NULL --first_civ.item_code
		ELSE ucb.current_item_code
	END continue_item_code
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.user_course_progress_actual_view ucpav
ON ucpav.course_id = co.id
AND ucpav.user_id = u.id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
AND ucb.course_id = co.id

LEFT JOIN public.course_completion cc
ON cc.user_id = u.id
AND cc.course_version_id = cv.id

WHERE ucb.id IS NOT NULL
AND cc.id IS NULL
