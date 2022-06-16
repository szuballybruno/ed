WITH 
latest_question_versions AS
(
	SELECT MAX(qv.id) version_id, qv.question_id
	FROM public.question_version qv
	GROUP BY qv.question_id
),
asd AS
(
	SELECT
		u.id user_id,
		u.email,
		ptc.id personality_trait_category_id,
		COUNT(lgav.id) given_answer_count,
		COALESCE(SUM((lgav.is_correct IS NOT DISTINCT FROM true)::int), 0)::int max_score,
		COALESCE(SUM((lgav.is_correct IS NOT DISTINCT FROM false)::int), 0)::int min_score
	FROM public.personality_trait_category ptc
	
	CROSS JOIN public.user u
	
	LEFT JOIN public.question q
	ON q.personality_trait_category_id = ptc.id
	
	LEFT JOIN 
	
	
	LEFT JOIN public.latest_given_answer_view lgav
	ON lgav.question_version_id = q.id 
	AND lgav.user_id = u.id
	
	GROUP BY 
		u.id,
		ptc.id
	
	ORDER BY 
		u.id,
		ptc.id
)
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
	
) ptca
ON ptca.personality_trait_category_id = ptc.id 
AND ptca.user_id = u.id

ORDER BY u.id, ptc.id