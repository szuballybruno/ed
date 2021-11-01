
-- DROP FUNCTION testsp;

CREATE OR REPLACE FUNCTION "answer_question_fn"
(
	"p_answerSessionId" integer,
	"p_questionId" integer,
	"p_answerIds" integer[],
	"p_isPractiseAnswer" boolean
)
RETURNS integer[]
AS $$ 

DECLARE
	"var_correctAnswerIds" integer[]; 
	var_answer_id integer;

BEGIN

	SELECT ARRAY
	(
		SELECT "a"."id"	
		FROM public."answer" AS "a"
		WHERE "a"."questionId" = "p_questionId" 
			AND "a"."isCorrect" = true
	)		
	INTO "var_correctAnswerIds";

	INSERT INTO public."question_answer" 
	(
		"creationDate",
		"isPractiseAnswer",
		"questionId",
		"answerId",
		"answerSessionId"
	)
	SELECT 
		NOW(),
		"p_isPractiseAnswer",
		"p_questionId",
		"answer_ids".*,
		"p_answerSessionId"
	FROM UNNEST ("p_answerIds") AS "answer_ids";
	
	RETURN "var_correctAnswerIds";
END 
$$ LANGUAGE 'plpgsql';

SELECT public.answer_question_fn(
	17, 
	40, 
	ARRAY[85,87], 
	false
)