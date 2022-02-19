SELECT 
	*
FROM 
(
	SELECT
		"usa"."user_id",
		"usa"."creation_date" AS "creation_date"
	FROM public."user_session_activity" AS "usa"
) AS "sq"

GROUP BY
	"sq"."user_id",
	"sq"."creation_date"

ORDER BY
	"sq"."user_id",
	"sq"."creation_date"
