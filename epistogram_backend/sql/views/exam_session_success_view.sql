SELECT 
	"u"."id" AS "userId",
	"e"."id" AS "examId",
	"e"."isFinalExam" AS "isFinalExam",
	"as"."id" AS "answerSessionId",
	"as"."isSignupAnswerSession" AS "isSignupAnswerSession", 
	SUM (("ga"."isCorrect" IS NOT DISTINCT FROM true)::INT) AS "correctGivenAnswerCount",
	COUNT ("ga"."id") AS "givenAnswerCount",
	COUNT ("q"."id") AS "questionCount",
	COUNT ("ga"."id") = COUNT ("q"."id")
		AND COUNT ("q"."id") > 0 AS "isCompletedSession",
	SUM (("ga"."isCorrect" IS NOT DISTINCT FROM true)::INT) = COUNT ("q"."id") 
		AND COUNT ("q"."id") > 0 AS "isSuccessfulSession"
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."question" AS "q"
ON "q"."examId" = "e"."id"

LEFT JOIN public."answer_session" AS "as"
ON "as"."examId" = "e"."id"
	AND "as"."userId" = "u"."id"

LEFT JOIN public."given_answer" AS "ga"
ON "ga"."answerSessionId" = "as"."id"
	AND "ga"."questionId" = "q"."id"

GROUP BY
	"e"."id",
	"e"."isFinalExam",
	"as"."id",
	"u"."id"
	
ORDER BY
	"u"."id",
	"e"."id",
	"as"."id"