SELECT DISTINCT
	"u"."id" AS "userId",
	"q"."id" AS "questionId",
	"qc"."id" AS "categoryId",
	"qc"."minLabel" AS "minLabel",
	"qc"."maxLabel" AS "maxLabel",
	"sqv"."givenAnswerId" IS NOT NULL AS "isAnswered",
	"sqv"."isCorrect" IS NOT DISTINCT FROM true AS "isCorrect",
	
	CASE WHEN "sqv"."givenAnswerId" IS NOT NULL
		THEN 
			CASE WHEN "sqv"."isCorrect"
				THEN "qc"."maxLabel"
				ELSE "qc"."minLabel"
			END
		ELSE NULL
	END AS "activeLabel"
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."signup_question_view" AS "sqv"
ON "sqv"."userId" = "u"."id"

LEFT JOIN public."question" AS "q"
ON "sqv"."questionId" = "q"."id"

LEFT JOIN public."question_category" AS "qc"
ON "qc"."id" = "q"."categoryId"

WHERE "e"."id" = 1

ORDER BY 
	"u"."id",
	"q"."id",
	"qc"."id"