WITH 
question_details as (
	SELECT 
		sq.*,
		sq.answer_count = 0 OR sq.correct_answer_count = 0 has_problems 
	FROM 
	(
		SELECT 
			civ.video_id,
			civ.exam_id,
			q.id question_id, 
			COUNT(an.id) answer_count,
			COALESCE(SUM(an.is_correct::int), 0) correct_answer_count
		FROM public.course_item_view civ
		
		LEFT JOIN public.question q
		ON q.video_id = civ.video_id OR q.exam_id = civ.exam_id

		LEFT JOIN public.answer an
		ON an.question_id = q.id

		GROUP BY
			civ.video_id,
			civ.exam_id,
			q.id

		ORDER BY
			q.id
	) sq
)

SELECT 
	casv.id course_id,
	casv.title course_title,
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
	CASE WHEN civ.video_id IS NULL
		THEN (SELECT COUNT(q.id) FROM public.question q WHERE q.exam_id = civ.exam_id)::int
		ELSE (SELECT COUNT(q.id) FROM public.question q WHERE q.video_id = civ.video_id)::int
	END item_question_count,
	(
		SELECT 
			SUM(qd.has_problems::int) > 0 has_problems
		FROM question_details qd
		WHERE qd.video_id = civ.video_id OR qd.exam_id = civ.exam_id
	) item_has_problems,
	v.length_seconds video_length
FROM public.course_admin_short_view casv

LEFT JOIN public.course_item_view civ
ON civ.course_id = casv.id

LEFT JOIN public.video v
ON v.id = civ.video_id

ORDER BY 
	casv.id, 
	civ.module_order_index,
	civ.item_order_index
