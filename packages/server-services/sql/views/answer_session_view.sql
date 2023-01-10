-- total and total correct given answer count,
-- and answered question count
WITH
answer_stats AS
(
	SELECT
		ase.user_id,
		ase.id answer_session_id,
		COUNT (ga.id)::int given_answer_count,
		SUM ((ga.state = 'CORRECT')::int)::int correct_given_answer_count,
		(
			SELECT
				COUNT(*)::int
			FROM public.question_version qv

			LEFT JOIN public.given_answer ga
			ON ga.question_version_id = qv.id

			WHERE ga.answer_session_id = ase.id
		) answered_question_count
	FROM public.given_answer ga

	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id

	GROUP BY ase.user_id, ase.id
)
SELECT
	ase.id answer_session_id,
	ase.user_id,
	ase.exam_version_id,
	ase.video_version_id,
    ase.start_date,
	esv.exam_score answer_session_acquired_points,
	esv.score_percentage answer_session_success_rate,
	esv.score_percentage > COALESCE(ed.acceptance_threshold, 60) is_successful,
	ast.answered_question_count,
	ast.correct_given_answer_count,
	ast.given_answer_count,
	cic.completion_date IS NOT NULL is_completed,
	cic.completion_date end_date,
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

LEFT JOIN public.exam_score_view esv
ON esv.answer_session_id = ase.id

LEFT JOIN public.exam_version ev
ON ev.id = ase.exam_version_id

LEFT JOIN public.exam_data ed
ON ed.id = ev.exam_data_id

LEFT JOIN public.exam e
ON ev.exam_id = e.id

LEFT JOIN public.course_item_completion_view cic
ON cic.answer_session_id = ase.id
