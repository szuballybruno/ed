SELECT 
	casv.id course_id,
	casv.title,
	casv.category_id,
	casv.category_name,
	casv.sub_category_id,
	casv.sub_category_name,
	casv.teacher_id,
	casv.teacher_first_name,
	casv.teacher_last_name,
	casv.cover_file_path,
	casv.video_count,
	casv.exam_count,
	civ.module_name,
	civ.module_order_index,
	civ.module_id,
	civ.module_code,
	civ.video_id,
	civ.exam_id,
	civ.item_is_video,
	civ.item_id,
	civ.item_order_index,
	civ.item_title,
	civ.item_subtitle,
	civ.item_is_final_exam,
	civ.item_code,
	q.id question_id,
	q.question_text question_text,
	q.show_up_time_seconds question_show_up_seconds,
	an.id answer_id,
	an.text answer_text,
	an.is_correct answer_is_correct,
	CASE WHEN civ.video_id IS NULL
		THEN (SELECT COUNT(q.id) FROM public.question q WHERE q.exam_id = civ.exam_id)::int
		ELSE (SELECT COUNT(q.id) FROM public.question q WHERE q.video_id = civ.video_id)::int
	END item_question_count,
	(
		SELECT COUNT(sqa.id)::int FROM public.answer sqa
		WHERE sqa.question_id = q.id
	) answer_count,
	(
		SELECT COUNT(sqa.id)::int FROM public.answer sqa
		WHERE sqa.question_id = q.id AND sqa.is_correct
	) correct_answer_count,
	v.length_seconds video_length
FROM public.course_admin_short_view casv

LEFT JOIN public.course_item_view civ
ON civ.course_id = casv.id

LEFT JOIN public.video v
ON v.id = civ.video_id

LEFT JOIN public.question q
ON q.video_id = civ.video_id OR q.exam_id = civ.exam_id

LEFT JOIN public.answer an
ON an.question_id = q.id

ORDER BY 
	casv.id, 
	civ.module_order_index,
	civ.item_order_index
