SELECT
    ev.id exam_version_id,
	mv.course_version_id course_version_id,
    qv.question_id,
    qv.id question_version_id,
    qd.id question_data_id,
    qd.question_text,
	qd.image_url,
	qd.order_index,
	qd.show_up_time_seconds,
	qd.type_id,
    ad.text answer_text,
    av.id answer_version_id,
    av.answer_id answer_id
FROM public.exam_version ev

LEFT JOIN public.module_version mv
ON mv.id = ev.module_version_id

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id