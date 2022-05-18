
----------------- CLEANUP
DROP TRIGGER IF EXISTS permission_assignment_validity_check_trigger 
ON permission_assignment_bridge;
DROP FUNCTION IF EXISTS permission_assignment_validity_check_trigger_function;

----------------- DEFINITION
CREATE FUNCTION permission_assignment_validity_check_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_permission record;
BEGIN
	
	SELECT * FROM public.permission pe
	WHERE pe.id = NEW.permission_id
	INTO var_permission;

	-- company scope check 
	IF var_permission.scope = 'COMPANY' AND NEW.context_company_id IS NULL
	THEN RAISE EXCEPTION 
		'Trying to assign a [%] scoped permission without specifying a [%] context. This is not allowed. PermissionId: % AssigneeUserId: % AssigneeCompanyId: % ', 
		var_permission.scope, var_permission.scope, NEW.permission_id, NEW.assignee_user_id, NEW.assignee_company_id;
	END IF;
	
	-- course scope check 
	IF var_permission.scope = 'COURSE' AND NEW.context_course_id IS NULL
	THEN RAISE EXCEPTION 
		'Trying to assign a [%] scoped permission without specifying a [%] context. This is not allowed. PermissionId: % AssigneeUserId: % AssigneeCompanyId: % ', 
		var_permission.scope, var_permission.scope, NEW.permission_id, NEW.assignee_user_id, NEW.assignee_company_id;
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER permission_assignment_validity_check_trigger
BEFORE INSERT OR UPDATE ON permission_assignment_bridge
FOR EACH ROW EXECUTE PROCEDURE permission_assignment_validity_check_trigger_function();