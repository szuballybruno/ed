
-- DROP FUNCTION testsp;

CREATE OR REPLACE FUNCTION answer_signup_question_fn
(
	param_user_id integer,
	param_question_id integer,
	param_answer_id integer
)
RETURNS void 
AS $$ 

DECLARE
	var_signup_answer_session_id integer; 
	var_is_correct boolean;
	var_given_answer_id integer;

BEGIN

	-- get signup answer session id
	SELECT 
		ase.id
	INTO var_signup_answer_session_id
	FROM public.answer_session ase
	WHERE ase.exam_id = 1 
		AND ase.user_id = param_user_id;
		
	-- is correct 
	SELECT ans.is_correct
	FROM public.answer ans
	WHERE ans.id = param_answer_id
	INTO var_is_correct;

	-- GIVEN ANSWER 
	INSERT INTO public.given_answer
	(
		creation_date,
		question_id,
		answer_session_id,
		is_correct,
		elapsed_seconds
	)
	VALUES
	(
		NOW(),
		param_question_id,
		var_signup_answer_session_id,
		var_is_correct,
		0
	)
	RETURNING id
	INTO var_given_answer_id;

	-- ANSWER <-> GIVEN ANSWER BRIDGES  
	INSERT INTO public.answer_given_answer_bridge 
	(
		given_answer_id,
		answer_id
	)
	VALUES
	(
		var_given_answer_id,
		param_answer_id
	);
END 
$$ LANGUAGE 'plpgsql';