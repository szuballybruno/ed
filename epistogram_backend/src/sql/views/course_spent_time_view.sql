WITH 
exam_elapsed_time_cte AS
(
	SELECT 
		asev.user_id,
		cv.course_id,
		EXTRACT(EPOCH FROM SUM(cicv.completion_date - asev.start_date)) exam_elapsed_time
	FROM public.exam_version ev

	LEFT JOIN public.module_version mv
	ON mv.id = ev.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	INNER JOIN public.answer_session_view asev
	ON asev.exam_version_id = ev.id 
	AND asev.start_date IS NOT NULL

	INNER JOIN public.course_item_completion_view cicv
	ON cicv.answer_session_id = asev.answer_session_id

	WHERE asev.answer_session_type = 'exam'
	AND cicv.completion_date IS NOT NULL

	GROUP BY asev.user_id, cv.course_id
),
video_watch_elapsed_time_cte AS
(
	SELECT 
		vps.user_id,
		cv.course_id,
		SUM(vps.to_seconds - vps.from_seconds) video_elapsed_time
	FROM public.video_playback_sample vps

	LEFT JOIN public.video_version vv
	ON vv.id = vps.video_version_id 

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	GROUP BY 
		cv.course_id, 
		vps.user_id
),
video_question_elapsed_time_cte AS
(
	SELECT
		asv.user_id,
		cv.course_id,
		SUM(ga.elapsed_seconds) video_question_elapsed_time
	FROM public.given_answer ga
	
	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id
	
	LEFT JOIN public.question_version qv
	ON qv.id = ga.question_version_id
	
	LEFT JOIN public.video_version vv
	ON vv.id = qv.video_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE ga.is_practise_answer IS NOT TRUE
	
	GROUP BY asv.user_id, cv.course_id
),
practise_question_elapsed_time_cte AS
(
	SELECT
		asv.user_id,
		cv.course_id,
		(COUNT(ga.id) * 15)::integer practise_question_elapsed_time
	FROM public.given_answer ga
	
	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id
	
	LEFT JOIN public.question_version qv
	ON qv.id = ga.question_version_id
	
	LEFT JOIN public.video_version vv
	ON vv.id = qv.video_version_id

	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id

	LEFT JOIN public.course_version cv
	ON cv.id = mv.course_version_id
	
	WHERE ga.is_practise_answer IS TRUE
	
	GROUP BY asv.user_id, cv.course_id
),

spent_time_sum_view_cte AS
(
	SELECT 
		eetc.user_id,
		eetc.course_id,
		SUM(eetc.exam_elapsed_time) total_exam_session_elapsed_time,
		SUM(vwetc.video_elapsed_time) total_video_watch_elapsed_time,
		SUM(vqetc.video_question_elapsed_time) total_video_question_elapsed_time,
		SUM(pqetc.practise_question_elapsed_time) total_practise_question_elapsed_time
	FROM exam_elapsed_time_cte eetc

	LEFT JOIN video_watch_elapsed_time_cte vwetc
	ON vwetc.user_id = eetc.user_id
	AND vwetc.course_id = eetc.course_id

	LEFT JOIN video_question_elapsed_time_cte vqetc
	ON vqetc.user_id = eetc.user_id
	AND vqetc.course_id = eetc.course_id
	
	LEFT JOIN practise_question_elapsed_time_cte pqetc
	ON pqetc.user_id = eetc.user_id
	AND pqetc.course_id = eetc.course_id
	
	GROUP BY eetc.user_id, eetc.course_id
)

SELECT 
	u.id user_id,
	co.id course_id,
	stsvc.total_exam_session_elapsed_time,
	stsvc.total_video_watch_elapsed_time,
	stsvc.total_video_question_elapsed_time,
	stsvc.total_practise_question_elapsed_time,
	(
		COALESCE(eetc.exam_elapsed_time, 0)
		+ COALESCE(vwetc.video_elapsed_time, 0)
		+ COALESCE(vqetc.video_question_elapsed_time, 0)
		+ COALESCE(pqetc.practise_question_elapsed_time, 0)
	) total_spent_seconds
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN exam_elapsed_time_cte eetc
ON eetc.user_id = u.id
AND eetc.course_id = co.id

LEFT JOIN video_watch_elapsed_time_cte vwetc
ON vwetc.user_id = u.id
AND vwetc.course_id = co.id

LEFT JOIN video_question_elapsed_time_cte vqetc
ON vqetc.user_id = u.id
AND vqetc.course_id = co.id

LEFT JOIN practise_question_elapsed_time_cte pqetc
ON pqetc.user_id = u.id
AND pqetc.course_id = co.id

LEFT JOIN spent_time_sum_view_cte stsvc
ON stsvc.user_id = u.id
AND stsvc.course_id = co.id

ORDER BY 
	u.id,
	co.id