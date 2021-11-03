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
	var_given_answer_id integer;

BEGIN

	-- select correct answer ids 
	SELECT ARRAY
	(
		SELECT "a"."id"	
		FROM public."answer" AS "a"
		WHERE "a"."questionId" = "p_questionId" 
			AND "a"."isCorrect" = true
	)		
	INTO "var_correctAnswerIds";
	
	-- insert new given answer
	INSERT INTO public."given_answer"
	(
		"creationDate",
		"isPractiseAnswer",
		"questionId",
		"answerSessionId",
		"isCorrect"
	)
	VALUES
	(
		NOW(),
		"p_isPractiseAnswer",
		"p_questionId",
		"p_answerSessionId",
		"var_correctAnswerIds" = "p_answerIds"
	)
	RETURNING "id" 
	INTO var_given_answer_id;

	-- insert answer given answer bridges 
	INSERT INTO public."answer_given_answer_bridge" 
	(
		"givenAnswerId",
		"answerId"
	)
	SELECT 
		var_given_answer_id,
		"answer_ids".*
	FROM UNNEST ("p_answerIds") AS "answer_ids";
	
	-- return correct answer ids
	RETURN "var_correctAnswerIds";
END 
$$ LANGUAGE 'plpgsql';

-- SELECT public.answer_question_fn(
-- 	17, 
-- 	40, 
-- 	ARRAY[85,87], 
-- 	false
-- )