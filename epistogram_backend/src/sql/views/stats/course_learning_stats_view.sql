WITH 
video_question_count AS
(
	SELECT 
		COUNT(qv.id)::int video_question_count,
		cv.id course_version_id
	FROM public.video v

	LEFT JOIN public.video_version vv
	ON vv.video_id = v.id

	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	GROUP BY cv.id
),
exam_avg_score_percentage AS
(
	SELECT 
		ase.user_id,
		cv.course_id,
		ROUND(AVG(esv.score_percentage)) avg_exam_score_percentage
	FROM public.answer_session ase

	LEFT JOIN public.exam_version ev 
	ON ev.id = ase.exam_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	LEFT JOIN public.exam_score_view esv
	ON esv.exam_version_id = ev.id

	GROUP BY
		ase.user_id,
		cv.course_id
),
answered_video_question AS
(
	SELECT
		asv.user_id,
		cv.course_id,
		COUNT(ga.id) answered_video_question_count
	FROM public.given_answer ga
	
	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id

	LEFT JOIN public.video_version vv
	ON vv.id = asv.answer_session_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE asv.answer_session_type = 'video'
	
	GROUP BY asv.user_id, cv.course_id
)

SELECT 
	u.id user_id,
	co.id course_id,
	cd.title,
	true can_view, -- TODO AUTH
	cc.id IS NOT NULL is_completed,
	ucb.start_date IS NOT NULL is_started,
	ucb.current_item_code current_item_code,
	CASE WHEN ucb.current_item_code IS NULL 
		THEN NULL --first_civ.item_code 
		ELSE ucb.current_item_code 
	END continue_item_code,
	sf.file_path file_path,
	ccat.name category_name,
	csc.name sub_category_name,

	teacher.id teacher_id,
	teacher.first_name teacher_first_name,
	teacher.last_name teacher_last_name,

	cstv.total_spent_seconds,
	cicv.item_count total_course_item_count,
	ccicv.completed_course_item_count,
	COALESCE(ccvcv.completed_video_count, 0) completed_video_count,
	cvcv.video_count total_video_count,
	vqc.video_question_count total_video_question_count,
	COALESCE(avq.answered_video_question_count, 0) answered_video_question_count,
	easp.avg_exam_score_percentage,
	fesv.final_exam_score_percentage,
	CASE 
		WHEN cqsv.total_answer_count > 0
			THEN (cqsv.correct_answer_count::double precision / cqsv.total_answer_count * 100)::int
		ELSE 0
	END question_success_rate
FROM public.user u

INNER JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id

INNER JOIN public.course co
ON co.id = ucb.course_id

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.course_completion cc
ON cc.user_id = u.id
AND cc.course_version_id = cv.id

LEFT JOIN public.course_video_count_view cvcv
ON cvcv.course_id = co.id

LEFT JOIN public.storage_file sf
ON sf.id = cd.cover_file_id

LEFT JOIN public.course_category ccat
ON cc.id = cd.category_id
	
LEFT JOIN public.course_category csc
ON csc.id = cd.sub_category_id
	
LEFT JOIN public.user teacher
ON teacher.id = cd.teacher_id

LEFT JOIN public.course_spent_time_view cstv
ON cstv.user_id = u.id
AND cstv.course_id = co.id

LEFT JOIN public.course_item_count_view cicv
ON cicv.course_id = co.id

LEFT JOIN public.completed_course_item_count_view ccicv
ON ccicv.user_id = u.id
AND ccicv.course_id = co.id

LEFT JOIN public.final_exam_score_view fesv
ON fesv.user_id = u.id
AND fesv.course_id = co.id

LEFT JOIN public.course_questions_success_view cqsv
ON cqsv.user_id = u.id
AND cqsv.course_id = co.id

LEFT JOIN exam_avg_score_percentage easp
ON easp.user_id = u.id
AND easp.course_id = co.id

LEFT JOIN answered_video_question avq
ON avq.user_id = u.id
AND avq.course_id = co.id

LEFT JOIN video_question_count vqc
ON vqc.course_version_id = cv.id

LEFT JOIN public.completed_course_video_count_view ccvcv
ON ccvcv.user_id = u.id
AND ccvcv.course_id = co.id