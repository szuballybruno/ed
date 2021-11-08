SELECT 
	"subquery".*,
	"q"."questionText",
	"q"."typeId" AS "questionTypeId",
	"a"."id" AS "answerId",
	"a"."text" AS "answerText"
FROM (
	SELECT 
	"u"."id" AS "userId",
	"q"."id" AS "questionId",
	MAX("ga"."id") AS "latestGivenAnswerId",
	COUNT ("ga"."id") AS "givenAnswerCount",
	SUM ("ga"."isPractiseAnswer"::INT) AS "practiseAnswerCount"
	FROM public."question" AS "q"

	LEFT JOIN public."user" AS "u"
	ON 1 = 1

	LEFT JOIN public."given_answer" AS "ga"
	ON "ga"."questionId" = "q"."id"

	INNER JOIN public."answer_session" AS "as"
	ON "as"."id" = "ga"."answerSessionId"
		AND "as"."userId" = "u"."id"

	WHERE 
		"q"."examId" IS NULL

	GROUP BY 
		"u"."id",
		"q"."id"

	ORDER BY 
		"u"."id",
		"q"."id"
) AS "subquery"

LEFT JOIN public."given_answer" AS "ga"
ON "ga"."id" = "subquery"."latestGivenAnswerId"

LEFT JOIN public."question" AS "q"
ON "q"."id" = "subquery"."questionId"

LEFT JOIN public."answer" AS "a"
ON "a"."questionId" = "q"."id"

WHERE 
(
	"subquery"."practiseAnswerCount" < 2
)
AND 
(
	(
		-- incorrect video answer 6h ago
		"ga"."isPractiseAnswer" = false 
		AND  
		"ga"."isCorrect" IS DISTINCT FROM true
		AND 
		"ga"."creationDate" + INTERVAL '5 MINUTES' < NOW() 
	)
	OR
	(
		-- correct video answer 24h ago
		"ga"."isPractiseAnswer" = false 
		AND  
		"ga"."isCorrect" = true 
		AND 
		"ga"."creationDate" + INTERVAL '20 MINUTES' < NOW() 
	)
	OR
	(
		-- incorrect practise answer 48h ago
		"ga"."isPractiseAnswer" = true 
		AND  
		"ga"."isCorrect" IS DISTINCT FROM true
		AND 
		"ga"."creationDate" + INTERVAL '60 MINUTES' < NOW() 
	)
)

ORDER BY 
	"subquery"."userId",
	"subquery"."questionId",
	"a"."id"













