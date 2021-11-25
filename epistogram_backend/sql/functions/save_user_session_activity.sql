CREATE OR REPLACE FUNCTION "save_user_session_activity"
(
	param_user_id int,
	param_activity_type text
)
RETURNS void 
AS $$ 

DECLARE
	var_previous_session_end_date timestamptz;
	var_previous_session_id integer;
	var_now timestamptz := now();
	var_is_previous_session_out_of_date boolean;

BEGIN

	-- get previous session 
	SELECT id, end_date 
	FROM activity_session
	WHERE user_id = param_user_id
		AND is_finalized = false
	INTO var_previous_session_id, var_previous_session_end_date;
	
	-- inspect if prev session is out of date
	var_is_previous_session_out_of_date := var_previous_session_end_date < var_now - INTERVAL '5 min';
	
	RAISE NOTICE 'var_is_previous_session_out_of_date: %', var_is_previous_session_out_of_date; 
	RAISE NOTICE 'var_previous_session_id: %', var_previous_session_id; 
		
	-- if there's a previous session and it's out of date
	IF var_previous_session_id IS NOT NULL 
		AND var_is_previous_session_out_of_date THEN

		-- set it to finalized!
		UPDATE activity_session 
		SET is_finalized = true
		WHERE id = var_previous_session_id;
	END IF;
		
	-- if there's a previous session and it's not out of date
	IF var_previous_session_id IS NOT NULL 
		AND NOT var_is_previous_session_out_of_date THEN

		-- set end date to now()
		UPDATE activity_session 
		SET end_date = var_now
		WHERE id = var_previous_session_id;
	END IF;
	
	-- if there's no previous session or it's out of date
	IF var_previous_session_id IS NULL 
		OR var_is_previous_session_out_of_date THEN
		
		-- insert a new session!
		INSERT INTO activity_session 
		(
			start_date,
			end_date,
			user_id,
			is_finalized
		)
		VALUES 
		(
			var_now,
			var_now,
			param_user_id,
			false
		)
		RETURNING id
		INTO var_previous_session_id;
  	END IF;
	
	-- insert a session activity linked to the newly inserted session 
	-- or linked to the previous one that's still not out of date
	INSERT INTO user_session_activity 
	(
		creation_date,
		type,
		activity_session_id
	)
	VALUES 
	(
		DEFAULT,
		param_activity_type,
		var_previous_session_id
	);
	
END 
$$ LANGUAGE 'plpgsql';





