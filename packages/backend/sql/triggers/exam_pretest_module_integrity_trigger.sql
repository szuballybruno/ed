
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
	
	-- query related exam
	SELECT 
		e.is_pretest is_pretest_exam,
		m.is_pretest_module is_pretest_module
	FROM public.exam e
	
	LEFT JOIN public.module_version mv
	ON mv.id = NEW.module_version_id
	
	LEFT JOIN public.module m
	ON m.id = mv.module_id

	WHERE e.id = NEW.exam_id
	INTO var_data;
	
	IF (var_data.is_pretest_exam = true AND var_data.is_pretest_module = false) 
	OR (var_data.is_pretest_exam = false AND var_data.is_pretest_module = true) 
	THEN RAISE EXCEPTION 'When creating module/exam <-> pretest module/exam relation both entities must be pretest!';
	END IF;
	
	return NEW;
END
$$;

CREATE TRIGGER exam_pretest_module_integrity_trigger
BEFORE INSERT OR UPDATE ON exam_version
FOR EACH ROW EXECUTE PROCEDURE exam_pretest_module_integrity_trigger_function();