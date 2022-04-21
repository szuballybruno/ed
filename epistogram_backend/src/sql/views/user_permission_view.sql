SELECT 
	u.id,
	co.name owned_company_name
FROM public.user u

LEFT JOIN public.company_owner_bridge cob
	ON cob.user_id = u.id

LEFT JOIN public.company co
	ON co.id = cob.company_id

-- SELECT 
-- 	u.id user_id, 
-- 	ro.id role_id,
-- 	ro.name role_name,
-- 	activity.id activity_id,
-- 	activity.name activity_name
-- FROM public.user u

-- LEFT JOIN public.role_assignment_bridge rab
-- 	ON rab.user_id = u.id

-- LEFT JOIN public.company_owner_bridge cob
-- 	ON cob.user_id = u.id

-- LEFT JOIN public.company co
-- 	ON co.id = cob.company_id

-- LEFT JOIN public.role_assignment_bridge rab
-- 	ON rab.user_id = u.id

-- LEFT JOIN public.role ro
-- 	ON ro.id = u.role_id

-- LEFT JOIN public.role_activity_bridge rab
-- 	ON rab.role_id = ro.id
-- 		AND  ro.id <> 1 -- ignore bridges if rod_id = _administrator 

-- LEFT JOIN public.signup_completed_view uscv
-- 	ON uscv.user_id = u.id

-- LEFT JOIN public.activity
-- 	ON rab.activity_id = activity.id

-- 	-- join all if rod_id = _administrator
-- 	OR ro.id = 1 

-- 	--if signup is completed	
-- 	OR (activity.id = 4 AND uscv.is_signup_complete AND u.is_trusted)
