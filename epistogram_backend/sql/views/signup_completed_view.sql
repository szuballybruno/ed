SELECT 
	"u"."id" AS "user_id",
	"essv"."is_completed_session" AS "is_signup_complete"
FROM "user" AS "u"

LEFT JOIN public."exam_session_success_view" AS "essv" 
	ON "essv"."user_id" = "u"."id" 
		AND "essv"."is_signup_answer_session" = true
		
ORDER BY
	"u"."id"