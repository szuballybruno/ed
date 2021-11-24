SELECT 
	*
FROM 
(
	SELECT
		"usa"."userId",
		"usa"."creationDate" AS "creationDate"
	FROM public."user_session_activity" AS "usa"
) AS "sq"

GROUP BY
	"sq"."userId",
	"sq"."creationDate"

ORDER BY
	"sq"."userId",
	"sq"."creationDate"
