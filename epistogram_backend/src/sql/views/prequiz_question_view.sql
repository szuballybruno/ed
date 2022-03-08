SELECT 
	pq.id question_id,
	pq.text question_text,
	pq.is_numeric_answer is_numeric_answer,
	pq.min_value,
	pq.max_value,
	pq.min_label,
	pq.max_label,
	pq.step_value,
	pq.value_postfix,
	pa.id answer_id,
	pa.text answer_text
FROM public.prequiz_question pq

LEFT JOIN public.prequiz_answer pa
ON pa.question_id = pq.id

ORDER BY 
	pq.id,
	pa.id