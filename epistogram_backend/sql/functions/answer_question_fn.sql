-- DROP function answer_question_fn;
CREATE OR REPLACE FUNCTION answer_question_fn
(
	param_user_id integer,
	param_answer_session_id integer,
	param_question_id integer,
	param_answer_ids integer[],
	param_is_practise_answer boolean
)
RETURNS TABLE 
(
	correct_answer_ids integer[], 
	given_answer_id integer,
	streak_id integer,
	streak_length integer,
	is_correct boolean
) 
AS $$ 

DECLARE
	var_correct_answer_ids integer[]; 
	var_given_answer_id integer;
	var_is_previous_streak_out_of_date boolean;
	
	var_streak_length integer;
	var_is_correct boolean;
	var_is_correctly_answered_before boolean;
	
	var_previous_streak_id integer;
	var_previous_streak_end_date timestamptz;

BEGIN

	-- CORRECT ANSWER IDS
	SELECT ARRAY
	(
		SELECT a.id	
		FROM public.answer AS a
		WHERE a.question_id = param_question_id 
			AND a.is_correct = true
	)		
	INTO var_correct_answer_ids;
	
	-- IS CORRECTLY ANSWERED BEFORE
	SELECT COUNT(ga.id) > 0 
	FROM public.given_answer ga
	LEFT JOIN public.answer_session ase
	ON ase.id = ga.answer_session_id
	WHERE ga.is_correct 
		AND ga.question_id = param_question_id
		AND ase.user_id = param_user_id
	INTO var_is_correctly_answered_before;
	
	-- IS CORRECT 
	var_is_correct := var_correct_answer_ids = param_answer_ids;
	
	-- PREVIOUS STREAK
	SELECT id 
	FROM given_answer_streak
	WHERE user_id = param_user_id
		AND is_finalized = false
	INTO var_previous_streak_id;
	
	-- if there's an unfinalized previous streak, and current answer is incorrect 
	-- set it to finalized!
	IF var_previous_streak_id IS NOT NULL 
		AND NOT var_is_correct THEN

		UPDATE given_answer_streak 
		SET is_finalized = true
		WHERE id = var_previous_streak_id;
	END IF;
	
	-- if there's no previous streak or it's out of date
	-- insert a new streak!
	IF var_previous_streak_id IS NULL 
		AND var_is_correct THEN
		
		INSERT INTO given_answer_streak (user_id, is_finalized)
		VALUES (param_user_id, false)
		RETURNING id
		INTO var_previous_streak_id;
  	END IF;
	
	-- set streak id to null if incorrect answer 
	-- OR is answered corretly before, that does not add to the streak
	IF NOT var_is_correct OR var_is_correctly_answered_before THEN 
		
		var_previous_streak_id := NULL;
	END IF;
	
	-- GIVEN ANSWER 
	INSERT INTO public.given_answer
	(
		creation_date,
		is_practise_answer,
		question_id,
		answer_session_id,
		is_correct,
		given_answer_streak_id
	)
	VALUES
	(
		NOW(),
		param_is_practise_answer,
		param_question_id,
		param_answer_session_id,
		var_is_correct,
		var_previous_streak_id
	)
	RETURNING id
	INTO var_given_answer_id;

	-- ANSWER <-> GIVEN ANSWER BRIDGES  
	INSERT INTO public.answer_given_answer_bridge 
	(
		given_answer_id,
		answer_id
	)
	SELECT 
		var_given_answer_id,
		answer_ids.*
	FROM UNNEST (param_answer_ids) AS answer_ids;
	
	-- STREAK LENGTH 
	SELECT COUNT(ga.id) 
	FROM public.given_answer_streak gas
	LEFT JOIN public.given_answer ga
	ON ga.given_answer_streak_id = gas.id
	WHERE gas.id = var_previous_streak_id
	INTO var_streak_length;
	
	-- RETURN 
	RETURN QUERY SELECT
		var_correct_answer_ids,
		var_given_answer_id,
		var_previous_streak_id,
		var_streak_length,
		var_is_correct;
END 
$$ LANGUAGE 'plpgsql';