SELECT 
	"subquery"."userId",
	"subquery"."examId",
	"subquery"."courseId",
	"subquery"."orderIndex",
	"subquery"."isFinalExam",
	CAST(CASE WHEN 
		SUM("subquery"."isCompleteSession") > 0
		THEN 1 
		ELSE 0 
	END AS boolean) AS "isCompleted"
FROM (
	SELECT 
		"exam"."id" AS "examId",
		"exam"."courseId" AS "courseId",
		"exam"."orderIndex" AS "orderIndex",
		"exam"."isFinalExam" AS "isFinalExam",
		"answer_session"."id" AS "answerSessionId",
		"user"."id" AS "userId",
		COUNT ("answer"."isCorrect") AS "correctAnswerCount",
		COUNT ("question"."id") AS "questionCount",
		CASE WHEN 
			COUNT ("answer"."isCorrect") = COUNT ("question"."id") 
				AND COUNT ("answer"."isCorrect") > 0
			THEN 1
			ELSE 0
		END AS "isCompleteSession"
	FROM public."exam"

	LEFT JOIN public."user"
	ON 1 = 1

	LEFT JOIN public."question"
	ON "question"."examId" = "exam"."id"

	LEFT JOIN public."answer_session"
	ON "answer_session"."examId" = "exam"."id"

	LEFT JOIN public."question_answer"
	ON "question_answer"."answerSessionId" = "answer_session"."id"
		AND "question_answer"."questionId" = "question"."id"

	LEFT JOIN public."answer"
	ON "answer"."id" = "question_answer"."answerId"

	GROUP BY
		"exam"."id",
		"exam"."courseId",
		"exam"."orderIndex",
		"answer_session"."id",
		"exam"."isFinalExam",
		"user"."id"
) AS "subquery"

GROUP BY 
	"subquery"."examId", 	
	"subquery"."userId",
	"subquery"."courseId",
	"subquery"."isFinalExam",
	"subquery"."orderIndex" 