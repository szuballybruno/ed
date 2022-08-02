SELECT 
	cv.course_id,
	cc.user_id
FROM public.course_completion cc
LEFT JOIN public.course_version cv
ON cv.id = cc.course_version_id

GROUP BY
	cv.course_id,
	cc.user_id
