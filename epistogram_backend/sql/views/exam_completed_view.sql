SELECT 
	"u"."id" AS "user_id",
	"e"."id" AS "exam_id",
	"e"."course_id" AS "course_id",
	"e"."is_final_exam" AS "is_final_exam",
	"e"."order_index" AS "order_index",
	SUM ("essv"."is_completed_session"::int) AS "completed_session_count",
	SUM ("essv"."is_completed_session"::int) > 0 AS "has_completed_session",
	
	SUM ("essv"."is_successful_session"::int) AS "successful_session_count",
	SUM ("essv"."is_successful_session"::int) > 0 AS "has_successful_session",
	
	SUM ("essv"."is_successful_session"::int) = 1 AS "single_successful_session"
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."exam_session_success_view" AS "essv"
ON "essv"."exam_id" = "e"."id"
	AND "essv"."user_id" = "u"."id"

GROUP BY
	"e"."id",
	"u"."id",
	"e"."course_id",
	"e"."order_index",
	"e"."is_final_exam"
	
ORDER BY 
	"u"."id",
	"e"."id"