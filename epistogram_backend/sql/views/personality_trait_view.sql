SELECT 
	u.id user_id,
	ptc.id personality_trait_category_id,
	ptc.title tarit_category_title,
	ptca.max_score,
	ptca.min_score,
	CASE WHEN ptca.max_score > ptca.min_score 
		THEN ptc.max_label 
		ELSE ptc.min_label
	END active_label,
	CASE WHEN ptca.max_score > ptca.min_score 
		THEN ptc.max_description 
		ELSE ptc.min_description
	END active_description,
	ptc.min_label,
	ptc.max_label,
	ptc.min_description,
	ptc.max_description
FROM public.personality_trait_category ptc

CROSS JOIN public.user u

LEFT JOIN 
(
	SELECT 
		u.id user_id,
		q.personality_trait_category_id,
		COALESCE(SUM((ga.is_correct IS NOT DISTINCT FROM true)::int), 0)::int max_score,
		COALESCE(SUM((ga.is_correct IS NOT DISTINCT FROM false)::int), 0)::int min_score
	FROM public.question q
	
	CROSS JOIN public.user u
	
	LEFT JOIN public.given_answer ga
	ON ga.question_id = q.id
	
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id AND ase.user_id = u.id
	
	WHERE q.personality_trait_category_id IS NOT NULL
	
	GROUP BY 
		u.id,
		q.personality_trait_category_id
	
	ORDER BY 
		u.id,
		q.personality_trait_category_id
) ptca
ON ptca.personality_trait_category_id = ptc.id AND ptca.user_id = u.id

ORDER BY u.id, ptc.id