
--add new SKIP_SURVEY permission
INSERT INTO public.permission
	(code, scope)
VALUES 
	('BYPASS_SURVEY', 'COMPANY');
	
-- delete rendundant permission
DELETE FROM public.permission 
WHERE code = 'IS_SIGNUP_MANDATORY' 
OR code = 'SKIP_SURVEY' 
OR code = 'ACCESS_APPLICATION';