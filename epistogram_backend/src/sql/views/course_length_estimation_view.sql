SELECT 
	sq.*,
	sq.total_video_seconds + sq.total_exam_seconds total_length_seconds
FROM
(
	SELECT 
		co.id course_id,
		(
			SELECT COALESCE(SUM(v.length_seconds), 0)::int

			FROM public.video v 

			LEFT JOIN public.course_module cm
			ON cm.course_id = co.id AND cm.id = v.module_id

			WHERE cm.course_id = co.id
		) total_video_seconds,
		(
			SELECT 
				COUNT(1)::int * 20 total_exam_seconds 
			FROM public.exam e
			
			WHERE e.type = 'normal' AND e.course_id = co.id
		)
	FROM public.course co
) sq