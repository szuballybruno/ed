WITH 
module_item_count_cte AS
(
	SELECT 
		mv.module_id,
		COUNT(*)::int total_item_count
	FROM public.latest_course_version_view lcvv

	LEFT JOIN public.module_version mv
	ON mv.course_version_id = lcvv.version_id

	LEFT JOIN public.course_item_view civ
	ON civ.module_id = mv.module_id
		AND civ.item_type != 'pretest'

	GROUP BY
		mv.module_id
),
course_item_completion_distinct AS 
(
	SELECT DISTINCT
		cicv.user_id,
		cicv.course_id,
		cicv.module_id,
		cicv.video_id,
		cicv.exam_id
	FROM public.course_item_completion_view cicv
),
module_progress_cte AS 
(
	SELECT DISTINCT
		cicd.user_id,
		cicd.course_id,
		cicd.module_id,
		COUNT(*) completed_course_item_count
	FROM course_item_completion_distinct cicd
	
	GROUP BY cicd.user_id, cicd.course_id, cicd.module_id
),
-- Selects the last exam of a module
module_last_exam AS
(
	SELECT
		mv.module_id,
		ev.exam_id,
		MAX(ed.order_index) item_order_index
	FROM public.module_version mv
	
	LEFT JOIN public.exam_version ev
	ON ev.module_version_id = mv.id
	
	LEFT JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id
	
	WHERE ed.order_index != 0
	
	GROUP BY mv.module_id, ev.exam_id
	
	ORDER BY mv.module_id, ev.exam_id
),
module_last_exam_score_cte AS 
(
	SELECT
		lasv.user_id,
		mle.module_id,
		asv.answer_session_success_rate last_exam_score
	FROM public.latest_answer_session_view lasv
	
	LEFT JOIN public.exam_version ev
	ON ev.id = lasv.exam_version_id
	
	INNER JOIN module_last_exam mle
	ON mle.exam_id = ev.exam_id
	
	LEFT JOIN public.answer_session_view asv
	ON asv.answer_session_id = lasv.answer_session_id
),
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
		COUNT(*) videos_to_be_repeated_count
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
	mpc.module_id,
	md.name module_name,
	
	-- Haladás a modulban
	(mpc.completed_course_item_count::double precision / micc.total_item_count::double precision) * 100 module_progress,

	-- Modul teljesítménye
	umpv.performance_percentage,
	
	-- Modulzáró vizsga eredménye
	mlesc.last_exam_score last_exam_score,
	
	-- Videós kérdések eredménye 
	mqsrc.question_success_rate module_question_success_rate,
	
	-- Ismétlésre ajánlott videók
	mvtbrc.videos_to_be_repeated_count videos_to_be_repeated_count
	
	-- Modul ismetlesre ajánlott?
FROM module_progress_cte mpc

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

LEFT JOIN module_item_count_cte micc
ON micc.module_id = mv.module_id

LEFT JOIN public.user_module_performance_view umpv
ON umpv.module_id = mv.module_id
AND umpv.user_id = mpc.user_id

LEFT JOIN module_last_exam_score_cte mlesc
ON mlesc.user_id = mpc.user_id
AND mlesc.module_id = mv.module_id

LEFT JOIN module_question_success_rate_cte mqsrc
ON mqsrc.user_id = mpc.user_id
AND mqsrc.module_id = mv.module_id

LEFT JOIN module_videos_to_be_repeated_cte mvtbrc
ON mvtbrc.user_id = mpc.user_id
AND mvtbrc.module_id = mv.module_id

WHERE mpc.module_id != 1
AND md.order_index != 0

ORDER BY 
	mpc.user_id,
	cv.course_id,
	mpc.module_id


