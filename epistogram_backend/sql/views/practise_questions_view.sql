SELECT 
	"subquery"."questionId" AS "id",
	"qa"."answerId",
	"a"."isCorrect",
	"qa"."creationDate" AS "answerDate",
	"qa"."isPractiseAnswer"
FROM (
	SELECT 
		"qa"."questionId" AS "questionId",
		"as"."userId" AS "userId",
		MAX("qa"."id") AS "questionAnswerId",
		"q"."questionText",

		SUM (CASE WHEN "qa"."isPractiseAnswer" = true THEN 1 ELSE 0 END) 
		AS "practiseAnswersCount"
	FROM public."question_answer" AS "qa"

	LEFT JOIN public."question" AS "q"
	ON "q"."id" = "qa"."questionId"
	
	LEFT JOIN public."answer_session" AS "as"
	ON "as"."id" = "qa"."answerSessionId"

	GROUP BY 
		"qa"."questionId",
		"as"."userId",
		"q"."questionText"

	ORDER BY
		"qa"."questionId"
) AS "subquery"

LEFT JOIN public."question_answer" AS "qa"
ON "subquery"."questionAnswerId" = "qa"."id"

LEFT JOIN public."answer" AS "a"
ON "qa"."answerId" = "a"."id"

WHERE 
	-- incorrect video answer 6h ago
	"qa"."isPractiseAnswer" = false AND  
	"a"."isCorrect" IS NULL AND 
	"qa"."creationDate" + INTERVAL '6 HOURS' < NOW() OR
	
	-- correct video answer 24h ago
	"qa"."isPractiseAnswer" = false AND  
	"a"."isCorrect" = true AND 
	"qa"."creationDate" + INTERVAL '24 HOURS' < NOW() 
















