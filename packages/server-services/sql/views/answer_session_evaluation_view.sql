-- TODO: VERY SLOW !!!
WITH 
non_practise_answer_sessions AS 
(
	SELECT 
		ase.* 
	FROM public.answer_session_view ase
	WHERE ase.answer_session_type <> 'practise'
),
latest_question_version AS
(
	SELECT
		qu.id question_id,
		MAX(qv.id) question_version_id
	FROM public.question qu 
	
	LEFT JOIN public.question_version qv
	ON qv.question_id = qu.id
	
	GROUP BY qu.id
),
total_question_count AS
(
	SELECT 
		qv.exam_version_id, 
		qv.video_version_id,
		COUNT(qv.id)::int question_count
	FROM latest_question_version lqv
	
	LEFT JOIN public.question_version qv
	ON lqv.question_version_id = qv.id
	
	GROUP BY 
		qv.exam_version_id, 
		qv.video_version_id
),
ga_count AS 
(
	SELECT 
		ga.answer_session_id,
		COUNT(1)::int answered_count,
		COALESCE(SUM((ga.state = 'CORRECT')::int)::int, 0)::int correct_count
	FROM given_answer ga
	GROUP BY
		ga.answer_session_id
)

SELECT 
	ase.answer_session_id,
	u.id user_id,
	ase.video_version_id,
	ase.exam_version_id,
	
	-- total_question_count
	tqc.question_count,
	
	-- answered_question_count
	COALESCE(gac.answered_count, 0) answered_question_count,
	
	-- is_completed
	COALESCE(ec.id IS NOT NULL 
		OR vc.id IS NOT NULL
		OR gac.answered_count >= tqc.question_count, false) is_completed,
		
	-- correct_answer_count
	COALESCE(gac.correct_count, 0) correct_answer_count,
	
	-- is_successful
	ase.is_successful,
		
	-- correct_answer_rate
	ase.answer_session_success_rate correct_answer_rate
--	COALESCE(CASE WHEN tqc.question_count > 0
--		THEN ROUND(gac.correct_count::decimal / tqc.question_count * 100)
--		ELSE 0
--	END, 0) correct_answer_rate
FROM non_practise_answer_sessions ase

LEFT JOIN public.user u
ON u.id = ase.user_id

-- total quesiton count
LEFT JOIN total_question_count tqc
ON tqc.exam_version_id = ase.exam_version_id
OR tqc.video_version_id = ase.video_version_id

LEFT JOIN public.exam_completion ec
ON ec.answer_session_id = ase.answer_session_id

LEFT JOIN public.video_completion vc
ON vc.user_id = u.id
AND vc.video_version_id = ase.video_version_id

-- ga count 
LEFT JOIN ga_count gac
ON gac.answer_session_id = ase.answer_session_id