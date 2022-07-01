WITH answer_session_groups AS
(
	SELECT
		asv.user_id,
		cv.course_id,
		asv.answer_session_type,
		AVG(asv.answer_session_success_rate) answer_session_success_rate
	FROM public.answer_session_view asv

	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id
	
	LEFT JOIN public.exam_version ev
	ON ev.id = asv.exam_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id
	OR mv.id = ev.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE answer_session_type != 'pretest'
	
	GROUP BY 
		asv.user_id,
		cv.course_id,
		asv.answer_session_type
),

split_correct_answer_rates AS
(
	SELECT
		u.id user_id,
		co.id course_id,
		CASE 
			WHEN asg.answer_session_type = 'exam'
			THEN asg.answer_session_success_rate
		END exam_correct_answer_rate,
		CASE 
			WHEN asg.answer_session_type = 'practise'
			THEN asg.answer_session_success_rate
		END practise_correct_answer_rate,
		CASE 
			WHEN asg.answer_session_type = 'video'
			THEN asg.answer_session_success_rate
		END video_correct_answer_rate
	FROM public.user u

	CROSS JOIN public.course co

	LEFT JOIN answer_session_groups asg
	ON asg.user_id = u.id
	AND asg.course_id = co.id

	ORDER BY u.id
)

SELECT
	scar.user_id,
	scar.course_id,
	SUM(scar.exam_correct_answer_rate) exam_correct_answer_rate,
	SUM(scar.practise_correct_answer_rate) practise_correct_answer_rate,
	SUM(scar.video_correct_answer_rate) video_correct_answer_rate
FROM split_correct_answer_rates scar

GROUP BY scar.user_id, scar.course_id

