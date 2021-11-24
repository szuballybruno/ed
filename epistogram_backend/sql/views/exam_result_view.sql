SELECT 
	"u"."id" AS "user_id",
	"e"."id" AS "exam_id",
	"e"."is_final_exam" AS "is_final_exam",
	"q"."id" AS "question_id",
	"q"."question_text" AS "question_text",
	"essv"."answer_session_id" AS "answer_session_id",
	"essv"."is_completed_session" AS "is_completed_session",
	"essv"."correct_given_answer_count" AS "correct_given_answer_count",
	"essv"."question_count" AS "question_count",
	"essv"."is_successful_session" AS "is_successful_session",
	"ecv"."single_successful_session" AND "essv"."is_successful_session" AS "only_successful_session",
	"ga"."id" AS "given_answer_id",
	"ga"."is_correct" AS "is_correct",
	"agab"."id" AS "answer_bridge_id",
	"agab"."answer_id" AS "user_answer_id",
	"a"."id" AS "answer_id",
	"a"."is_correct" IS NOT DISTINCT FROM true AS "is_answer_correct",
	"agab"."answer_id" = "a"."id" IS NOT DISTINCT FROM true AS "is_given_answer",
	"a"."text" AS "answer_text"
FROM public."exam" AS "e"

LEFT JOIN public."user" AS "u"
ON 1 = 1

LEFT JOIN public."question" AS "q"
ON "q"."exam_id" = "e"."id"
	
LEFT JOIN public."exam_session_success_view" AS "essv"
ON "essv"."exam_id" = "e"."id"
	AND "essv"."user_id" = "u"."id"
	
LEFT JOIN public."exam_completed_view" AS "ecv"
ON "ecv"."exam_id" = "e"."id"
	AND "ecv"."user_id" = "u"."id"

LEFT JOIN public."given_answer" AS "ga"
ON "ga"."answer_session_id" = "essv"."answer_session_id"
	AND "ga"."question_id" = "q"."id"

LEFT JOIN public."answer" AS "a"
ON "a"."question_id" = "q"."id"

LEFT JOIN public."answer_given_answer_bridge" AS "agab"
ON "agab"."given_answer_id" = "ga"."id"
	AND "agab"."answer_id" = "a"."id"

WHERE "e"."id" != 1

ORDER BY 
	"u"."id",
	"e"."id",
	"essv"."answer_session_id",
	"q"."id",
	"agab"."id"