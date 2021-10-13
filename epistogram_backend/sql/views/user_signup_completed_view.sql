SELECT 
	"u"."id" AS "userId",
	COUNT("qa"."id") = COUNT("q"."id") AS "isCompletedSignup"
-- 	"q"."id" AS "signupQuestionId",
-- 	"qa"."id" AS "questionAnswerId"
FROM "user" AS "u"

LEFT JOIN public."answer_session" AS "as" 
	ON "u"."id" = "as"."userId" 
		AND "as"."isSignupAnswerSession" = true
	
LEFT JOIN public."question" AS "q"
	ON "q"."examId" = 1 -- signup exam id
	
lEFT JOIN public."question_answer" AS "qa"
	ON "qa"."answerSessionId" = "as"."id"
		AND "qa"."questionId" = "q"."id"
	
GROUP BY
	"u"."id"
		
ORDER BY
	"u"."id"