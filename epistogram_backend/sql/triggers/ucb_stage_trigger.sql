
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
  var_course_data record;
  var_is_prequiz_completed boolean;
  var_new_order_num int;
  var_old_order_num int;
BEGIN

	-- create temp table
	CREATE TEMP TABLE var_stage_order_rows AS
	SELECT vals.order_num, vals.stage_name
	FROM (VALUES 
		(1, 'assigned'), 
		(2, 'prequiz'), 
		(3, 'pretest'), 
		(4, 'pretest_results'), 
		(5, 'watch')
	) as vals (order_num, stage_name);
	
	-- get new stage name order num
	SELECT vsor.order_num 
	FROM var_stage_order_rows vsor
	WHERE  vsor.stage_name = NEW.stage_name
	INTO var_new_order_num;
	
	-- get old stage name order num
	SELECT vsor.order_num
	FROM public.user_course_bridge ucb
	LEFT JOIN var_stage_order_rows vsor
	ON vsor.stage_name = ucb.stage_name
	WHERE ucb.user_id = NEW.user_id
	AND ucb.course_id = NEW.course_id
	INTO var_old_order_num;
	
	-- drop temp table
	DROP TABLE var_stage_order_rows;
	
	-- check order 
	IF(var_new_order_num < var_old_order_num)
		THEN RAISE EXCEPTION 'Trying to set stage to "%" which is lower order than the current stage. This is not allowed, users are only allowed to progress forward, not backward.', NEW.stage_name;
	END IF;

	-- get course data
	SELECT cd.*
	FROM public.latest_course_version_view lcvv
	LEFT JOIN public.course_version cv
	ON cv.id = lcvv.version_id
	LEFT JOIN public.course_data cd
	ON cd.id = cv.course_data_id
	WHERE lcvv.course_id = NEW.course_id
	INTO var_course_data;

    -- check prequiz
    SELECT COUNT(*) = 3
    FROM public.prequiz_user_answer pua
    WHERE pua.user_id = NEW.user_id
    AND pua.course_id = NEW.course_id
    GROUP BY pua.user_id, pua.course_id
    INTO var_is_prequiz_completed;

	IF (var_is_prequiz_completed IS DISTINCT FROM true AND
		var_course_data.is_prequiz_required = true AND
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
		var_course_data.is_pretest_required = true AND
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