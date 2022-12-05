-- Returns the average success rate of the
-- answer_session groupped by answer_session_type

SELECT
    asv.user_id,
    cv.course_id,
	mv.module_id,
    asv.answer_session_type,
    asv.start_date,
    AVG(asv.answer_session_success_rate) answer_session_success_rate
FROM public.answer_session_view asv

LEFT JOIN public.video_version vv
ON vv.id = asv.video_version_id

LEFT JOIN public.exam_version ev
ON ev.id = asv.exam_version_id

LEFT JOIN public.module_version mv
ON mv.id = vv.module_version_id
OR mv.id = ev.module_version_id

LEFT JOIN public.course_version cv
ON cv.id = mv.course_version_id

WHERE asv.answer_session_type != 'pretest'

GROUP BY 
    asv.user_id,
    cv.course_id,
	mv.module_id,
    asv.answer_session_type,
    asv.start_date