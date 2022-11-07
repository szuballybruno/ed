WITH
flat_cte AS 
(
	SELECT
		ase.user_id,
		ev.id exam_version_id,
		ase.id answer_session_id,
		qv.id question_version_id,
		ga.score,
        qd.max_score question_max_score,
		ed.title
	FROM public.exam_version ev
	
	LEFT JOIN public.exam_data ed
	ON ed.id = ev.exam_data_id 

	INNER JOIN public.answer_session ase
	ON ase.exam_version_id = ev.id
	
	LEFT JOIN public.question_version qv
	ON qv.exam_version_id = ev.id
	
	LEFT JOIN public.question_data qd
	ON qd.id = qv.question_data_id

	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
	AND ga.answer_session_id = ase.id
	
	ORDER BY
		ase.user_id,
		ev.id,
		ase.id,
		qv.id
),
grouped_cte AS 
(
	SELECT
		flat.user_id,
		flat.exam_version_id,
		flat.answer_session_id,
		COUNT(*)::int question_count,
		COALESCE(SUM(flat.score), 0)::int exam_score,
		COALESCE(SUM(flat.question_max_score), 0)::int exam_max_score,
		COALESCE(SUM(CASE WHEN flat.score IS NOT NULL THEN 1 ELSE 0 END), 0)::int answered_question_count
	FROM flat_cte flat

	GROUP BY 
		flat.exam_version_id,
		flat.answer_session_id,
		flat.user_id
	
	ORDER BY
		flat.user_id,
		flat.exam_version_id,
		flat.answer_session_id
)
SELECT 
	grouped.*,
	ROUND(grouped.exam_score::numeric / grouped.exam_max_score::numeric * 100, 1)::int score_percentage
FROM grouped_cte grouped