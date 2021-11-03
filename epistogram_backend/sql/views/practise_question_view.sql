-- SELECT 
-- 	"u"."id" AS "userId",
-- 	"q"."id" AS "questionId",
-- 	COUNT ("ga"."is")
-- FROM public."question" AS "q"

-- LEFT JOIN public."user" AS "u"
-- ON 1 = 1

-- LEFT JOIN public."given_answer" AS "ga"
-- ON "ga"."questionId" = "q"."id"

-- LEFT JOIN public."answer_session" AS "as"
-- ON "as"."id" = "ga"."answerSessionId"
-- 	AND "as"."userId" = "u"."id"

-- GROUP BY 
-- 	"u"."id",
-- 	"q"."id"




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
















