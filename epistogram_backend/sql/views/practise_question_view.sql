SELECT 
	"subquery".* 
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

	LEFT JOIN public."answer_session" AS "as"
	ON "as"."id" = "ga"."answerSessionId"
		AND "as"."userId" = "u"."id"

	WHERE 
		"as"."videoId" IS NOT NULL

	GROUP BY 
		"u"."id",
		"q"."id"

	ORDER BY 
		"u"."id",
		"q"."id"
) AS "subquery"

LEFT JOIN public."given_answer" AS "ga"
ON "ga"."id" = "subquery"."latestGivenAnswerId"

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
	
-- Comment: Getting the latest GA by it's timestamp rather than it's id. Might be useful later. 

-- LEFT JOIN 
-- (
-- 	SELECT 
-- 		"as"."userId",
-- 		"ga"."questionId",
-- 		"ga"."id",
-- 		"ga"."creationDate",
-- 		ROW_NUMBER() OVER 
-- 			(
-- 				PARTITION BY "as"."userId", "ga"."questionId"
-- 				ORDER BY "ga"."creationDate" DESC
-- 			) = 1 AS "isLatest"
-- 	FROM public."given_answer" AS "ga"

-- 	LEFT JOIN public."answer_session" AS "as"
-- 	ON "as"."id" = "ga"."answerSessionId"
	
-- 	WHERE 
-- 		"as"."videoId" IS NOT NULL
	
-- 	ORDER BY 
-- 		"as"."userId",
-- 		"ga"."questionId",
-- 		"ga"."creationDate" DESC
-- ) AS "lga" 
-- ON "lga"."isLatest" = true
-- 	AND "lga"."questionId" = "q"."id"
-- 	AND "lga"."userId" = "u"."id"



-- SELECT 
-- 	"subquery"."questionId" AS "id",
-- 	"subquery"."userId" AS "userId",
-- 	"subquery"."practiseAnswerCount",
-- 	"qa"."answerId",
-- 	"a"."isCorrect",
-- 	"qa"."creationDate" AS "answerDate",
-- 	"qa"."isPractiseAnswer"
-- FROM (
-- 	SELECT 
-- 		"ga"."questionId" AS "questionId",
-- 		"as"."userId" AS "userId",
-- 		MAX("ga"."id") AS "questionAnswerId",
-- 		SUM ("ga"."isPractiseAnswer"::INT) AS "practiseAnswerCount"
-- 	FROM public."given_answer" AS "ga"

-- 	LEFT JOIN public."question" AS "q"
-- 	ON "q"."id" = "qa"."questionId"
	
-- 	LEFT JOIN public."answer_session" AS "as"
-- 	ON "as"."id" = "qa"."answerSessionId"
	
-- 	WHERE "q"."examId" IS NULL 

-- 	GROUP BY 
-- 		"qa"."questionId",
-- 		"as"."userId",
-- 		"q"."questionText"

-- 	ORDER BY
-- 		"qa"."questionId"
-- ) AS "subquery"

-- LEFT JOIN public."question_answer" AS "qa"
-- ON "subquery"."questionAnswerId" = "qa"."id"

-- LEFT JOIN public."answer" AS "a"
-- ON "qa"."answerId" = "a"."id"

-- WHERE 
-- 	(
-- 		"subquery"."practiseAnswerCount" < 2
-- 	)
-- 	AND 
-- 	(
-- 		(
-- 			-- incorrect video answer 6h ago
-- 			"qa"."isPractiseAnswer" = false 
-- 			AND  
-- 			"a"."isCorrect" IS DISTINCT FROM true
-- 			AND 
-- 			"qa"."creationDate" + INTERVAL '5 MINUTES' < NOW() 
-- 		)
-- 		OR
-- 		(
-- 			-- correct video answer 24h ago
-- 			"qa"."isPractiseAnswer" = false 
-- 			AND  
-- 			"a"."isCorrect" = true 
-- 			AND 
-- 			"qa"."creationDate" + INTERVAL '20 MINUTES' < NOW() 
-- 		)
-- 		OR
-- 		(
-- 			-- incorrect practise answer 48h ago
-- 			"qa"."isPractiseAnswer" = true 
-- 			AND  
-- 			"a"."isCorrect" IS DISTINCT FROM true
-- 			AND 
-- 			"qa"."creationDate" + INTERVAL '60 MINUTES' < NOW() 
-- 		)
-- 	)
















