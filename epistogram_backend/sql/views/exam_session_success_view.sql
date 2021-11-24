SELECT 
	"sq".*,
	CASE WHEN "sq"."question_count" > 0
		THEN "sq"."correct_given_answer_count" / "sq"."question_count" * 100
		ELSE 0
	END AS "correct_answer_rate"
FROM 
(
	SELECT 
		"u"."id" AS "user_id",
		"e"."id" AS "exam_id",
		"e"."is_final_exam" AS "is_final_exam",
		"as"."id" AS "answer_session_id",
		"as"."is_signup_answer_session" AS "is_signup_answer_session", 
		SUM (("ga"."is_correct" IS NOT DISTINCT FROM true)::INT) AS "correct_given_answer_count",
		COUNT ("ga"."id") AS "given_answer_count",
		COUNT ("q"."id") AS "question_count",
		COUNT ("ga"."id") = COUNT ("q"."id")
			AND COUNT ("q"."id") > 0 AS "is_completed_session",
		SUM (("ga"."is_correct" IS NOT DISTINCT FROM true)::INT) = COUNT ("q"."id") 
			AND COUNT ("q"."id") > 0 AS "is_successful_session"
	FROM public."exam" AS "e"

	LEFT JOIN public."user" AS "u"
	ON 1 = 1

	LEFT JOIN public."question" AS "q"
	ON "q"."exam_id" = "e"."id"

	LEFT JOIN public."answer_session" AS "as"
	ON "as"."exam_id" = "e"."id"
		AND "as"."user_id" = "u"."id"

	LEFT JOIN public."given_answer" AS "ga"
	ON "ga"."answer_session_id" = "as"."id"
		AND "ga"."question_id" = "q"."id"

	GROUP BY
		"e"."id",
		"e"."is_final_exam",
		"as"."id",
		"u"."id"

	ORDER BY
		"u"."id",
		"e"."id",
		"as"."id"
) AS "sq"