SELECT 
	uvpb.user_id,
	v.course_id,
	uvpb.completion_date
FROM public.user_video_progress_bridge uvpb

LEFT JOIN public.video v
ON v.id = uvpb.video_id

WHERE uvpb.completion_date IS NOT NULL
UNION ALL
SELECT 
	uepb.user_id,
	e.course_id,
	uepb.completion_date
FROM public.user_exam_progress_bridge uepb

LEFT JOIN public.exam e
ON e.id = uepb.exam_id 

WHERE e.type = 'normal' AND uepb.completion_date IS NOT NULL