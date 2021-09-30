SELECT 
	"user"."id" AS "userId",
	"exam"."id" AS "examId",
	"question"."id" AS "questionId",
	"as"."id" AS "answerSessionId",
	"qa"."id" AS "questionAnswerId",
	"qa"."creationDate" AS "creationDate",
	RANK() OVER 
		(PARTITION BY 
			"user"."id",
			"exam"."id",
			"question"."id" 
		 ORDER BY 
			"qa"."creationDate" 
		 DESC) AS "rank"
FROM public."exam"

LEFT JOIN public."user"
ON 1 = 1

LEFT JOIN public."question"
ON "question"."examId" = "exam"."id"

LEFT JOIN public."answer_session" AS "as"
ON "as"."examId" = "exam"."id"
	AND "as"."userId" = "user"."id"

LEFT JOIN public."question_answer" AS "qa"
ON "qa"."answerSessionId" = "as"."id"
	AND "qa"."questionId" = "question"."id"

ORDER BY 
	"user"."id",
	"exam"."id",
	"question"."id",
	"qa"."creationDate"