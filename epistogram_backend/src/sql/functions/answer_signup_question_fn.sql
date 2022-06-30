
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
	var_answer_version_id integer;
	var_question_version_id integer;
	var_given_answer_id integer;

BEGIN

	-- get signup answer session id
	SELECT 
		ase.id
	FROM public.answer_session ase

	LEFT JOIN public.exam_version ev
	ON ev.id = ase.exam_version_id

	WHERE ev.exam_id = 1 
		AND ase.user_id = param_user_id
	INTO var_signup_answer_session_id;
		
	-- question version id
	SELECT
		qv.id question_version_id
	FROM public.question_version qv

	WHERE qv.exam_version_id = 1
	AND qv.question_id = param_question_id

	INTO var_question_version_id;

	-- answer version id
	SELECT
		av.id answer_version_id
	FROM public.question_version qv

	LEFT JOIN public.answer_version av
	ON av.question_version_id = qv.id

	WHERE qv.exam_version_id = 1
	AND qv.question_id = param_question_id
	AND av.answer_id = param_answer_id

	INTO var_answer_version_id;

	-- is correct
	SELECT 
		ad.is_correct
	FROM public.answer_version av

	LEFT JOIN public.answer_data ad
	ON ad.id = av.answer_data_id

	WHERE av.id = var_answer_version_id 

	INTO var_is_correct;

	-- GIVEN ANSWER 
	INSERT INTO public.given_answer
	(
		creation_date,
		question_version_id,
		answer_session_id,
		is_correct,
		elapsed_seconds
	)
	VALUES
	(
		NOW(),
		var_question_version_id,
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
		answer_version_id
	)
	VALUES
	(
		var_given_answer_id,
		var_answer_version_id
	);
END 
$$ LANGUAGE 'plpgsql';