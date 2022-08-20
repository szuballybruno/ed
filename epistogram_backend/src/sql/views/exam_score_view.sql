WITH
sq AS 
(
	SELECT
		ase.user_id,
		ev.id exam_version_id,
		ase.id answer_session_id,
		SUM(gasv.score) exam_score,
		COUNT(gasv.question_version_id) * consts.question_max_score exam_max_score
	FROM public.exam_version ev

	INNER JOIN public.answer_session ase
	ON ase.exam_version_id = ev.id
	
	LEFT JOIN public.question_version qv
	ON qv.exam_version_id = ev.id

	LEFT JOIN public.given_answer_score_view gasv
	ON gasv.question_version_id = qv.id
	AND gasv.user_id = ase.user_id

	CROSS JOIN public.constant_values_view consts

	GROUP BY 
		ev.id,
		ase.id,
		ase.user_id,
		consts.question_max_score
)
SELECT 
	sq.*,
	ROUND(sq.exam_score::numeric / sq.exam_max_score::numeric * 100, 1) score_percentage
FROM sq