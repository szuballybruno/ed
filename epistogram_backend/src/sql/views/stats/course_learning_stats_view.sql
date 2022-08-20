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
		ROUND(AVG(esv.score_percentage)) avg_score_percentage
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
),
completed_video_count AS
(
	SELECT
		cicv.user_id,
		cicv.course_id,
		COUNT(cicv.course_item_completion_id) completed_video_count
	FROM public.course_item_completion_view cicv
	
	GROUP BY cicv.user_id, cicv.course_id
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
	ucpav.total_item_count total_course_item_count,
	ucpav.total_completed_item_count completed_course_item_count,
	cvc.completed_video_count,
	cvcv.video_count total_video_count,
	vqc.video_question_count total_video_question_count,
	avq.answered_video_question_count,
	easp.avg_score_percentage,
	CASE 
		WHEN cqsv.total_answer_count > 0
			THEN (cqsv.correct_answer_count::double precision / cqsv.total_answer_count * 100)::int
		ELSE 0
	END question_success_rate,
	elsrv_final.success_rate::int final_exam_success_rate
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = co.id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.user_course_bridge ucb
ON ucb.user_id = u.id
AND ucb.course_id = co.id

LEFT JOIN public.course_completion cc
ON cc.user_id = u.id
AND cc.course_version_id = cv.id

LEFT JOIN public.course_video_count_view cvcv
ON cvcv.course_version_id = cv.id

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

LEFT JOIN public.user_course_progress_actual_view ucpav
ON ucpav.user_id = u.id
AND ucpav.course_id = co.id

LEFT JOIN public.exam_latest_success_rate_view elsrv_final
ON elsrv_final.user_id = u.id
AND elsrv_final.course_id = co.id
AND elsrv_final.is_final IS TRUE

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

LEFT JOIN completed_video_count cvc
ON cvc.user_id = u.id
AND cvc.course_id = co.id