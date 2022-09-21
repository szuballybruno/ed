SELECT 
	ase.user_id,
	ev.id exam_version_id,
	ev.id video_version_id,
	qv.id question_version_id,
	av.id answer_version_id,
	ase.id answer_session_id,
	av.answer_id,
    ad.is_correct
FROM public.latest_answer_session_view lasv

LEFT JOIN public.answer_session ase
ON ase.id = lasv.answer_session_id

LEFT JOIN public.exam_version ev
ON ev.id = ase.exam_version_id

LEFT JOIN public.video_version vv
ON vv.id = ase.video_version_id

LEFT JOIN public.question_version qv
ON qv.exam_version_id = ev.id
OR qv.video_version_id = vv.id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id

ORDER BY 
	ase.user_id,
	ev.id,
	qv.id,
	av.id,
	ase.id