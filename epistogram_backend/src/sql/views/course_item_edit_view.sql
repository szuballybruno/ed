SELECT 
	civ.exam_version_id,
	civ.video_version_id,
    CASE WHEN civ.item_type = 'video' 
		THEN vd.title
		ELSE ed.title 
	END title,
    vd.subtitle,
	vd.video_file_length_seconds video_length_seconds,
	sf.file_path video_file_path,
	qv.id question_version_id,
    qd.question_text question_text,
    qd.show_up_time_seconds question_show_up_time_seconds,
    av.id answer_version_id,
    ad.text answer_text,
    ad.is_correct answer_is_correct
FROM public.course_item_view civ

LEFT JOIN public.question_version qv
ON qv.exam_version_id = civ.exam_version_id
OR qv.video_version_id = civ.video_version_id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad 
ON ad.id = av.answer_data_id

LEFT JOIN public.video_version vv
ON vv.id = civ.video_version_id

LEFT JOIN public.video_data vd
ON vd.id = vv.video_data_id

LEFT JOIN public.exam_version ev
ON ev.id = civ.exam_version_id

LEFT JOIN public.video_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.storage_file sf
ON sf.id = vd.video_file_id

ORDER BY
	civ.video_version_id,
	civ.exam_version_id,
	qv.id