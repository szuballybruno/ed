SELECT 
	u.id user_id,
	co.id course_id,
	det.total_video_sum_length_seconds,
	ucetf.estimated_seconds_per_week estimated_seconds_per_week,
	estimation.original_completion_weeks_estimation,
	cstv.total_spent_seconds,
	ustv.spent_seconds_per_week actual_seconds_per_week,
	det.total_video_sum_length_seconds / ustv.spent_seconds_per_week actual_completion_weeks_estimation
FROM public.course co

CROSS JOIN public.user u 

LEFT JOIN public.course_spent_time_view cstv
ON cstv.user_id = u.id AND cstv.course_id = co.id

LEFT JOIN public.course_details_view det
ON det.course_id = co.id AND det.user_id = u.id

LEFT JOIN public.user_course_estimated_time_frame_view ucetf
ON ucetf.user_id = u.id AND ucetf.course_id = co.id

LEFT JOIN 
(
	SELECT 
		u.id user_id, 
		co.id course_id, 
		det.total_video_sum_length_seconds / ucetf.estimated_seconds_per_week original_completion_weeks_estimation
	FROM public.user u
	CROSS JOIN public.course co
	
	LEFT JOIN public.course_details_view det
	ON det.course_id = co.id AND det.user_id = u.id
	
	LEFT JOIN public.user_course_estimated_time_frame ucetf
	ON ucetf.user_id = u.id AND ucetf.course_id = co.id
) estimation
ON estimation.course_id = co.id AND estimation.user_id = u.id

LEFT JOIN public.user_spent_time_view ustv
ON ustv.course_id = co.id AND ustv.user_id = u.id 

ORDER BY
	u.id,
	co.id