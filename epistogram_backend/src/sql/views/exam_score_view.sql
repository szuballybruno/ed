SELECT
	lev.exam_version_id,
	SUM(gasv.given_answer_points) exam_acquired_points,
	COUNT(qv.id) * 4 exam_maximum_points
FROM public.latest_exam_view lev

LEFT JOIN public.question_version qv
ON qv.exam_version_id = lev.exam_version_id

LEFT JOIN public.given_answer_score_view gasv
ON gasv.question_version_id = qv.id

GROUP BY lev.exam_version_id