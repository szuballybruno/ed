WITH
practise_question_ids AS 
(
	SELECT 
		qv.question_id, 
		ase.user_id,
		MAX(ga.id) latest_given_answer_id
	FROM public.question_version qv

	INNER JOIN public.given_answer ga
	ON ga.question_version_id = qv.id

	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id

	WHERE qv.video_version_id IS NOT NULL
	
	GROUP BY 
		qv.question_id, 
		ase.user_id
),
practise_question_counts AS 
(
	SELECT 
		pqi.question_id,
		pqi.user_id,
		COUNT(ga.id) practise_answer_count
	FROM practise_question_ids pqi
	
	LEFT JOIN public.question_version qv
	ON qv.question_id = pqi.question_id
	
	LEFT JOIN public.given_answer ga
	ON ga.question_version_id = qv.id
	
	INNER JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	AND ase.is_practise
	
	GROUP BY 
		pqi.question_id,
		pqi.user_id
),
practise_questions AS
(
	SELECT 
		pqi.question_id, 
		pqi.user_id
	FROM practise_question_ids pqi
	
	LEFT JOIN practise_question_counts pqc
	ON pqc.question_id = pqi.question_id
	AND pqc.user_id = pqi.user_id
	
	LEFT JOIN public.given_answer ga
	ON ga.id = pqi.latest_given_answer_id
	
	WHERE (pqc.practise_answer_count < 2) AND 
	(
		(
			-- incorrect video answer 
			ga.is_practise_answer = false 
			AND  
			ga.is_correct IS DISTINCT FROM true
			AND 
			ga.creation_date + INTERVAL '5 MINUTES' < NOW() 
		)
		OR
		(
			-- correct video answer 
			ga.is_practise_answer = false 
			AND  
			ga.is_correct = true 
			AND 
			ga.creation_date + INTERVAL '20 MINUTES' < NOW() 
		)
		OR
		(
			-- incorrect practise answer 
			ga.is_practise_answer = true 
			AND  
			ga.is_correct IS DISTINCT FROM true
			AND 
			ga.creation_date + INTERVAL '60 MINUTES' < NOW() 
		)
	)
),
latest_question_version AS 
(
	SELECT MAX(qv.id) version_id, qv.question_id
	FROM public.question_version qv
	GROUP BY qv.question_id
)
SELECT
	qv.id question_version_id,
	qd.question_text,
	qd.type_id question_type_id,
	av.id answer_id,
	ad.text answer_text
FROM practise_questions pq

LEFT JOIN latest_question_version lqv
ON lqv.question_id = pq.question_id

LEFT JOIN public.question_version qv
ON qv.id = lqv.version_id

LEFT JOIN public.question_data qd
ON qd.id = qv.question_data_id

LEFT JOIN public.answer_version av
ON av.question_version_id = qv.id

LEFT JOIN public.answer_data ad
ON ad.id = av.answer_data_id













