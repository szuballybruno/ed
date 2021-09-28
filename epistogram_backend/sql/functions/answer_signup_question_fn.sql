
-- DROP FUNCTION testsp;

CREATE OR REPLACE FUNCTION "answer_signup_question_fn"
(
	"p_userId" integer,
	"p_questionId" integer,
	"p_answerId" integer
)
RETURNS void 
AS $$ 

DECLARE
	"signupAnswerSessionId" integer; 

BEGIN

	SELECT 
		"as"."id"
	INTO "signupAnswerSessionId"
	FROM public."answer_session" AS "as"
	WHERE "as"."examId" = 1 
		AND "as"."userId" = "p_userId";

	INSERT INTO public."question_answer" 
	(
		"creationDate",
		"isPractiseAnswer",
		"questionId",
		"answerId",
		"answerSessionId"
	)
	VALUES 
	(
		NOW(),
		false,
		"p_questionId",
		"p_answerId",
		"signupAnswerSessionId"
	);
	
END 
$$ LANGUAGE 'plpgsql';

-- userId
-- questionId
-- answerId
-- SELECT answer_signup_question_fn(1, 1, 1);

-- select * from output_table