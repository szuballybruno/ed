SELECT 
	dt.id AS "dailyTipId",
	dt.description AS "description",
	sf."filePath" AS "videoFilePath",
	COUNT (oc.id) AS "occurrenceCount",
	MAX (oc."creationDate") AS "lastOccurrenceDate",
	MAX (oc."creationDate")::date IS NOT DISTINCT FROM NOW()::date AS "isCurrentTip"
	
FROM daily_tip 
AS dt

LEFT JOIN storage_file AS sf 
ON sf.id = dt."videoFileId"

LEFT JOIN daily_tip_occurrence AS oc
ON oc."dailyTipId" = dt.id 

GROUP BY 
	dt.id, 
	dt.description,
	sf."filePath"
	
ORDER BY
	COUNT (oc.id) ASC,
	dt.id