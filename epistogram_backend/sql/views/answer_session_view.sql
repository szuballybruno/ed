WITH jq AS 
(
	SELECT 
		sq.question_id,
		ga.id given_answer_id,
		ga.answer_session_id,
		ga.is_correct
	FROM (
		SELECT 
			q.id question_id,
			MAX(ga.id) latest_given_answer_id
		FROM public.question q

		LEFT JOIN public.given_answer ga
		ON ga.question_id = q.id

		GROUP BY
			q.id
	) sq
	
	LEFT JOIN public.given_answer ga
	ON ga.id = sq.latest_given_answer_id
)
SELECT 
	ase.id answer_session_id,
	u.id user_id,
	e.id exam_id,
	e.course_id course_id,
	
	-- total_question_count
	CASE WHEN e.id IS NULL 
		THEN (
			SELECT COUNT(jq.question_id)::int
			FROM jq
			WHERE jq.answer_session_id = ase.id
		)
		ELSE question_count.question_count
	END total_question_count,
	
	-- answered_question_count
	COALESCE(jq_details.answered_question_count, 0) answered_question_count,
	
	-- is_completed
	COALESCE(question_count.question_count = jq_details.answered_question_count 
		AND jq_details.answered_question_count > 0, false) is_completed,
		
	-- correct_answer_count
	COALESCE(jq_details.correct_answer_count, 0) correct_answer_count,
	
	-- is_successful
	COALESCE(question_count.question_count = jq_details.correct_answer_count 
		AND jq_details.answered_question_count > 0, false) is_successful,
		
	-- correct_answer_rate
	COALESCE(CASE WHEN question_count.question_count > 0
		THEN jq_details.correct_answer_count / question_count.question_count * 100
		ELSE 0
	END, 0) correct_answer_rate
	
FROM public.answer_session ase

LEFT JOIN public.exam e
ON e.id = ase.exam_id

LEFT JOIN public.user u
ON u.id = ase.user_id

LEFT JOIN 
(
	SELECT 
		e.id exam_id,
		COUNT(q.id)::int question_count
	FROM public.exam e
	LEFT JOIN public.question q
	ON q.exam_id = e.id
	GROUP BY e.id
) question_count
ON question_count.exam_id = e.id

LEFT JOIN 
(
	SELECT 
		jq1.answer_session_id,
		COUNT(jq2.question_id)::int answered_question_count,
		COALESCE(SUM((jq2.is_correct IS NOT DISTINCT FROM true)::int)::int, 0) correct_answer_count
	FROM jq jq1
	
	LEFT JOIN jq jq2
	ON jq2.answer_session_id = jq1.answer_session_id
	
	GROUP BY
		jq1.answer_session_id
) jq_details
ON jq_details.answer_session_id = ase.id

-- SELECT 
-- 	u.id user_id,
-- 	e.id exam_id,
-- 	e.course_id course_id,
-- 	ase.id answer_session_id,
-- 	COUNT(q.id) = COUNT(ga.id) AND ase.id IS NOT NULL is_completed,
-- 	COUNT(q.id)::int total_question_count,
-- 	COUNT(ga.id)::int answered_question_count,
-- 	SUM((ga.is_correct IS NOT DISTINCT FROM true)::int)::int correct_answer_count,
-- 	COUNT(q.id) = SUM((ga.is_correct IS NOT DISTINCT FROM true)::int) AND COUNT(q.id) > 0 is_successful,
-- 	CASE WHEN COUNT(q.id) > 0 THEN (SUM((ga.is_correct IS NOT DISTINCT FROM true)::int) / COUNT(q.id) * 100)::int ELSE 0 END correct_answer_rate
-- FROM public.exam e

-- LEFT JOIN public.user u 
-- ON 1 = 1

-- LEFT JOIN public.question q
-- ON q.exam_id = e.id

-- LEFT JOIN public.answer_session ase 
-- ON ase.exam_id = e.id
-- 	AND ase.user_id = u.id
	
-- LEFT JOIN public.given_answer ga
-- ON ga.answer_session_id = ase.id
-- 	AND ga.question_id = q.id

-- GROUP BY 
-- 	u.id,
-- 	e.id,
-- 	e.course_id,
-- 	ase.id
	
-- ORDER BY
-- 	u.id,
-- 	e.id