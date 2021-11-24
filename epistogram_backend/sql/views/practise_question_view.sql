SELECT 
	"subquery".*,
	"q"."question_text",
	"q"."type_id" AS "question_type_id",
	"a"."id" AS "answer_id",
	"a"."text" AS "answer_text"
FROM (
	SELECT 
	"u"."id" AS "user_id",
	"q"."id" AS "question_id",
	MAX("ga"."id") AS "latest_given_answer_id",
	COUNT ("ga"."id") AS "given_answer_count",
	SUM ("ga"."is_practise_answer"::INT) AS "practise_answer_count"
	FROM public."question" AS "q"

	LEFT JOIN public."user" AS "u"
	ON 1 = 1

	LEFT JOIN public."given_answer" AS "ga"
	ON "ga"."question_id" = "q"."id"

	INNER JOIN public."answer_session" AS "as"
	ON "as"."id" = "ga"."answer_session_id"
		AND "as"."user_id" = "u"."id"

	WHERE 
		"q"."exam_id" IS NULL

	GROUP BY 
		"u"."id",
		"q"."id"

	ORDER BY 
		"u"."id",
		"q"."id"
) AS "subquery"

LEFT JOIN public."given_answer" AS "ga"
ON "ga"."id" = "subquery"."latest_given_answer_id"

LEFT JOIN public."question" AS "q"
ON "q"."id" = "subquery"."question_id"

LEFT JOIN public."answer" AS "a"
ON "a"."question_id" = "q"."id"

WHERE 
(
	"subquery"."practise_answer_count" < 2
)
AND 
(
	(
		-- incorrect video answer 6h ago
		"ga"."is_practise_answer" = false 
		AND  
		"ga"."is_correct" IS DISTINCT FROM true
		AND 
		"ga"."creation_date" + INTERVAL '5 MINUTES' < NOW() 
	)
	OR
	(
		-- correct video answer 24h ago
		"ga"."is_practise_answer" = false 
		AND  
		"ga"."is_correct" = true 
		AND 
		"ga"."creation_date" + INTERVAL '20 MINUTES' < NOW() 
	)
	OR
	(
		-- incorrect practise answer 48h ago
		"ga"."is_practise_answer" = true 
		AND  
		"ga"."is_correct" IS DISTINCT FROM true
		AND 
		"ga"."creation_date" + INTERVAL '60 MINUTES' < NOW() 
	)
)

ORDER BY 
	"subquery"."user_id",
	"subquery"."question_id",
	"a"."id"













