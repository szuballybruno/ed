SELECT 
	sq.*,
	sq.total_video_seconds + sq.total_exam_seconds total_length_seconds
FROM
(
	SELECT 
		cv.id course_id,
		(
			SELECT 
				COALESCE(SUM(vd.video_file_length_seconds), 0)::int
			FROM public.video_version vv

			LEFT JOIN public.module_version mv
			ON mv.course_version_id = cv.id AND mv.id = vv.module_version_id
			
			LEFT JOIN public.video_data vd
			ON vd.id = vv.video_data_id

			WHERE mv.course_version_id = cv.id
		) total_video_seconds,
		(
			SELECT 
				COUNT(1)::int * 20 total_exam_seconds 
			FROM public.exam_version ev
			
			LEFT JOIN public.exam e
			ON e.id = ev.exam_id
			
			LEFT JOIN public.module_version mv
			ON mv.course_version_id = cv.id AND mv.id = ev.module_version_id
			
			WHERE e.is_pretest = false
			AND e.is_signup = false
			AND mv.course_version_id = cv.id
		)
	FROM public.course_version cv
) sq