
-- DROP FUNCTION testsp;

CREATE OR REPLACE FUNCTION "answer_question_fn"
(
	"p_answerSessionId" integer,
	"p_questionId" integer,
	"p_answerId" integer
)
RETURNS integer 
AS $$ 

DECLARE
	"correctAnswerId" integer; 

BEGIN

	SELECT 
		"a"."id"
	INTO "correctAnswerId"
	FROM public."answer" AS "a"
	WHERE "a"."questionId" = "p_questionId" 
		AND "a"."isCorrect" = true;

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
		"p_answerSessionId"
	);
	
	RETURN "correctAnswerId";
	
END 
$$ LANGUAGE 'plpgsql';

-- select * from answer where "questionId" = 37

-- select answer_question_fn(6, 37, 75)

-- userId
-- questionId
-- answerId
-- SELECT answer_signup_question_fn(1, 1, 1);

-- select * from output_table