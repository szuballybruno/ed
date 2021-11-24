SELECT
	"uav"."user_id", 
	"uav"."role_id",
	"uav"."role_name",
	
	CAST (MAX(CASE WHEN "uav"."activity_id" = 1 THEN 1 ELSE 0 END) AS boolean)
	AS "can_set_invited_user_organization",
	
	CAST (MAX(CASE WHEN "uav"."activity_id" = 2 THEN 1 ELSE 0 END) AS boolean)
	AS "can_access_course_administration",
	
	CAST (MAX(CASE WHEN "uav"."activity_id" = 3 THEN 1 ELSE 0 END) AS boolean)
	AS "can_access_administration",
	
	CAST (MAX(CASE WHEN "uav"."activity_id" = 4 THEN 1 ELSE 0 END) AS boolean)
	AS "can_access_application"

FROM "user_activity_view" AS "uav"
	
GROUP BY
	"uav"."user_id", 
	"uav"."role_id",
	"uav"."role_name"