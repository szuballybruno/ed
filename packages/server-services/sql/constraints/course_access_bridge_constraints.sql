-- UNIQUE COMPANY 
ALTER TABLE public.course_access_bridge
DROP CONSTRAINT IF EXISTS course_access_bridge_unique_by_company;

ALTER TABLE public.course_access_bridge
ADD CONSTRAINT course_access_bridge_unique_by_company
UNIQUE (course_id, company_id);

-- UNIQUE USER
ALTER TABLE public.course_access_bridge
DROP CONSTRAINT IF EXISTS course_access_bridge_unique_by_user;

ALTER TABLE public.course_access_bridge
ADD CONSTRAINT course_access_bridge_unique_by_user
UNIQUE (course_id, user_id);