
----------------- CLEANUP
DROP TRIGGER IF EXISTS role_permission_bridge_validity_trigger 
ON role_permission_bridge;
DROP FUNCTION IF EXISTS role_permission_bridge_validity_trigger_function;

----------------- DEFINITION
CREATE FUNCTION role_permission_bridge_validity_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_permission record;
  var_role record;
BEGIN
	
	SELECT * FROM public.permission pe
	WHERE pe.id = NEW.permission_id
	INTO var_permission;
	
	SELECT * FROM public.role ro
	WHERE ro.id = NEW.role_id
	INTO var_role;

	-- company scope check 
	IF var_permission.scope != 'COMPANY'
	THEN RAISE EXCEPTION 
		'Trying to assign a [%] scoped permission to a [COMPANY] scoped role. This is not allowed.
		PermissionId: % PermissionCode: % RoleId: % RoleName: %', 
		var_permission.scope, var_permission.id, var_permission.code, NEW.role_id, var_role.name;
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER role_permission_bridge_validity_trigger
BEFORE INSERT OR UPDATE ON role_permission_bridge
FOR EACH ROW EXECUTE PROCEDURE role_permission_bridge_validity_trigger_function();