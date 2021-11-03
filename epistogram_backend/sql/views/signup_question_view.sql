SELECT 
	"u"."id" AS "userId",
	"q"."id" AS "questionId",
	"q"."questionText" AS "questionText",
	"q"."imageUrl" AS "imageUrl",
	"q"."typeId" AS "typeId",
	"a"."id" AS "answerId",
	"a"."text" AS "answerText",
	"ga"."id" AS "givenAnswerId",
	"ga"."isCorrect" AS "isCorrect",
	"agab"."answerId" AS "userAnswerId",
	"agab"."answerId" = "a"."id" IS NOT DISTINCT FROM true AS "isGivenAnswer" 
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."question" AS "q"
ON "q"."examId" = "e"."id"

LEFT JOIN public."answer" AS "a"
ON "a"."questionId" = "q"."id"

LEFT JOIN public."answer_session" AS "as"
ON "as"."userId" = "u"."id"
	AND "as"."isSignupAnswerSession"
	
LEFT JOIN 
(
	SELECT 
		"ga".*,
		ROW_NUMBER() OVER (PARTITION BY "ga"."answerSessionId", "ga"."questionId" ORDER BY "ga"."creationDate" DESC) AS "orderIndex"
	FROM public."given_answer" AS "ga"
) AS "ga"
ON "ga"."questionId" = "q"."id"
	AND "ga"."answerSessionId" = "as"."id"
	AND "ga"."orderIndex" = 1

-- LEFT JOIN public."given_answer" AS "ga"
-- ON "ga"."questionId" = "q"."id"
-- 	AND "ga"."answerSessionId" = "as"."id"
	
LEFT JOIN public."answer_given_answer_bridge" AS "agab"
ON "agab"."givenAnswerId" = "ga"."id"

WHERE "e"."id" = 1

ORDER BY
	 "u"."id",
	 md5("q"."id" || '1'),
	 "a"."id"
	 
	