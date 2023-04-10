SELECT 
	u.id user_id,
	asev.is_completed  is_signup_complete
FROM public.user u

LEFT JOIN public.answer_session_view asv 
ON asv.user_id = u.id 
AND asv.exam_version_id = 1

LEFT JOIN public.answer_session_evaluation_view asev
ON asev.answer_session_id = asv.answer_session_id
		
ORDER BY
	u.id