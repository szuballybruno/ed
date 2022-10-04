
----------------- CLEANUP
DROP TRIGGER IF EXISTS exam_pretest_module_integrity_trigger 
ON exam_version;
DROP FUNCTION IF EXISTS exam_pretest_module_integrity_trigger_function;

----------------- DEFINITION
CREATE FUNCTION exam_pretest_module_integrity_trigger_function() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
AS $$
DECLARE
  var_data record;
BEGIN
	
	NEW.
	
	return NEW;
END
$$;

CREATE TRIGGER exam_pretest_module_integrity_trigger
BEFORE INSERT OR UPDATE ON exam_version
FOR EACH ROW EXECUTE PROCEDURE exam_pretest_module_integrity_trigger_function();