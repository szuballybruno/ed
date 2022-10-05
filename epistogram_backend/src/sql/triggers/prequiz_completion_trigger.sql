
----------------- CLEANUP
DROP TRIGGER IF EXISTS prequiz_completion_trigger 
ON prequiz_completion;
DROP FUNCTION IF EXISTS prequiz_completion_trigger_function;

----------------- DEFINITION
CREATE FUNCTION prequiz_completion_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_user_course_bridge record;
BEGIN

    -- check prequiz
    SELECT *
    FROM public.user_course_bridge ucb
    WHERE ucb.user_id = NEW.user_id
    AND ucb.course_id = NEW.course_id
    INTO var_user_course_bridge;

	IF (var_user_course_bridge.stage_name IN ('prequiz', 'assigned'))
	    THEN RAISE EXCEPTION 'Trying to create a prequiz completion row, but user_course_bridge stage is still not set to the next one, set that first!';
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER prequiz_completion_trigger
BEFORE INSERT OR UPDATE ON prequiz_completion
FOR EACH ROW EXECUTE PROCEDURE prequiz_completion_trigger_function();