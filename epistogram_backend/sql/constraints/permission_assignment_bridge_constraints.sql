
-- UNIQUE
ALTER TABLE public.permission_assignment_bridge
DROP CONSTRAINT IF EXISTS permission_assignment_bridge_check;

ALTER TABLE public.permission_assignment_bridge
ADD CONSTRAINT permission_assignment_bridge_check
CHECK (
    (context_company_id IS NULL AND context_course_id IS NOT NULL)
    OR
    (context_company_id IS NOT NULL AND context_course_id IS NULL)
	OR 
	(context_company_id IS NULL AND context_course_id IS NULL)
);