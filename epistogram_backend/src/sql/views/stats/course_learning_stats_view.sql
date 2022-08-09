WITH video_question_count AS
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
exam_success_rate_average AS
(
	SELECT 
		elsrv.user_id,
		elsrv.course_id,
		COALESCE(AVG(elsrv.success_rate), 0)::int exam_success_rate_average
	FROM public.exam_latest_success_rate_view elsrv
	
	GROUP BY elsrv.user_id, elsrv.course_id
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
	cc.id IS NOT NULL is_completed,
	false is_started,
	cstv.total_spent_seconds,
	ucpav.total_item_count total_course_item_count,
	ucpav.total_completed_item_count completed_course_item_count,
	cvc.completed_video_count,
	vqc.video_question_count total_video_question_count,
	avq.answered_video_question_count,
	esra.exam_success_rate_average,
	CASE 
		WHEN cqsv.total_answer_count > 0
			THEN (cqsv.correct_answer_count::double precision / cqsv.total_answer_count * 100)::int
		ELSE 0
	END question_success_rate,
	elsrv_final.success_rate::int final_exam_success_rate
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN public.course_version cv
ON cv.course_id = co.id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.course_completion cc
ON cc.user_id = u.id
AND cc.course_version_id = cv.id

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

LEFT JOIN exam_success_rate_average esra
ON esra.user_id = u.id
AND esra.course_id = co.id

LEFT JOIN answered_video_question avq
ON avq.user_id = u.id
AND avq.course_id = co.id

LEFT JOIN video_question_count vqc
ON vqc.course_version_id = cv.id

LEFT JOIN completed_video_count cvc
ON cvc.user_id = u.id
AND cvc.course_id = co.id