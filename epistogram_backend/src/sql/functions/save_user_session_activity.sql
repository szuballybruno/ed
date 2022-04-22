CREATE OR REPLACE FUNCTION "save_user_session_activity"
(
	param_user_id int,
	param_activity_type text,
	param_video_id int,
	param_exam_id int
)
RETURNS integer 
AS $$ 

DECLARE
	var_previous_streak_id integer;
	var_previous_streak_end_date timestamptz;
	var_is_previous_streak_out_of_date boolean;
	
	var_previous_session_end_date timestamptz;
	var_previous_session_id integer;
	var_is_previous_session_out_of_date boolean;
	
	var_now timestamptz := now();

BEGIN
	
	-- STREAK
	
	-- get previous streak 
	SELECT id, end_date 
	FROM activity_streak
	WHERE user_id = param_user_id
		AND is_finalized = false
	INTO var_previous_streak_id, var_previous_streak_end_date;

	-- inspect if prev streak is out of date
	var_is_previous_streak_out_of_date := date_trunc('day', var_previous_streak_end_date) < date_trunc('day', var_now) - INTERVAL '1 day';
	
	-- if there's a previous streak and it's out of date
	-- set it to finalized!
	IF var_previous_streak_id IS NOT NULL 
		AND var_is_previous_streak_out_of_date THEN

		UPDATE activity_streak 
		SET is_finalized = true
		WHERE id = var_previous_streak_id;
	END IF;
		
	-- if there's a previous streak and it's not out of date
	-- set end date to now()
	IF var_previous_streak_id IS NOT NULL 
		AND NOT var_is_previous_streak_out_of_date THEN

		UPDATE activity_streak 
		SET end_date = var_now
		WHERE id = var_previous_streak_id;
	END IF;
	
	-- if there's no previous streak or it's out of date
	-- insert a new streak!
	IF var_previous_streak_id IS NULL 
		OR var_is_previous_streak_out_of_date THEN
		
		INSERT INTO activity_streak (start_date, end_date, user_id, is_finalized)
		VALUES (var_now, var_now, param_user_id, false)
		RETURNING id
		INTO var_previous_streak_id;
  	END IF;
	
	-- SESSION

	-- get previous session 
	SELECT id, end_date 
	FROM activity_session
	WHERE user_id = param_user_id
		AND is_finalized = false
	INTO var_previous_session_id, var_previous_session_end_date;
	
	-- inspect if prev session is out of date
	var_is_previous_session_out_of_date := var_previous_session_end_date < var_now - INTERVAL '5 min';
		
	-- if there's a previous session and it's out of date
	-- set it to finalized!
	IF var_previous_session_id IS NOT NULL 
		AND var_is_previous_session_out_of_date THEN

		UPDATE activity_session 
		SET is_finalized = true
		WHERE id = var_previous_session_id;
	END IF;
		
	-- if there's a previous session and it's not out of date
	-- set end date to now()
	IF var_previous_session_id IS NOT NULL 
		AND NOT var_is_previous_session_out_of_date THEN

		UPDATE activity_session 
		SET end_date = var_now
		WHERE id = var_previous_session_id;
	END IF;
	
	-- if there's no previous session or it's out of date
	-- insert a new session!
	IF var_previous_session_id IS NULL 
		OR var_is_previous_session_out_of_date THEN
		
		INSERT INTO activity_session (start_date, end_date, user_id, is_finalized, activity_streak_id)
		VALUES (var_now, var_now, param_user_id, false, var_previous_streak_id)
		RETURNING id
		INTO var_previous_session_id;
  	END IF;
	
	-- ACTIVITY
	
	-- insert a session activity linked to the newly inserted session 
	-- or linked to the previous one that's still not out of date
	INSERT INTO user_session_activity 
	(
		creation_date,
		type,
		activity_session_id,
		video_id,
		exam_id
	)
	VALUES 
	(
		DEFAULT,
		param_activity_type,
		var_previous_session_id,
		param_video_id,
		param_exam_id
	);
	
	RETURN var_previous_session_id;
END 
$$ LANGUAGE 'plpgsql';





