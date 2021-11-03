SELECT
	"u"."id" AS "userId",
	"as"."id" AS "answerSessionId",
	"qc"."id" AS "categoryId",
	"qc"."minLabel" AS "minLabel",
	"qc"."maxLabel" AS "maxLabel",
	"ga"."isCorrect" AS "isCorrect"
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."answer_session" AS "as"
ON "as"."examId" = "e"."id"
	AND "as"."userId" = "u"."id"

LEFT JOIN public."given_answer" AS "ga"
ON "ga"."answerSessionId" = "as"."id"

LEFT JOIN public."question" AS "q"
ON "q"."examId" = "e"."id"

LEFT JOIN public."question_category" AS "qc"
ON "qc"."id" = "q"."categoryId"

WHERE "e"."id" = 1

ORDER BY 
	"u"."id",
	"qc"."id"