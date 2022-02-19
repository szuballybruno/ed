SELECT 
	ptc.*,
	(
		SELECT COUNT(dt.id)::int
		FROM public.daily_tip dt 
		WHERE dt.is_max = false 
			AND dt.personality_trait_category_id = ptc.id 
	) min_tips_count,
	(
		SELECT COUNT(dt.id)::int
		FROM public.daily_tip dt 
		WHERE dt.is_max = true 
			AND dt.personality_trait_category_id = ptc.id 
	) max_tips_count
FROM public.personality_trait_category ptc