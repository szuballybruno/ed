WITH
answer_agg as 
(
	SELECT 
		sq.*,
		sq.answer_count = 0 issue_answers_missing,
		sq.correct_answer_count = 0 issue_correct_answers_missing
	FROM 
	(
		SELECT 
			q.id question_id, 
			q.question_text question_text, 
			q.video_id,
			q.exam_id,
			COUNT(an.id) answer_count,
			COALESCE(SUM(an.is_correct::int), 0) correct_answer_count
		FROM public.question q 

		LEFT JOIN public.answer an
		ON an.question_id = q.id

		GROUP BY
			q.id,
			q.video_id,
			q.exam_id
	) sq
),
question_agg as 
(
	SELECT 
		sq.video_id,
		sq.exam_id,
		sq.question_count,
		sq.question_count = 0 issue_questions_missing,
		sq.question_issues question_issues
	FROM 
	(
		SELECT 
			civ.video_id,
			civ.exam_id,
			COUNT(aa.question_id) question_count,
			STRING_AGG(aa.question_text || CASE WHEN aa.issue_answers_missing THEN ': ans_miss' ELSE ': corr_ans_miss' END, CHR(10)) 
				FILTER (WHERE aa.issue_answers_missing OR aa.issue_correct_answers_missing) question_issues,
			COALESCE(SUM(aa.issue_answers_missing::int), 0) missing_answers_issues_count,
			COALESCE(SUM(aa.issue_correct_answers_missing::int), 0) missing_correct_answers_count
		FROM public.course_item_view civ
		
		LEFT JOIN answer_agg aa
		ON aa.video_id = civ.video_id 
			OR aa.exam_id = civ.exam_id

		GROUP BY
			civ.video_id,
			civ.exam_id
	) sq
	
	ORDER BY
		sq.question_count DESC
)

-- SELECT * FROM question_agg

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
	CONCAT_WS(
		CHR(10), 
		CASE WHEN qagg.issue_questions_missing THEN 'questions_missing' END, 
		qagg.question_issues) errors,
	CONCAT_WS(
		CHR(10), 
		CASE WHEN civ.item_is_video AND v.length_seconds > 480 THEN 'video_too_long' END) warnings,
	v.length_seconds video_length
FROM public.course_admin_short_view casv

LEFT JOIN public.course_item_view civ
ON civ.course_id = casv.id

LEFT JOIN question_agg qagg
ON qagg.video_id = civ.video_id 
	OR qagg.exam_id = civ.exam_id

LEFT JOIN public.video v
ON v.id = civ.video_id

ORDER BY 
	casv.id, 
	civ.module_order_index,
	civ.item_order_index
