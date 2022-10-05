
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
  var_pretest_comp record;
  var_is_prequiz_completed boolean;
BEGIN

    -- check prequiz
    SELECT COUNT(*) = 3
    FROM public.prequiz_user_answer pua
    WHERE pua.user_id = NEW.user_id
    AND pua.course_id = NEW.course_id
    GROUP BY pua.user_id, pua.course_id
    INTO var_is_prequiz_completed;

	IF (var_is_prequiz_completed IS DISTINCT FROM true AND 
        (NEW.stage_name = 'pretest' OR 
        NEW.stage_name = 'pretest_results' OR
        NEW.stage_name = 'watch' OR 
        NEW.stage_name = 'finished'))
	    THEN RAISE EXCEPTION 'Trying to set stage to "%", but "prequiz" is not yet completed!', NEW.stage_name;
	END IF;

    -- check pretest
	SELECT
	    u.id user_id,
        co.id course_id,
        prv.user_id IS NOT NULL is_completed_pretest
    FROM public.course co
    CROSS JOIN public.user u
    LEFT JOIN public.pretest_result_view prv
    ON prv.user_id = u.id
    AND prv.course_id = co.id
    WHERE co.id = NEW.course_id 
    AND u.id = NEW.user_id 
	INTO var_pretest_comp;

	IF (var_pretest_comp.is_completed_pretest = false AND 
        (NEW.stage_name = 'pretest_results' OR
        NEW.stage_name = 'watch' OR 
        NEW.stage_name = 'finished'))
	    THEN RAISE EXCEPTION 'Trying to set stage to "%", but "pretest" is not yet completed!', NEW.stage_name;
	END IF;

    -- check startDate
	IF (NEW.start_date IS NULL AND 
        (NEW.stage_name = 'pretest_results' OR
        NEW.stage_name = 'watch' OR 
        NEW.stage_name = 'finished'))
	    THEN RAISE EXCEPTION 'Trying to set stage to "%", but "start_date" is not yet set!', NEW.stage_name;
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER ucb_stage_trigger
BEFORE INSERT OR UPDATE ON user_course_bridge
FOR EACH ROW EXECUTE PROCEDURE ucb_stage_trigger_function();