SELECT 
	u.id user_id,
	assv.is_completed is_signup_complete
FROM public.user u

LEFT JOIN public.answer_session_view assv 
	ON assv.user_id = u.id 
		AND assv.exam_id = 1
		
ORDER BY
	u.id