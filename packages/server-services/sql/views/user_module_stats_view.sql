WITH 
module_question_success_rate_cte AS
(
	SELECT 
		asv.user_id,
		mv.module_id,
		(AVG(ga.score) / 4) * 100 question_success_rate
	FROM public.given_answer ga
	
	INNER JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id
	AND asv.video_version_id IS NOT NULL
	
	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id	 
	
	GROUP BY asv.user_id, mv.module_id
),
module_videos_to_be_repeated_cte AS
(
	SELECT 
		asv.user_id,
		mv.module_id,
		COUNT(*)::int videos_to_be_repeated_count
	FROM public.given_answer ga
	
	INNER JOIN public.answer_session_view asv
	ON asv.answer_session_id = ga.answer_session_id
	AND asv.video_version_id IS NOT NULL
	
	LEFT JOIN public.video_version vv
	ON vv.id = asv.video_version_id
	
	LEFT JOIN public.module_version mv
	ON mv.id = vv.module_version_id	 
	
	WHERE ga.score = 0
	
	GROUP BY asv.user_id, mv.module_id
)

SELECT 
	-- Modul neve
	mpc.user_id,
	cv.course_id,
	mv.module_id,
	md.name module_name,
	
	-- Haladás a modulban
	(mpc.completed_course_item_count::double precision / micv.item_count::double precision) * 100 module_progress,

	-- Modul teljesítménye
	umpv.performance_percentage,
	
	-- Modulzáró vizsga eredménye
	mlesv.exam_score last_exam_score,
	
	-- Videós kérdések eredménye 
	mqsrc.question_success_rate module_question_success_rate,
	
	-- Ismétlésre ajánlott videók
	mvtbrc.videos_to_be_repeated_count videos_to_be_repeated_count
	
	-- Modul ismetlesre ajánlott?
FROM public.completed_module_item_count_view mpc

LEFT JOIN public.latest_course_version_view lcvv
ON lcvv.course_id = mpc.course_id

LEFT JOIN public.course_version cv
ON cv.id = lcvv.version_id

LEFT JOIN public.course_data cd
ON cd.id = cv.course_data_id

LEFT JOIN public.module_version mv
ON mv.course_version_id = cv.id
AND mv.module_id = mpc.module_id

LEFT JOIN public.module_data md
ON md.id = mv.module_data_id

LEFT JOIN public.module_item_count_view micv
ON micv.module_id = mv.module_id

LEFT JOIN public.user_module_performance_view umpv
ON umpv.module_id = mv.module_id
AND umpv.user_id = mpc.user_id

LEFT JOIN public.module_last_exam_score_view mlesv
ON mlesv.user_id = mpc.user_id
AND mlesv.module_id = mv.module_id

LEFT JOIN module_question_success_rate_cte mqsrc
ON mqsrc.user_id = mpc.user_id
AND mqsrc.module_id = mv.module_id

LEFT JOIN module_videos_to_be_repeated_cte mvtbrc
ON mvtbrc.user_id = mpc.user_id
AND mvtbrc.module_id = mv.module_id

WHERE mv.module_id != 1
AND md.order_index != 0

ORDER BY 
	mpc.user_id,
	cv.course_id,
	mv.module_id