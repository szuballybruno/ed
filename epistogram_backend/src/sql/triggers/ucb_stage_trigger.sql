
----------------- CLEANUP
DROP TRIGGER IF EXISTS ucb_stage_trigger 
ON user_course_bridge;
DROP FUNCTION IF EXISTS ucb_stage_trigger_function;

----------------- DEFINITION
CREATE FUNCTION ucb_stage_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_data record;
BEGIN

    -- TODO: check prequiz
    -- ...

    -- check pretest
	SELECT *
	FROM public.pretest_completion_view pcv
    WHERE pcv.course_id = NEW.course_id 
    AND pcv.user_id = NEW.user_id 
	INTO var_data;

	IF (var_data.is_completed = false AND 
        (NEW.stage_name = 'pretest_results' OR
        NEW.stage_name = 'watch' OR 
        NEW.stage_name = 'finished'))
	    THEN RAISE EXCEPTION 'Trying to set stage to "%", but pretest is not yet completed!', NEW.stage_name;
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER ucb_stage_trigger
BEFORE INSERT OR UPDATE ON user_course_bridge
FOR EACH ROW EXECUTE PROCEDURE ucb_stage_trigger_function();