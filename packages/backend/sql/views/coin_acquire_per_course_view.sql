SELECT
	ct.id,
	ct.user_id,
	co.id course_id,
	SUM(ct.amount)::int amount
FROM public.course co

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id

LEFT JOIN public.video_version vv
ON vv.module_version_id = mv.id

LEFT JOIN public.exam_version ev
ON ev.module_version_id = mv.id

LEFT JOIN public.question_version qv
ON qv.video_version_id = vv.id 
AND qv.exam_version_id = ev.id

LEFT JOIN public.given_answer ga
ON ga.question_version_id = qv.id

LEFT JOIN public.coin_transaction ct
ON ct.given_answer_id = ga.id

GROUP BY co.id, ct.user_id, ct.id