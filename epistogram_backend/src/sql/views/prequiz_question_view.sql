SELECT 
	pq.id question_id,
	pq.text question_text,
	pq.is_numeric_answer is_numeric_answer,
	pa.id answer_id,
	pa.text answer_text
FROM public.prequiz_question pq

LEFT JOIN public.prequiz_answer pa
ON pa.question_id = pq.id

ORDER BY 
	pq.id,
	pa.id