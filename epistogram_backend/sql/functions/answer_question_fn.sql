CREATE OR REPLACE FUNCTION "answer_question_fn"
(
	"p_answer_session_id" integer,
	"p_question_id" integer,
	"p_answer_ids" integer[],
	"p_is_practise_answer" boolean
)
RETURNS TABLE (correct_answer_ids integer[], given_answer_id integer) 
AS $$ 

DECLARE
	"var_correct_answer_ids" integer[]; 
	var_given_answer_id integer;

BEGIN

	-- select correct answer ids 
	SELECT ARRAY
	(
		SELECT "a"."id"	
		FROM public."answer" AS "a"
		WHERE "a"."question_id" = "p_question_id" 
			AND "a"."is_correct" = true
	)		
	INTO "var_correct_answer_ids";
	
	-- insert new given answer
	INSERT INTO public."given_answer"
	(
		"creation_date",
		"is_practise_answer",
		"question_id",
		"answer_session_id",
		"is_correct"
	)
	VALUES
	(
		NOW(),
		"p_is_practise_answer",
		"p_question_id",
		"p_answer_session_id",
		"var_correct_answer_ids" = "p_answer_ids"
	)
	RETURNING "id" 
	INTO var_given_answer_id;

	-- insert answer given answer bridges 
	INSERT INTO public."answer_given_answer_bridge" 
	(
		"given_answer_id",
		"answer_id"
	)
	SELECT 
		var_given_answer_id,
		"answer_ids".*
	FROM UNNEST ("p_answer_ids") AS "answer_ids";
	
	-- return correct answer ids
	RETURN QUERY SELECT
		var_correct_answer_ids,
		var_given_answer_id;
END 
$$ LANGUAGE 'plpgsql';