SELECT DISTINCT
	"u"."id" AS "user_id",
	"q"."id" AS "question_id",
	"qc"."id" AS "category_id",
	"qc"."min_label" AS "min_label",
	"qc"."max_label" AS "max_label",
	"sqv"."given_answer_id" IS NOT NULL AS "is_answered",
	"sqv"."is_correct" IS NOT DISTINCT FROM true AS "is_correct",
	
	CASE WHEN "sqv"."given_answer_id" IS NOT NULL
		THEN 
			CASE WHEN "sqv"."is_correct"
				THEN "qc"."max_label"
				ELSE "qc"."min_label"
			END
		ELSE NULL
	END AS "active_label"
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."signup_question_view" AS "sqv"
ON "sqv"."user_id" = "u"."id"

LEFT JOIN public."question" AS "q"
ON "sqv"."question_id" = "q"."id"

LEFT JOIN public."question_category" AS "qc"
ON "qc"."id" = "q"."category_id"

WHERE "e"."id" = 1

ORDER BY 
	"u"."id",
	"q"."id",
	"qc"."id"