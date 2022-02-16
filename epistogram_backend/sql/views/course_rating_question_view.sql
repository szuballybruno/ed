SELECT 
	crg.id group_id,
	crg.name group_name,
	crq.id question_id,
	crq.text question_text,
	crq.type question_type
FROM public.course_rating_group crg

LEFT JOIN public.course_rating_question crq
ON crq.course_rating_group_id = crg.id