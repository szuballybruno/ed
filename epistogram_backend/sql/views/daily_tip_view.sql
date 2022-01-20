SELECT 
	dt.id daily_tip_id,
	u.id user_id,
	dt.description,
	sf.file_path video_file_path,
	latest_occurance.latest_creation_date last_occurrence_date,
	latest_occurance.latest_creation_date IS NULL is_new,
	latest_occurance.latest_creation_date::date IS NOT DISTINCT FROM NOW()::date is_current_tip
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
	
ORDER BY
	u.id,
	latest_occurance.latest_creation_date DESC,
	dt.id