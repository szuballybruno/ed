SELECT 
	u.id user_id,
	co.id course_id,
	crg.id group_id,
	crg.name group_name,
	crq.id question_id,
	crq.text question_text,
	crq.type question_type,
	crqua.value answer_value,
	crqua.text answer_text
FROM public.course_rating_group crg

LEFT JOIN public.course_rating_question crq
ON crq.course_rating_group_id = crg.id

CROSS JOIN public.user u

CROSS JOIN public.course co

LEFT JOIN public.course_rating_question_user_answer crqua
ON crqua.user_id = u.id 
	AND crqua.course_id = co.id 
	AND crqua.course_rating_question_id = crq.id
	
ORDER BY 
	u.id,
	co.id,
	crg.id,
	crq.id