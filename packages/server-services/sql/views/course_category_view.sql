SELECT DISTINCT ON (cc.id, cacv.company_id)
	cc.*,
	cv.course_id,
	cacv.company_id
FROM public.course_category cc

INNER JOIN public.course_data cd
ON cd.category_id = cc.id

LEFT JOIN public.course_version cv
ON cv.course_data_id = cd.id

INNER JOIN public.company_associated_courses_view cacv
ON cacv.course_id = cv.course_id
AND cacv.is_assigned IS TRUE