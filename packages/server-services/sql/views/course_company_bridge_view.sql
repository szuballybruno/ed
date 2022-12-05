SELECT 
	cab.id,
	cab.company_id,
	cab.course_id
FROM course_access_bridge cab
WHERE cab.company_id IS NOT NULL