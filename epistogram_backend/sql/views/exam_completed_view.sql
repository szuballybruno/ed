SELECT 
	"u"."id" AS "userId",
	"e"."id" AS "examId",
	"e"."courseId" AS "courseId",
	"e"."isFinalExam" AS "isFinalExam",
	"e"."orderIndex" AS "orderIndex",
	SUM ("essv"."isSuccessfulSession"::int) AS "successfulSessionCount",
	SUM ("essv"."isSuccessfulSession"::int) > 0 AS "hasSuccessfulSession",
	SUM ("essv"."isSuccessfulSession"::int) = 1 AS "singleSuccessfulSession"
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."exam_session_success_view" AS "essv"
ON "essv"."examId" = "e"."id"
	AND "essv"."userId" = "u"."id"

GROUP BY
	"e"."id",
	"u"."id",
	"e"."courseId",
	"e"."orderIndex",
	"e"."isFinalExam"
	
ORDER BY 
	"u"."id",
	"e"."id"