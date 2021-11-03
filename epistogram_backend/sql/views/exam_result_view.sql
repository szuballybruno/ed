SELECT 
	"u"."id" AS "userId",
	"e"."id" AS "examId",
	"e"."isFinalExam" AS "isFinalExam",
	"q"."id" AS "questionId",
	"q"."questionText" AS "questionText",
	"essv"."answerSessionId" AS "answerSessionId",
	"essv"."isCompletedSession" AS "isCompletedSession",
	"essv"."correctGivenAnswerCount" AS "correctGivenAnswerCount",
	"essv"."questionCount" AS "questionCount",
	"essv"."isSuccessfulSession" AS "isSuccessfulSession",
	"ecv"."singleSuccessfulSession" AND "essv"."isSuccessfulSession" AS "onlySuccessfulSession",
	"ga"."id" AS "givenAnswerId",
	"ga"."isCorrect" AS "isCorrect",
	"agab"."id" AS "answerBridgeId",
	"agab"."answerId" AS "userAnswerId",
	"a"."id" AS "answerId",
	"a"."isCorrect" IS NOT DISTINCT FROM true AS "isAnswerCorrect",
	"agab"."answerId" = "a"."id" IS NOT DISTINCT FROM true AS "isGivenAnswer",
	"a"."text" AS "answerText"
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."question" AS "q"
ON "q"."examId" = "e"."id"
	
LEFT JOIN public."exam_session_success_view" AS "essv"
ON "essv"."examId" = "e"."id"
	AND "essv"."userId" = "u"."id"
	
LEFT JOIN public."exam_completed_view" AS "ecv"
ON "ecv"."examId" = "e"."id"
	AND "ecv"."userId" = "u"."id"

LEFT JOIN public."given_answer" AS "ga"
ON "ga"."answerSessionId" = "essv"."answerSessionId"
	AND "ga"."questionId" = "q"."id"

LEFT JOIN public."answer" AS "a"
ON "a"."questionId" = "q"."id"

LEFT JOIN public."answer_given_answer_bridge" AS "agab"
ON "agab"."givenAnswerId" = "ga"."id"
	AND "agab"."answerId" = "a"."id"

WHERE "e"."id" = 2

ORDER BY 
	"u"."id",
	"e"."id",
	"essv"."answerSessionId",
	"q"."id",
	"agab"."id"