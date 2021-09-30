SELECT
	 "esav".*,
	 "answer"."id" AS "answerId",
	 "answer"."isCorrect" AS "isCorrect",
	 "qc"."id" AS "categoryId",
	 "qc"."minLabel" AS "minLabel",
	 "qc"."maxLabel" AS "maxLabel"
FROM public."exam_session_answers_view" AS "esav"

LEFT JOIN public."question_answer" AS "qa"
ON "qa"."id" = "esav"."questionAnswerId"

LEFT JOIN public."question" AS "q"
ON "q"."id" = "esav"."questionId"

LEFT JOIN public."question_category" AS "qc"
ON "qc"."id" = "q"."categoryId"

LEFT JOIN public."answer"
ON "qa"."answerId" = "answer"."id"

WHERE "esav"."rank" = 1 AND "esav"."examId" = 1