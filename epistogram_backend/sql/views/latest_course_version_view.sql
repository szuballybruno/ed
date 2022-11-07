SELECT MAX(cv.id) version_id, cv.course_id
FROM public.course_version cv
GROUP BY cv.course_id