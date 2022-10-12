-- alater company 
ALTER TABLE company
ADD COLUMN is_survey_required boolean;

UPDATE company 
SET is_survey_required = true ;

ALTER TABLE company 
ALTER COLUMN is_survey_required SET NOT NULL;

-- alter user 
ALTER TABLE public.user
ADD COLUMN is_survey_required boolean;

UPDATE public.user 
SET is_survey_required = true;

ALTER TABLE public.user 
ALTER COLUMN is_survey_required SET NOT NULL;

-- alter view 
DROP VIEW IF EXISTS company_view;
CREATE VIEW company_view 
AS 
SELECT 
	u.id user_id,
	co.id company_id,
	co.deletion_date IS NOT NULL is_deleted,
	co.name company_name,
	upv.assignee_user_id IS NOT NULL can_manage,
	co.is_survey_required
FROM company co 

CROSS JOIN public.user u

LEFT JOIN public.user_permission_view upv
ON upv.context_company_id = co.id 
	AND upv.assignee_user_id = u.id 
	AND upv.permission_code = 'MANAGE_COMPANY'