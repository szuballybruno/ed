SELECT 
	u.id user_id,
	co.id course_id,
	pua_per_week.answer_id,
	pa.text answer_text,
	pa.value estimated_hours_per_week,
	pa.value * 60 * 60 estimated_seconds_per_week
FROM public.user u

CROSS JOIN public.course co

LEFT JOIN public.prequiz_user_answer pua_per_week
ON pua_per_week.user_id = u.id 
	AND pua_per_week.question_id = 4 
	AND pua_per_week.course_id = co.id 

LEFT JOIN public.prequiz_answer pa
ON pa.id = pua_per_week.answer_id

ORDER BY
	u.id,
	co.id