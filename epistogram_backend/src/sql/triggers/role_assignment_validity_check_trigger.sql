
----------------- CLEANUP
DROP TRIGGER IF EXISTS role_assignment_validity_check_trigger 
ON role_assignment_bridge;
DROP FUNCTION IF EXISTS role_assignment_validity_check_trigger_function;

----------------- DEFINITION
CREATE FUNCTION role_assignment_validity_check_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_role record;
BEGIN
	
	SELECT *
	FROM public.role r
	WHERE r.id = NEW.role_id
	INTO var_role;
	
	IF (var_role.scope = 'USER' OR var_role.scope = 'COMPANY') AND NEW.context_company_id IS NULL
	THEN RAISE EXCEPTION 'Trying to assign a [%] role without specifying a context. This is not allowed.', var_role.scope;
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER role_assignment_validity_check_trigger
BEFORE INSERT OR UPDATE ON role_assignment_bridge
FOR EACH ROW EXECUTE PROCEDURE role_assignment_validity_check_trigger_function();