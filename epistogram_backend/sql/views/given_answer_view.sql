SELECT 
	ev.id exam_version_id,
	vv.id video_version_id,
	qv.id question_version_id,
	av.id answer_version_id,
	av.answer_id,
    ad.is_correct
FROM public.question_version qv

LEFT JOIN public.exam_version ev
ON ev.id = qv.exam_version_id

LEFT JOIN public.video_version vv
ON vv.id = qv.video_version_id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id

ORDER BY 
	ev.id,
    vv.id,
    qv.id,
	av.id