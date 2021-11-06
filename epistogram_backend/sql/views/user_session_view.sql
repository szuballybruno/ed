SELECT 
	*
FROM 
(
	SELECT DISTINCT
		"usa"."userId",
		FIRST_VALUE("usa"."creationDate") OVER www AS "sessionStartDate",
		LAST_VALUE("usa"."creationDate") OVER www AS "sessionEndDate",
	-- 	first_value("usa"."id") OVER www AS first_id, 
	-- 	last_value("usa"."id") OVER www AS last_id, 
		LAST_VALUE("usa"."creationDate") OVER www - FIRST_VALUE("usa"."creationDate") OVER www AS "sessionLength"
	FROM public."user_session_activity" AS "usa"
	WINDOW www AS 
	(
		PARTITION BY "userId"
		ORDER BY "creationDate"
		RANGE BETWEEN '5 min' PRECEDING AND '5 min' FOLLOWING
	)
) AS "sq"

ORDER BY
	"sq"."userId",
	"sq"."sessionStartDate"