WITH 
flat_cte AS 
(
	SELECT
		ase.user_id,
		cv.course_id,
		ase.id answer_session_id,
		ga.id given_answer_id,
		qd.id question_data_id,
		mv.module_id,
		qd.max_score,
		ga.score
	FROM public.answer_session ase

	LEFT JOIN public.video_version vv
	ON vv.id = ase.video_version_id

	LEFT JOIN public.exam_version ev
	ON ev.id = ase.exam_version_id

	INNER JOIN public.module_version mv
	ON mv.id = vv.module_version_id 
	OR mv.id = ev.module_version_id

	INNER JOIN public.course_version cv
	ON cv.id = mv.course_version_id

	INNER JOIN public.given_answer ga
	ON ga.answer_session_id = ase.id

	LEFT JOIN public.question_version qv
	ON qv.id = ga.question_version_id

	LEFT JOIN public.question_data qd 
	ON qd.id = qv.question_data_id
),
grouped_cte AS 
(
	SELECT 
		fc.user_id,
		fc.course_id,
		fc.module_id,
		COUNT(fc.given_answer_id)::int given_answer_count,
		SUM(fc.max_score)::int summarized_max_score,
		SUM(fc.score)::int summarized_score
	FROM flat_cte fc
	GROUP BY 
		fc.user_id,
		fc.course_id,
		fc.module_id
)
SELECT 
	gc.*,
	ROUND(gc.summarized_score::double precision / gc.summarized_max_score * 100) performance_percentage
FROM grouped_cte gc