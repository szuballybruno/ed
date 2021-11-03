SELECT 
	"u"."id" AS "userId",
	"essv"."isCompletedSession" AS "isSignupComplete"
FROM "user" AS "u"

LEFT JOIN public."exam_session_success_view" AS "essv" 
	ON "essv"."userId" = "u"."id" 
		AND "essv"."isSignupAnswerSession" = true
		
ORDER BY
	"u"."id"