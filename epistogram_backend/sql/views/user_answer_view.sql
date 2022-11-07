SELECT 
   ga.id given_answer_id,
   ga.state = 'CORRECT' given_answer_is_correct,
   ga.elapsed_seconds,
   ga.answer_session_id,
   asv.user_id,
   vv.video_id,
   ev.exam_id,
   cv.course_id course_id,
   asv.answer_session_type
FROM public.given_answer ga

LEFT JOIN public.answer_session_view AS asv
ON asv.answer_session_id = ga.answer_session_id

LEFT JOIN public.exam_version ev 
ON ev.id = asv.exam_version_id

LEFT JOIN public.video_version vv
ON vv.id = asv.video_version_id

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id
OR mv.id = vv.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id