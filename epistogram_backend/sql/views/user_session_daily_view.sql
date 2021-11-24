SELECT 
	"sq"."user_id" AS "user_id",
	"sq"."date" AS "date",
	COUNT("sq"."session_start_date")::int AS "session_count"
FROM 
(
	SELECT 
		*,
		date_trunc('day', "usv"."session_start_date") AS "date"
	FROM public.user_session_view AS "usv"
) AS "sq"

GROUP BY 
	"sq"."user_id",
	"sq"."date"
	
ORDER BY 
	"sq"."user_id",
	"sq"."date" DESC