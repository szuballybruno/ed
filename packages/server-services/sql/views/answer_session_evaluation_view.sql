WITH 
non_practise_answer_sessions AS 
(
	SELECT ase.* FROM public.answer_session_view ase
	WHERE ase.answer_session_type <> 'practise'
),
total_question_count AS 
(
	-- exam quesitons 
	SELECT 
		ev.id exam_version_id,
		NULL::int video_version_id,
		COUNT(qv.id)::int question_count
	FROM public.exam_version ev
	
	LEFT JOIN public.question_version qv
	ON qv.exam_version_id = ev.id
	
	GROUP BY
		ev.id
	
	UNION ALL
	
	-- video questions 
	SELECT 
		NULL::int exam_version_id,
		vv.id video_version_id,
		COUNT(qv.id)::int question_count
	FROM public.video_version vv
	
	LEFT JOIN public.question_version qv
	ON qv.video_version_id = vv.id
	
	GROUP BY
		vv.id
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
	COALESCE(tqc.question_count = gac.answered_count 
		AND gac.answered_count > 0, false) is_completed,
		
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

-- ga count 
LEFT JOIN ga_count gac
ON gac.answer_session_id = ase.answer_session_id