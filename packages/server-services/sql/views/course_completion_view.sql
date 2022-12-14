-- Returns a SINGLE row per course completion
-- based on user_id and course_id 
SELECT 
	cv.course_id,
	cc.user_id
FROM public.course_completion cc

LEFT JOIN public.course_version cv
ON cv.id = cc.course_version_id

GROUP BY
	cv.course_id,
	cc.user_id
