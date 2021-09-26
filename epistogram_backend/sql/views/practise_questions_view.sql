SELECT 
	"qa"."questionId" AS "questionId",
	MAX("qa"."creationDate") AS "answerDate",
	"q"."questionText",
	
	SUM (CASE WHEN "qa"."isPractiseAnswer" = true THEN 1 ELSE 0 END) 
	AS "practiseAnswersCount"
FROM public."question_answer" AS "qa"

LEFT JOIN public."question" AS "q"
ON "q"."id" = "qa"."questionId"

GROUP BY 
	"qa"."questionId",
	"q"."questionText"
	
ORDER BY
	"qa"."questionId"
	
-- 	select * from question_answer