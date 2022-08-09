WITH 
latest_question_versions AS
(
	SELECT 
		MAX(qv.id) version_id, 
		qv.personality_trait_category_id
	FROM public.question_version qv
	GROUP BY 
		qv.personality_trait_category_id
),
latest_given_answer AS
(
	SELECT MAX(ga.id) ga_id, ga.question_version_id, ase.user_id
	FROM public.given_answer ga
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	GROUP BY ga.question_version_id, ase.user_id
),
calc_scores AS
(
	SELECT
		u.id user_id,
		u.email,
		ptc.id personality_trait_category_id,
		COUNT(ga.id) given_answer_count,
		COALESCE(SUM((ga.is_correct IS NOT DISTINCT FROM true)::int), 0)::int max_score,
		COALESCE(SUM((ga.is_correct IS NOT DISTINCT FROM false)::int), 0)::int min_score
	FROM public.personality_trait_category ptc
	
	CROSS JOIN public.user u
	
	LEFT JOIN latest_question_versions lqv
	ON lqv.personality_trait_category_id = ptc.id
	
	LEFT JOIN public.question_version qv
	ON qv.id = lqv.version_id
	
	LEFT JOIN latest_given_answer lga
	ON lga.question_version_id = qv.id 
	AND lga.user_id = u.id
	
	LEFT JOIN public.given_answer ga
	ON ga.id = lga.ga_id
	
	GROUP BY 
		u.id,
		ptc.id
	
	ORDER BY 
		u.id,
		ptc.id
)
SELECT 
	u.id user_id,
	ptc.id trait_category_id,
	ptc.title trait_category_title,
	cs.max_score,
	cs.min_score,
	CASE WHEN cs.max_score > cs.min_score 
		THEN ptc.max_label 
		ELSE ptc.min_label
	END active_label,
	CASE WHEN cs.max_score > cs.min_score 
		THEN ptc.max_description 
		ELSE ptc.min_description
	END active_description,
	ptc.min_label,
	ptc.max_label,
	ptc.min_description,
	ptc.max_description
FROM public.personality_trait_category ptc

CROSS JOIN public.user u

LEFT JOIN calc_scores cs
ON cs.personality_trait_category_id = ptc.id 
AND cs.user_id = u.id

ORDER BY 
	u.id
