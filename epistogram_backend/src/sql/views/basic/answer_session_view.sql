-- total and total correct given answer count, 
-- and answered question count
WITH 
answer_stats AS 
(
	SELECT 
		ase.user_id,
		ase.id answer_session_id,
		COUNT (ga.id)::int given_answer_count,
		SUM (ga.is_correct::int)::int correct_given_answer_count,
		(
			SELECT 
				COUNT(*)
			FROM public.question_version qv

			LEFT JOIN public.given_answer ga
			ON ga.question_version_id = qv.id

			WHERE ga.answer_session_id = ase.id
		) answered_question_count
	FROM public.given_answer ga

	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	
	GROUP BY ase.user_id, ase.id
), 
answer_session_score AS
(
	SELECT
		gasv.answer_session_id,
		SUM(gasv.given_answer_points) answer_session_acquired_points,
		COUNT(gasv.question_version_id) * points_per_question.value answer_session_maximum_points
	FROM public.given_answer_score_view gasv

	LEFT JOIN public.constant_value points_per_question
	ON points_per_question.key = 'POINTS_PER_QUESTION'

	GROUP BY 
		gasv.answer_session_id,
		points_per_question.value
)
SELECT 
	ase.id answer_session_id,
	ase.user_id,
	ase.exam_version_id,
	ase.video_version_id,
    ase.start_date,
	ass.answer_session_acquired_points,
	ROUND(
		(ass.answer_session_acquired_points::double precision 
		/ ass.answer_session_maximum_points * 100)::numeric, 1
	)::double precision answer_session_success_rate,
	ROUND(
		(ass.answer_session_acquired_points::double precision 
		/ ass.answer_session_maximum_points * 100)::numeric, 1
	) > COALESCE(ed.acceptance_threshold, 60) is_successful,
	ast.answered_question_count,
	ast.correct_given_answer_count,
	ast.given_answer_count,
	cicv.id IS NOT NULL is_completed,
	cicv.completion_date end_date,
	CASE 
		WHEN ase.is_practise
			THEN 'practise'
		WHEN e.id = 0
			THEN 'signup'
		WHEN e.is_pretest
			THEN 'pretest'
		WHEN ase.video_version_id IS NOT NULL
			THEN 'video'
		WHEN ase.exam_version_id IS NOT NULL
			THEN 'exam'
		ELSE NULL
	END answer_session_type
FROM public.answer_session ase

LEFT JOIN answer_stats ast
ON ast.user_id = ase.user_id
AND ast.answer_session_id = ase.id

LEFT JOIN answer_session_score ass
ON ass.answer_session_id = ase.id

LEFT JOIN public.exam_version ev
ON ev.id = ase.exam_version_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.exam e
ON ev.exam_id = e.id

LEFT JOIN public.course_item_completion_view cicv
ON cicv.answer_session_id = ase.id