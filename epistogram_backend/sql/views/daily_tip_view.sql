SELECT 
	dt.id AS "daily_tip_id",
	dt.description AS "description",
	sf."file_path" AS "video_file_path",
	COUNT (oc.id) AS "occurrence_count",
	MAX (oc."creation_date") AS "last_occurrence_date",
	MAX (oc."creation_date")::date IS NOT DISTINCT FROM NOW()::date AS "is_current_tip"
	
FROM daily_tip 
AS dt

LEFT JOIN storage_file AS sf 
ON sf.id = dt."video_file_id"

LEFT JOIN daily_tip_occurrence AS oc
ON oc."daily_tip_id" = dt.id 

GROUP BY 
	dt.id, 
	dt.description,
	sf."file_path"
	
ORDER BY
	COUNT (oc.id) ASC,
	dt.id