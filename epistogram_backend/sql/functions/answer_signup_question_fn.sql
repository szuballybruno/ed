
-- DROP FUNCTION testsp;

CREATE OR REPLACE FUNCTION "answer_signup_question_fn"
(
	"p_user_id" integer,
	"p_question_id" integer,
	"p_answer_id" integer
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
	WHERE "as"."exam_id" = 1 
		AND "as"."user_id" = "p_user_id";

	PERFORM answer_question_fn(
		var_signup_answer_session_id,
		"p_question_id",
		ARRAY["p_answer_id"],
		false
	);
	
END 
$$ LANGUAGE 'plpgsql';