
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
	"var_signup_answer_session_id" integer; 

BEGIN

	-- get signup answer session id
	SELECT 
		"as"."id"
	INTO "var_signup_answer_session_id"
	FROM public."answer_session" AS "as"
	WHERE "as"."examId" = 1 
		AND "as"."userId" = "p_userId";

	PERFORM answer_question_fn(
		var_signup_answer_session_id,
		"p_questionId",
		ARRAY["p_answerId"],
		false
	);
	
END 
$$ LANGUAGE 'plpgsql';