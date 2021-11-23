SELECT 
	"sq"."userId" AS "userId",
	"sq"."date" AS "date",
	COUNT("sq"."sessionStartDate")::int AS "sessionCount"
FROM 
(
	SELECT 
		*,
		date_trunc('day', "usv"."sessionStartDate") AS "date"
	FROM public.user_session_view AS "usv"
) AS "sq"

GROUP BY 
	"sq"."userId",
	"sq"."date"
	
ORDER BY 
	"sq"."userId",
	"sq"."date" DESC