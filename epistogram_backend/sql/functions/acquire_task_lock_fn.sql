-- DROP FUNCTION IF EXISTS acquire_task_lock_fn;

CREATE OR REPLACE FUNCTION acquire_task_lock_fn
(
	param_task_code text
)
RETURNS boolean 
AS $$ 

DECLARE
	var_lock_count integer; 

BEGIN

	SELECT COUNT(1)
	INTO var_lock_count
	FROM public.task_lock tl
	WHERE tl.task_code = param_task_code;
	
	IF var_lock_count = 0 THEN
	
		INSERT INTO public.task_lock (task_code, creation_date) 
		VALUES (param_task_code, now());
	
		RAISE NOTICE 'Task is free. Creating new task lock...';
		RETURN true;
	ELSE
	
		RAISE NOTICE 'Task is occupied. Aborting...';
		RETURN false;	
	END IF;
END 
$$ LANGUAGE 'plpgsql';