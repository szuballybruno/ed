SELECT 
	"u"."id" AS "user_id",
	"q"."id" AS "question_id",
	"q"."question_text" AS "question_text",
	"q"."image_url" AS "image_url",
	"q"."type_id" AS "type_id",
	"a"."id" AS "answer_id",
	"a"."text" AS "answer_text",
	"ga"."id" AS "given_answer_id",
	"ga"."is_correct" AS "is_correct",
	"agab"."answer_id" AS "user_answer_id",
	"agab"."answer_id" = "a"."id" IS NOT DISTINCT FROM true AS "is_given_answer" 
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."question" AS "q"
ON "q"."exam_id" = "e"."id"

LEFT JOIN public."answer" AS "a"
ON "a"."question_id" = "q"."id"

LEFT JOIN public."answer_session" AS "as"
ON "as"."user_id" = "u"."id"
	AND "as"."is_signup_answer_session"
	
LEFT JOIN 
(
	SELECT 
		"ga".*,
		ROW_NUMBER() OVER (PARTITION BY "ga"."answer_session_id", "ga"."question_id" ORDER BY "ga"."creation_date" DESC) AS "order_index"
	FROM public."given_answer" AS "ga"
) AS "ga"
ON "ga"."question_id" = "q"."id"
	AND "ga"."answer_session_id" = "as"."id"
	AND "ga"."order_index" = 1

-- LEFT JOIN public."given_answer" AS "ga"
-- ON "ga"."question_id" = "q"."id"
-- 	AND "ga"."answer_session_id" = "as"."id"
	
LEFT JOIN public."answer_given_answer_bridge" AS "agab"
ON "agab"."given_answer_id" = "ga"."id"

WHERE "e"."id" = 1

ORDER BY
	 "u"."id",
	 md5("q"."id" || '1'),
	 "a"."id"
	 
	