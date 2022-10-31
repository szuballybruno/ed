WITH
latest_course_video_seconds AS
(
	SELECT 
		cv.course_id,
		COALESCE(SUM(vd.video_file_length_seconds), 0)::int total_video_seconds
	FROM public.latest_course_version_view lcvv
	
	LEFT JOIN public.course_version cv
	ON cv.id = lcvv.version_id
	
	LEFT JOIN public.module_version mv
	ON mv.course_version_id = cv.id
	
	LEFT JOIN public.video_version vv
	ON vv.module_version_id = mv.id

	LEFT JOIN public.video_data vd
	ON vd.id = vv.video_data_id
	
	GROUP BY cv.course_id
),
latest_course_exam_seconds AS
(
	SELECT 
		cv.course_id,
		COUNT(1)::int * 20 total_exam_seconds 
	FROM public.latest_course_version_view lcvv
	
	LEFT JOIN public.course_version cv
	ON cv.id = lcvv.version_id
	
	LEFT JOIN public.module_version mv
	ON mv.course_version_id = cv.id
	
	LEFT JOIN public.exam_version ev
	ON ev.module_version_id = mv.id

	LEFT JOIN public.exam e
	ON e.id = ev.exam_id

	WHERE e.is_pretest = false
	AND e.is_signup = false
	
	GROUP BY cv.course_id
)

SELECT 
	lcvs.course_id,
	lcvs.total_video_seconds,
	lces.total_exam_seconds,
	lcvs.total_video_seconds + lces.total_exam_seconds total_length_seconds
FROM latest_course_video_seconds lcvs

LEFT JOIN latest_course_exam_seconds lces
ON lces.course_id = lcvs.course_id