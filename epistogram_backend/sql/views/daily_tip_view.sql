WITH user_trait_choices AS
(
	SELECT 
		ptv.user_id,
		ptv.personality_trait_category_id,
		ptv.max_score > ptv.min_score is_max
	FROM public.personality_trait_view ptv
)
SELECT 
	dt.id daily_tip_id,
	u.id user_id,
	dt.description,
	dt.personality_trait_category_id,
	sf.file_path video_file_path,
	latest_occurance.latest_creation_date last_occurrence_date,
	latest_occurance.latest_creation_date IS NULL is_new,
	latest_occurance.latest_creation_date::date IS NOT DISTINCT FROM NOW()::date is_current_tip,
	dt.is_max tip_is_max,
	utc.is_max user_choice_in_category_is_max
FROM daily_tip dt

CROSS JOIN public.user u

LEFT JOIN 
(
	SELECT 
		dto.user_id, 
		MAX(dto.creation_date) latest_creation_date 
	FROM public.daily_tip_occurrence dto
	GROUP BY dto.user_id 
) latest_occurance
ON latest_occurance.user_id = u.id

LEFT JOIN storage_file AS sf 
ON sf.id = dt.video_file_id

LEFT JOIN user_trait_choices utc
ON utc.user_id = u.id 
	AND utc.personality_trait_category_id = dt.personality_trait_category_id
	
WHERE dt.is_max = utc.is_max
	
ORDER BY
	u.id,
	latest_occurance.latest_creation_date DESC,
	dt.id